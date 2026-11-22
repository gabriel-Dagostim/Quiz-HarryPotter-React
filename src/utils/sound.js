// Audio Engine: Pre-generated OmniVoice Character Voices (Web Audio API decoded buffer playback)
// + Procedural Wizarding SFX (Web Audio API)

class MagicAudio {
  constructor() {
    this.ctx = null;
    this.enabled = true;
    this.currentSource = null;
    this.currentGain = null;
    this.currentAudio = null;
    this.currentClipId = null;
    this.playSeq = 0;
    this.abortCtrl = null;
    this.bufferCache = new Map(); // clipId -> AudioBuffer
    this.pendingFetches = new Map(); // clipId -> Promise<ArrayBuffer>
    this.voices = [];

    if (typeof window !== "undefined") {
      if ("speechSynthesis" in window) {
        const loadVoices = () => {
          this.voices = window.speechSynthesis.getVoices() || [];
        };
        loadVoices();
        window.speechSynthesis.onvoiceschanged = loadVoices;
      }

      // Unlock AudioContext on first user interaction so voice playback never starts muted/clipped
      const unlock = () => {
        this.init();
        if (this.ctx && this.ctx.state === "running") {
          window.removeEventListener("pointerdown", unlock);
          window.removeEventListener("keydown", unlock);
        }
      };
      window.addEventListener("pointerdown", unlock, { passive: true });
      window.addEventListener("keydown", unlock, { passive: true });
    }
  }

