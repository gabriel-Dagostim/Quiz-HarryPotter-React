import { useEffect, useRef } from "react";
import * as THREE from "three";

const THEME_CONFIGS = {
  neutral: {
    fogColor: 0x0e0a06,
    ambientColor: 0xffdfb0,
    pointLightColor: 0xffba52,
    particleColor1: 0xffe49e,
    particleColor2: 0xd4af37,
  },
  gryffindor: {
    fogColor: 0x1a0305,
    ambientColor: 0xff8c66,
    pointLightColor: 0xff451a,
    particleColor1: 0xffb833,
    particleColor2: 0xff3b1f,
  },
  slytherin: {
    fogColor: 0x03140c,
    ambientColor: 0x45d994,
    pointLightColor: 0x1ee682,
    particleColor1: 0x6bffb8,
    particleColor2: 0xa8e6cf,
  },
  ravenclaw: {
    fogColor: 0x050d24,
    ambientColor: 0x73b3ff,
    pointLightColor: 0x4d9bff,
    particleColor1: 0x8cc2ff,
    particleColor2: 0xe0a96d,
  },
  hufflepuff: {
    fogColor: 0x171103,
    ambientColor: 0xffd966,
    pointLightColor: 0xffbf26,
    particleColor1: 0xffe066,
    particleColor2: 0xffa62b,
  },
};

