// Immersive Audio, Theme Chords & Sorting Hat Voice Engine (Web Audio API + Web Speech API)
class MagicAudio {
  constructor() {
    this.ctx = null;
    this.enabled = true; // Enabled by default; unlocks on first user gesture
    this.voices = [];
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      const loadVoices = () => {
        this.voices = window.speechSynthesis.getVoices() || [];
      };
      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;
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
    } else if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  }

  playTone(freq, duration = 0.28, type = "sine", volume = 0.08, delay = 0, slideTo = null) {
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
    // Celesta / Hedwig-inspired magical interval
    this.playTone(659.25, 0.22, "sine", 0.055, 0);
    this.playTone(987.77, 0.26, "triangle", 0.05, 0.06);
    this.playTone(1174.66, 0.32, "sine", 0.045, 0.12);
  }

  spellCast() {
    this.playTone(320, 0.35, "sine", 0.06, 0, 960);
    this.playTone(880, 0.25, "triangle", 0.05, 0.08, 1320);
    this.playTone(1318.5, 0.4, "sine", 0.04, 0.15);
  }

  themeSwitch(themeId) {
    if (!this.enabled) return;
    const chords = {
      neutral: [293.66, 440.0, 554.37, 659.25], // D major warm banquet
      gryffindor: [261.63, 329.63, 392.0, 523.25], // Heroic C major brass
      slytherin: [196.0, 233.08, 293.66, 370.0], // Mysterious G minor/maj7 abyssal
      ravenclaw: [329.63, 415.3, 493.88, 659.25], // Celestial E major bell
      hufflepuff: [293.66, 369.99, 440.0, 587.33], // Warm golden hearth D chord
    };
    const notes = chords[themeId] || chords.neutral;
    notes.forEach((n, idx) => {
      this.playTone(n, 0.55, idx % 2 === 0 ? "triangle" : "sine", 0.06, idx * 0.07);
    });
  }

  correct() {
    this.playTone(523.25, 0.22, "triangle", 0.07, 0);
    this.playTone(659.25, 0.22, "triangle", 0.07, 0.08);
    this.playTone(783.99, 0.38, "sine", 0.08, 0.16);
    this.playTone(1046.5, 0.45, "sine", 0.06, 0.24);
  }

  wrong() {
    this.playTone(233.08, 0.25, "sawtooth", 0.045, 0);
    this.playTone(185.0, 0.38, "sawtooth", 0.045, 0.14);
  }

  reveal() {
    const notes = [392.0, 493.88, 587.33, 783.99, 987.77, 1174.66];
    notes.forEach((n, idx) => {
      this.playTone(n, 0.75, "triangle", 0.075, idx * 0.09);
    });
  }

  prank() {
    this.playTone(440, 0.14, "square", 0.035, 0);
    this.playTone(392, 0.14, "square", 0.035, 0.13);
    this.playTone(349.23, 0.14, "square", 0.035, 0.26);
    this.playTone(261.63, 0.5, "sawtooth", 0.045, 0.39, 180);
  }

  /**
   * Speaks text aloud as the Sorting Hat using Web Speech API (pt-BR)
   */
  speakHat(text, isFinalShout = false) {
    if (!this.enabled) return;
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    try {
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = "pt-BR";

      const ptVoices = (this.voices.length ? this.voices : window.speechSynthesis.getVoices()).filter(
        (v) => v.lang && v.lang.toLowerCase().includes("pt")
      );
      // Prefer a male/deep or natural Portuguese voice if available
      const preferred =
        ptVoices.find((v) => /daniel|antonio|fabio|google português/i.test(v.name)) || ptVoices[0];
      if (preferred) utter.voice = preferred;

      utter.pitch = isFinalShout ? 0.82 : 0.68;
      utter.rate = isFinalShout ? 0.94 : 0.88;
      utter.volume = 1;
      window.speechSynthesis.speak(utter);
    } catch {
      // Ignore TTS errors on restricted browsers
    }
  }
}

export const magicAudio = new MagicAudio();