  init() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
  }

  setEnabled(val) {
    this.enabled = val;
    if (val) {
      this.init();
    } else {
      this.stopVoice();
    }
  }

  stopVoice() {
    this.playSeq += 1;
    if (this.abortCtrl) {
      try {
        this.abortCtrl.abort();
      } catch {
        // ignore
      }
      this.abortCtrl = null;
    }
    if (this.currentSource) {
      try {
        this.currentSource.onended = null;
        this.currentSource.stop();
        this.currentSource.disconnect();
      } catch {
        // ignore
      }
      this.currentSource = null;
    }
    if (this.currentGain) {
      try {
        this.currentGain.disconnect();
      } catch {
        // ignore
      }
      this.currentGain = null;
    }
    if (this.currentAudio) {
      try {
        this.currentAudio.onended = null;
        this.currentAudio.onerror = null;
        this.currentAudio.pause();
        this.currentAudio.currentTime = 0;
      } catch {
        // ignore
      }
      this.currentAudio = null;
    }
    this.currentClipId = null;

    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      try {
        window.speechSynthesis.cancel();
      } catch {
        // ignore
      }
    }
  }

  async _fetchAndDecode(clipId, signal) {
    if (this.bufferCache.has(clipId)) {
      return this.bufferCache.get(clipId);
    }

    const url = `/audio/voices/${clipId}.mp3?v=3`;
    let arrayBufPromise = this.pendingFetches.get(clipId);
    if (!arrayBufPromise) {
      arrayBufPromise = fetch(url, { cache: "force-cache", signal })
        .then((res) => {
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          return res.arrayBuffer();
        })
        .finally(() => {
          this.pendingFetches.delete(clipId);
        });
      this.pendingFetches.set(clipId, arrayBufPromise);
    }

    const rawBuf = await arrayBufPromise;
    this.init();
    if (!this.ctx) throw new Error("No AudioContext");

    // decodeAudioData detaches the buffer, so pass a slice copy
    const audioBuf = await this.ctx.decodeAudioData(rawBuf.slice(0));

    // LRU cap at 48 decoded clips to keep memory tiny
    if (this.bufferCache.size >= 48) {
      const oldestKey = this.bufferCache.keys().next().value;
      this.bufferCache.delete(oldestKey);
    }
    this.bufferCache.set(clipId, audioBuf);
    return audioBuf;
  }

  preloadVoice(clipId) {
    if (!clipId || !this.enabled || typeof window === "undefined") return;
    if (this.bufferCache.has(clipId) || this.pendingFetches.has(clipId)) return;
    this._fetchAndDecode(clipId).catch(() => {});
  }

  /**
   * Plays a pre-generated OmniVoice character MP3 from /audio/voices/<clipId>.mp3
   * via Web Audio API AudioBufferSourceNode (eliminates browser MP3 buffering lag & start clipping).
   */
  playVoice(clipId, { onStart, onEnd, fallbackText } = {}) {
    this.stopVoice();
    if (!this.enabled || !clipId || typeof window === "undefined") {
      if (onEnd) onEnd();
      return;
    }

    const seq = this.playSeq;
    const ctrl = typeof AbortController !== "undefined" ? new AbortController() : null;
    this.abortCtrl = ctrl;
    this.currentClipId = clipId;

    this.init();

    const finish = () => {
      if (this.playSeq !== seq) return;
      this.currentSource = null;
      this.currentGain = null;
      this.currentAudio = null;
      this.currentClipId = null;
      if (onEnd) onEnd();
    };

    const run = async () => {
      try {
        if (!this.ctx) throw new Error("Web Audio unavailable");
        if (this.ctx.state === "suspended") {
          await this.ctx.resume();
        }
        if (this.ctx.state !== "running") {
          // Browser blocked autoplay before user gesture; let user click "Ouvir"
          finish();
          return;
        }

        const buffer = await this._fetchAndDecode(clipId, ctrl?.signal);
        if (this.playSeq !== seq || !this.enabled) return;

        // Re-check context state right before starting
        if (this.ctx.state === "suspended") {
          await this.ctx.resume();
        }
        if (this.playSeq !== seq || this.ctx.state !== "running") {
          finish();
          return;
        }

        const source = this.ctx.createBufferSource();
        source.buffer = buffer;

        const gain = this.ctx.createGain();
        const startAt = this.ctx.currentTime + 0.025; // 25ms lookahead prevents hardware wake-up clip
        gain.gain.setValueAtTime(0.001, startAt);
        gain.gain.linearRampToValueAtTime(0.98, startAt + 0.015);

        source.connect(gain);
        gain.connect(this.ctx.destination);

        this.currentSource = source;
        this.currentGain = gain;

        source.onended = () => {
          finish();
        };

        source.start(startAt);
        if (onStart) onStart();
      } catch (err) {
        if (this.playSeq !== seq) return;
        if (err && err.name === "AbortError") return;

        // Fallback to HTMLAudioElement if Web Audio decode failed
        try {
          const audio = new Audio(`/audio/voices/${clipId}.mp3?v=3`);
          audio.preload = "auto";
          audio.volume = 0.96;
          this.currentAudio = audio;
          let done = false;
          const endFallback = () => {
            if (done) return;
            done = true;
            finish();
          };
          audio.onplay = () => {
            if (this.playSeq === seq && onStart) onStart();
          };
          audio.onended = endFallback;
          audio.onerror = () => {
            endFallback();
            if (fallbackText) {
              this.speakFallback(fallbackText, { onStart, onEnd });
            }
          };
          const p = audio.play();
          if (p && typeof p.catch === "function") {
            p.catch(() => endFallback());
          }
        } catch {
          finish();
          if (fallbackText) {
            this.speakFallback(fallbackText, { onStart, onEnd });
          }
        }
      }
    };

    run();
  }

  /**
   * Optional browser TTS fallback (used for dynamic Perfil clues readout or missing clip fallback).
   */
  speakFallback(text, { onStart, onEnd, pitch = 0.9, rate = 0.96 } = {}) {
    if (!this.enabled || !text) {
      if (onEnd) onEnd();
      return;
    }
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      if (onEnd) onEnd();
      return;
    }
    try {
      this.stopVoice();
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = "pt-BR";
      const ptVoices = (this.voices.length ? this.voices : window.speechSynthesis.getVoices()).filter(
        (v) => v.lang && v.lang.toLowerCase().includes("pt")
      );
      const preferred =
        ptVoices.find((v) => /google português|daniel|luciana|francisca/i.test(v.name)) || ptVoices[0];
      if (preferred) utter.voice = preferred;
      utter.pitch = pitch;
      utter.rate = rate;
      utter.volume = 0.95;
      utter.onstart = () => onStart && onStart();
      utter.onend = () => onEnd && onEnd();
      utter.onerror = () => onEnd && onEnd();
      window.speechSynthesis.speak(utter);
    } catch {
      if (onEnd) onEnd();
    }
  }

  playTone(freq, duration = 0.28, type = "sine", volume = 0.07, delay = 0, slideTo = null) {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime + delay;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);
    if (slideTo) {
      osc.frequency.exponentialRampToValueAtTime(slideTo, now + duration);
    }

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(volume, now + 0.025);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + duration + 0.03);
  }

  sparkle() {
    this.playTone(659.25, 0.2, "sine", 0.045, 0);
    this.playTone(987.77, 0.24, "triangle", 0.04, 0.06);
    this.playTone(1174.66, 0.28, "sine", 0.038, 0.12);
  }

  spellCast() {
    this.playTone(320, 0.3, "sine", 0.05, 0, 960);
    this.playTone(880, 0.22, "triangle", 0.04, 0.08, 1320);
  }

  themeSwitch(themeId) {
    if (!this.enabled) return;
    const chords = {
      neutral: [293.66, 440.0, 554.37, 659.25],
      gryffindor: [261.63, 329.63, 392.0, 523.25],
      slytherin: [196.0, 233.08, 293.66, 370.0],
      ravenclaw: [329.63, 415.3, 493.88, 659.25],
      hufflepuff: [293.66, 369.99, 440.0, 587.33],
    };
    const notes = chords[themeId] || chords.neutral;
    notes.forEach((n, idx) => {
      this.playTone(n, 0.48, idx % 2 === 0 ? "triangle" : "sine", 0.048, idx * 0.06);
    });
  }

  correct() {
    this.playTone(523.25, 0.2, "triangle", 0.06, 0);
    this.playTone(659.25, 0.2, "triangle", 0.06, 0.08);
    this.playTone(783.99, 0.34, "sine", 0.07, 0.16);
    this.playTone(1046.5, 0.4, "sine", 0.05, 0.24);
  }

  wrong() {
    this.playTone(233.08, 0.24, "sawtooth", 0.04, 0);
    this.playTone(185.0, 0.36, "sawtooth", 0.04, 0.14);
  }

  reveal() {
    const notes = [392.0, 493.88, 587.33, 783.99, 987.77, 1174.66];
    notes.forEach((n, idx) => {
      this.playTone(n, 0.65, "triangle", 0.065, idx * 0.08);
    });
  }

  prank() {
    this.playTone(440, 0.14, "square", 0.03, 0);
    this.playTone(392, 0.14, "square", 0.03, 0.13);
    this.playTone(349.23, 0.14, "square", 0.03, 0.26);
    this.playTone(261.63, 0.45, "sawtooth", 0.04, 0.39, 180);
  }
}

export const magicAudio = new MagicAudio();