export default function MagicCanvas({ themeId = "neutral" }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const cfg = THEME_CONFIGS[themeId] || THEME_CONFIGS.neutral;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(cfg.fogColor, 0.032);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      120
    );
    camera.position.set(0, 2.2, 13);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(cfg.ambientColor, 0.7);
    scene.add(ambientLight);

    const mainLight = new THREE.PointLight(cfg.pointLightColor, 2.6, 45);
    mainLight.position.set(0, 6, 4);
    scene.add(mainLight);

    const rimLight = new THREE.PointLight(cfg.particleColor1, 1.5, 40);
    rimLight.position.set(0, -3, -6);
    scene.add(rimLight);

    // Group that holds the theme-specific 3D world
    const worldGroup = new THREE.Group();
    scene.add(worldGroup);

    // Animated objects array
    const updatables = [];

    // ==================== 1. NEUTRAL: SALÃO PRINCIPAL DE BANQUETES ====================
    if (themeId === "neutral") {
      const woodMat = new THREE.MeshStandardMaterial({
        color: 0x3d2511,
        roughness: 0.65,
        metalness: 0.15,
      });
      const goldMat = new THREE.MeshStandardMaterial({
        color: 0xe5c158,
        roughness: 0.25,
        metalness: 0.85,
      });
      const stoneMat = new THREE.MeshStandardMaterial({
        color: 0x26211c,
        roughness: 0.85,
      });

      // 4 Long Banquet Tables in 3D Perspective
      const tableXPositions = [-5.2, -1.8, 1.8, 5.2];
      tableXPositions.forEach((tx) => {
        const tableGeo = new THREE.BoxGeometry(1.45, 0.18, 26);
        const tableMesh = new THREE.Mesh(tableGeo, woodMat);
        tableMesh.position.set(tx, -2.5, -4);
        worldGroup.add(tableMesh);

        // Golden Goblets & Plates along each banquet table
        for (let z = 4; z > -14; z -= 3.2) {
          const goblet = new THREE.Mesh(
            new THREE.CylinderGeometry(0.11, 0.08, 0.28, 10),
            goldMat
          );
          goblet.position.set(tx - 0.35, -2.26, z);
          worldGroup.add(goblet);

          const platter = new THREE.Mesh(
            new THREE.CylinderGeometry(0.22, 0.18, 0.04, 12),
            goldMat
          );
          platter.position.set(tx + 0.25, -2.38, z - 1.2);
          worldGroup.add(platter);
        }
      });

      // Gothic Stone Pillars lining the Great Hall
      for (let z = 4; z >= -16; z -= 5) {
        [-8.5, 8.5].forEach((px) => {
          const pillar = new THREE.Mesh(
            new THREE.CylinderGeometry(0.45, 0.55, 14, 12),
            stoneMat
          );
          pillar.position.set(px, 2, z);
          worldGroup.add(pillar);
        });
      }

      // 36 Floating 3D Candles with Glowing Flames
      const candleMat = new THREE.MeshStandardMaterial({ color: 0xf7f0dc, roughness: 0.5 });
      const flameMat = new THREE.MeshBasicMaterial({ color: 0xffdf73 });

      for (let i = 0; i < 36; i++) {
        const candleGroup = new THREE.Group();
        const body = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.65, 8), candleMat);
        const flame = new THREE.Mesh(new THREE.ConeGeometry(0.065, 0.2, 8), flameMat);
        flame.position.y = 0.44;
        candleGroup.add(body, flame);

        candleGroup.position.set(
          (Math.random() - 0.5) * 14,
          1.2 + Math.random() * 5.2,
          2 - Math.random() * 18
        );
        const phase = Math.random() * Math.PI * 2;
        const speed = 0.8 + Math.random() * 0.8;
        worldGroup.add(candleGroup);

        updatables.push((t) => {
          candleGroup.position.y += Math.sin(t * speed + phase) * 0.004;
          flame.scale.setScalar(0.9 + Math.sin(t * 9 + phase) * 0.15);
        });
      }
    }

    // ==================== 2. GRYFFINDOR: TORRE CARMESIM & ESPADAS 3D ====================
    if (themeId === "gryffindor") {
      const goldMat = new THREE.MeshStandardMaterial({
        color: 0xf5c542,
        metalness: 0.88,
        roughness: 0.2,
      });
      const rubyMat = new THREE.MeshStandardMaterial({
        color: 0xd91424,
        emissive: 0x660008,
        metalness: 0.5,
        roughness: 0.2,
      });
      const bladeMat = new THREE.MeshStandardMaterial({
        color: 0xe8edf5,
        metalness: 0.92,
        roughness: 0.15,
      });

      // 3D Floating Swords of Gryffindor & Chivalric Rings
      for (let i = 0; i < 7; i++) {
        const sword = new THREE.Group();
        const blade = new THREE.Mesh(new THREE.BoxGeometry(0.14, 2.6, 0.04), bladeMat);
        const guard = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.14, 0.14), goldMat);
        guard.position.y = -1.25;
        const hilt = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.55, 8), goldMat);
        hilt.position.y = -1.55;
        const ruby = new THREE.Mesh(new THREE.OctahedronGeometry(0.14), rubyMat);
        ruby.position.y = -1.88;
        sword.add(blade, guard, hilt, ruby);

        const angle = (i / 7) * Math.PI * 2;
        const radius = 5.2 + (i % 2) * 1.6;
        sword.position.set(Math.cos(angle) * radius, (i % 3) - 0.5, -2 + Math.sin(angle) * 4);
        sword.rotation.z = (Math.random() - 0.5) * 0.5;
        worldGroup.add(sword);

        updatables.push((t) => {
          sword.position.y += Math.sin(t * 1.4 + i) * 0.006;
          sword.rotation.y = t * 0.55 + i;
        });
      }

      // Central Roaring Lion Crest Halo
      const halo = new THREE.Mesh(
        new THREE.TorusGeometry(3.4, 0.08, 16, 64),
        goldMat
      );
      halo.position.set(0, 1.4, -3.5);
      worldGroup.add(halo);

      const innerHalo = new THREE.Mesh(
        new THREE.TorusGeometry(2.6, 0.05, 16, 48),
        rubyMat
      );
      innerHalo.position.set(0, 1.4, -3.5);
      worldGroup.add(innerHalo);

      updatables.push((t) => {
        halo.rotation.z = t * 0.25;
        innerHalo.rotation.x = Math.sin(t * 0.5) * 0.35;
        innerHalo.rotation.y = t * 0.4;
      });
    }

    // ==================== 3. SLYTHERIN: MASMORRAS SUBMERSAS & SERPENTE 3D ====================
    if (themeId === "slytherin") {
      const scaleMat = new THREE.MeshStandardMaterial({
        color: 0x16804a,
        emissive: 0x052e19,
        metalness: 0.7,
        roughness: 0.25,
      });
      const silverMat = new THREE.MeshStandardMaterial({
        color: 0xb8d8c8,
        metalness: 0.85,
        roughness: 0.2,
      });

      // 3D Slithering Serpent made of 28 articulated spheres
      const serpentSegments = [];
      for (let i = 0; i < 28; i++) {
        const radius = i === 0 ? 0.38 : Math.max(0.08, 0.34 * (1 - i / 30));
        const seg = new THREE.Mesh(
          new THREE.SphereGeometry(radius, 14, 14),
          i % 3 === 0 ? silverMat : scaleMat
        );
        worldGroup.add(seg);
        serpentSegments.push(seg);
      }

      updatables.push((t) => {
        serpentSegments.forEach((seg, idx) => {
          const lag = t * 1.8 - idx * 0.22;
          seg.position.x = Math.cos(lag * 0.7) * 5.2;
          seg.position.y = Math.sin(lag * 1.1) * 1.8 + 0.8;
          seg.position.z = -3.5 + Math.sin(lag * 0.7) * 3.2;
        });
      });

      // Underwater Dungeon Pillars
      const pillarMat = new THREE.MeshStandardMaterial({
        color: 0x0d261a,
        roughness: 0.75,
      });
      [-6.5, 6.5].forEach((px) => {
        for (let z = 1; z >= -11; z -= 6) {
          const p = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.6, 14, 10), pillarMat);
          p.position.set(px, 1, z);
          worldGroup.add(p);
        }
      });
    }

    // ==================== 4. RAVENCLAW: ASTROLÁBIO CELESTIAL 3D ====================
    if (themeId === "ravenclaw") {
      const bronzeMat = new THREE.MeshStandardMaterial({
        color: 0xd99b52,
        metalness: 0.88,
        roughness: 0.22,
      });
      const sapphireMat = new THREE.MeshStandardMaterial({
        color: 0x3b82f6,
        emissive: 0x102a6b,
        metalness: 0.65,
        roughness: 0.18,
      });

      // 3D Rotating Armillary Sphere / Astrolabe Rings
      const astrolabe = new THREE.Group();
      astrolabe.position.set(0, 1.4, -3.5);
      worldGroup.add(astrolabe);

      const ring1 = new THREE.Mesh(new THREE.TorusGeometry(3.8, 0.07, 16, 80), bronzeMat);
      const ring2 = new THREE.Mesh(new THREE.TorusGeometry(3.1, 0.06, 16, 80), sapphireMat);
      const ring3 = new THREE.Mesh(new THREE.TorusGeometry(2.4, 0.05, 16, 64), bronzeMat);
      const coreStar = new THREE.Mesh(new THREE.OctahedronGeometry(0.55, 0), bronzeMat);
      astrolabe.add(ring1, ring2, ring3, coreStar);

      updatables.push((t) => {
        ring1.rotation.x = t * 0.32;
        ring1.rotation.y = t * 0.18;
        ring2.rotation.y = -t * 0.42;
        ring2.rotation.z = t * 0.24;
        ring3.rotation.x = -t * 0.28;
        ring3.rotation.z = -t * 0.35;
        coreStar.rotation.y = t * 0.9;
      });
    }

    // ==================== 5. HUFFLEPUFF: SANTUÁRIO BOTÂNICO & FAVO DOURADO 3D ====================
    if (themeId === "hufflepuff") {
      const amberMat = new THREE.MeshStandardMaterial({
        color: 0xffc933,
        emissive: 0x4d3300,
        metalness: 0.6,
        roughness: 0.25,
      });
      const woodMat = new THREE.MeshStandardMaterial({
        color: 0x5c3d14,
        roughness: 0.7,
      });

      // 3D Floating Hexagonal Botanical Rings & Glowing Crystals
      for (let i = 0; i < 8; i++) {
        const hex = new THREE.Mesh(new THREE.TorusGeometry(1.1, 0.06, 8, 6), i % 2 === 0 ? amberMat : woodMat);
        const angle = (i / 8) * Math.PI * 2;
        hex.position.set(Math.cos(angle) * 4.8, Math.sin(angle) * 2.2 + 1, -3 + Math.sin(i) * 2);
        worldGroup.add(hex);

        const crystal = new THREE.Mesh(new THREE.OctahedronGeometry(0.28), amberMat);
        crystal.position.copy(hex.position);
        worldGroup.add(crystal);

        updatables.push((t) => {
          hex.rotation.z = t * 0.3 + i;
          hex.rotation.y = Math.sin(t * 0.6 + i) * 0.4;
          crystal.rotation.y = -t * 0.8;
          crystal.position.y = hex.position.y + Math.sin(t * 1.5 + i) * 0.15;
        });
      }
    }

    // ==================== 3D PARTICLE FIELD (ALL THEMES) ====================
    const particleCount = 260;
    const positions = new Float32Array(particleCount * 3);
    const velocities = [];

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 28;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 18;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 22 - 2;
      velocities.push({
        vy: 0.008 + Math.random() * 0.018,
        vx: (Math.random() - 0.5) * 0.008,
      });
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: cfg.particleColor1,
      size: 0.14,
      transparent: true,
      opacity: 0.78,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Touch / Mouse 3D Camera Parallax
    const pointer = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const onMove = (clientX, clientY) => {
      pointer.targetX = (clientX / window.innerWidth - 0.5) * 1.8;
      pointer.targetY = -(clientY / window.innerHeight - 0.5) * 1.2;
    };

    const handleMouseMove = (e) => onMove(e.clientX, e.clientY);
    const handleTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        onMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("resize", handleResize);

    let animId;
    const clock = new THREE.Clock();

    const animate = () => {
      const t = clock.getElapsedTime();

      pointer.x += (pointer.targetX - pointer.x) * 0.05;
      pointer.y += (pointer.targetY - pointer.y) * 0.05;

      camera.position.x = pointer.x * 1.4;
      camera.position.y = 2.2 + pointer.y * 0.9;
      camera.lookAt(0, 0.8, -4);

      updatables.forEach((fn) => fn(t));

      // Update floating particles
      const posAttr = particleGeo.attributes.position;
      for (let i = 0; i < particleCount; i++) {
        let py = posAttr.getY(i) + velocities[i].vy;
        let px = posAttr.getX(i) + velocities[i].vx;
        if (py > 9) py = -9;
        posAttr.setXY(i, px, py);
      }
      posAttr.needsUpdate = true;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
    };
  }, [themeId]);

  return <div ref={mountRef} className="magic-canvas-3d" aria-hidden="true" />;
}
