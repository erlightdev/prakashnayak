import gsap from "gsap";
import * as THREE from "three";

/**
 * Dotted globe for the hero. Kathmandu sits facing the viewer with arcs out to
 * the places the résumé connects it to (Sydney: The Development Agency,
 * Bangalore: BMSIT). Everything is drawn in the page's own CSS tokens so it
 * follows the light/dark toggle without a reload.
 */

export interface GlobeLabel {
  el: HTMLElement;
  lat: number;
  lon: number;
}

export interface GlobeOptions {
  labels?: GlobeLabel[];
  reducedMotion?: boolean;
}

export interface GlobeHandle {
  intro: (delay?: number) => gsap.core.Timeline;
  destroy: () => void;
}

const HOME = { lat: 27.67, lon: 85.32 };
const DESTINATIONS = [
  { lat: -33.87, lon: 151.21 },
  { lat: 12.97, lon: 77.59 },
];
const POINT_COUNT = 1800;
const ARC_SEGMENTS = 96;

function latLonToVec(lat: number, lon: number, radius = 1) {
  const phi = THREE.MathUtils.degToRad(90 - lat);
  const theta = THREE.MathUtils.degToRad(lon + 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}

function readToken(name: string, fallback: string) {
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return value || fallback;
}

const dotVertex = /* glsl */ `
  uniform float uSize;
  uniform float uPixelRatio;
  attribute float aRand;
  varying float vFacing;
  varying float vRand;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vFacing = normalize(normalMatrix * position).z;
    vRand = aRand;
    gl_PointSize = uSize * uPixelRatio * (0.6 + aRand * 0.6) / -mv.z;
    gl_Position = projectionMatrix * mv;
  }
`;

const dotFragment = /* glsl */ `
  uniform vec3 uColor;
  uniform vec3 uAccent;
  uniform float uOpacity;
  uniform float uTime;
  varying float vFacing;
  varying float vRand;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    float disc = smoothstep(0.5, 0.3, d);
    float facing = smoothstep(-0.35, 0.9, vFacing);
    float twinkle = 0.8 + 0.2 * sin(uTime * 1.6 + vRand * 40.0);
    float accent = step(0.965, vRand);
    vec3 color = mix(uColor, uAccent, accent);
    float alpha = disc * mix(0.04, 0.9, facing) * twinkle * uOpacity;
    gl_FragColor = vec4(color, alpha);
  }
`;

const rimVertex = /* glsl */ `
  varying vec3 vNormal;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const rimFragment = /* glsl */ `
  uniform vec3 uColor;
  uniform float uOpacity;
  varying vec3 vNormal;
  void main() {
    float rim = pow(1.0 - abs(vNormal.z), 4.0);
    gl_FragColor = vec4(uColor, rim * 0.18 * uOpacity);
  }
`;

export function createGlobe(container: HTMLElement, options: GlobeOptions = {}): GlobeHandle {
  const { labels = [], reducedMotion = false } = options;

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: "low-power",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);
  renderer.domElement.setAttribute("aria-hidden", "true");
  renderer.domElement.style.display = "block";
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
  camera.position.set(0, 0, 4.6);

  // `pivot` takes pointer parallax and intro scale; `globe` holds the
  // orientation that keeps Kathmandu facing the camera.
  const pivot = new THREE.Group();
  const globe = new THREE.Group();
  pivot.add(globe);
  scene.add(pivot);

  const home = latLonToVec(HOME.lat, HOME.lon);
  const baseRotY = -Math.atan2(home.x, home.z) - 0.25;
  const baseRotX = THREE.MathUtils.degToRad(HOME.lat) * 0.55;
  globe.rotation.set(baseRotX, baseRotY, 0);

  // Dots on a Fibonacci sphere: even coverage without visible seams.
  const positions = new Float32Array(POINT_COUNT * 3);
  const rands = new Float32Array(POINT_COUNT);
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < POINT_COUNT; i++) {
    const y = 1 - (i / (POINT_COUNT - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    positions.set([Math.cos(theta) * r, y, Math.sin(theta) * r], i * 3);
    rands[i] = Math.random();
  }
  const dotGeometry = new THREE.BufferGeometry();
  dotGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  dotGeometry.setAttribute("aRand", new THREE.BufferAttribute(rands, 1));

  const uniforms = {
    uSize: { value: 15 },
    uPixelRatio: { value: renderer.getPixelRatio() },
    uColor: { value: new THREE.Color() },
    uAccent: { value: new THREE.Color() },
    uOpacity: { value: 0 },
    uTime: { value: 0 },
  };
  const dotMaterial = new THREE.ShaderMaterial({
    uniforms,
    vertexShader: dotVertex,
    fragmentShader: dotFragment,
    transparent: true,
    depthWrite: false,
  });
  globe.add(new THREE.Points(dotGeometry, dotMaterial));

  const rimUniforms = { uColor: { value: new THREE.Color() }, uOpacity: { value: 0 } };
  const rimMaterial = new THREE.ShaderMaterial({
    uniforms: rimUniforms,
    vertexShader: rimVertex,
    fragmentShader: rimFragment,
    transparent: true,
    depthWrite: false,
    side: THREE.BackSide,
  });
  const rimGeometry = new THREE.SphereGeometry(1.06, 64, 64);
  pivot.add(new THREE.Mesh(rimGeometry, rimMaterial));

  // Orbit ring: a tilted ellipse that reads as "in motion" even when idle.
  const orbitGeometry = new THREE.BufferGeometry().setFromPoints(
    new THREE.EllipseCurve(0, 0, 1.38, 1.38)
      .getPoints(160)
      .map((p) => new THREE.Vector3(p.x, p.y, 0)),
  );
  const orbitMaterial = new THREE.LineDashedMaterial({
    transparent: true,
    opacity: 0,
    dashSize: 0.03,
    gapSize: 0.045,
  });
  const orbit = new THREE.Line(orbitGeometry, orbitMaterial);
  orbit.computeLineDistances();
  orbit.rotation.set(THREE.MathUtils.degToRad(74), THREE.MathUtils.degToRad(-14), 0);
  pivot.add(orbit);

  // Home marker + pulse rings.
  const markerMaterial = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 });
  const markerGeometry = new THREE.CircleGeometry(0.022, 24);
  const marker = new THREE.Mesh(markerGeometry, markerMaterial);
  marker.position.copy(home).multiplyScalar(1.004);
  marker.lookAt(home.clone().multiplyScalar(2));
  globe.add(marker);

  const ringGeometry = new THREE.RingGeometry(0.03, 0.036, 48);
  const rings = [0, 1].map(() => {
    const material = new THREE.MeshBasicMaterial({
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide,
    });
    const ring = new THREE.Mesh(ringGeometry, material);
    ring.position.copy(marker.position);
    ring.lookAt(home.clone().multiplyScalar(2));
    globe.add(ring);
    return { ring, material };
  });

  // Arcs from home, each with a comet travelling along it.
  const cometGeometry = new THREE.SphereGeometry(0.014, 12, 12);
  const arcs = DESTINATIONS.map((dest, i) => {
    const end = latLonToVec(dest.lat, dest.lon);
    const mid = home
      .clone()
      .add(end)
      .normalize()
      .multiplyScalar(1 + home.distanceTo(end) * 0.42);
    const curve = new THREE.QuadraticBezierCurve3(home.clone(), mid, end);
    const geometry = new THREE.BufferGeometry().setFromPoints(curve.getPoints(ARC_SEGMENTS));
    geometry.setDrawRange(0, 0);
    const material = new THREE.LineBasicMaterial({ transparent: true, opacity: 0.75 });
    globe.add(new THREE.Line(geometry, material));

    const cometMaterial = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 });
    const comet = new THREE.Mesh(cometGeometry, cometMaterial);
    globe.add(comet);

    const endDot = new THREE.Mesh(
      markerGeometry,
      new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 }),
    );
    endDot.scale.setScalar(0.7);
    endDot.position.copy(end).multiplyScalar(1.004);
    endDot.lookAt(end.clone().multiplyScalar(2));
    globe.add(endDot);

    return {
      curve,
      geometry,
      material,
      comet,
      cometMaterial,
      endDot,
      progress: { value: 0 },
      offset: i * 0.5,
    };
  });

  const applyTheme = () => {
    const brand = new THREE.Color(readToken("--brand-base", "#0c8c5e"));
    const muted = new THREE.Color(readToken("--foreground-tertiary", "#717d79"));
    uniforms.uColor.value.copy(muted);
    uniforms.uAccent.value.copy(brand);
    rimUniforms.uColor.value.copy(brand);
    orbitMaterial.color.copy(muted);
    markerMaterial.color.copy(brand);
    for (const { material } of rings) material.color.copy(brand);
    for (const arc of arcs) {
      arc.material.color.copy(brand);
      arc.cometMaterial.color.copy(brand);
      (arc.endDot.material as THREE.MeshBasicMaterial).color.copy(brand);
    }
    requestRender();
  };

  // Labels: project their anchor each frame and hide them on the far side.
  const labelAnchors = labels.map((label) => ({
    ...label,
    anchor: latLonToVec(label.lat, label.lon, 1.02),
  }));
  const projected = new THREE.Vector3();
  const worldNormal = new THREE.Vector3();
  const toCamera = new THREE.Vector3();
  let width = 1;
  let height = 1;

  const updateLabels = () => {
    for (const { el, anchor } of labelAnchors) {
      projected.copy(anchor).applyMatrix4(globe.matrixWorld);
      worldNormal.copy(projected).normalize();
      toCamera.copy(camera.position).sub(projected).normalize();
      const facing = worldNormal.dot(toCamera);
      projected.project(camera);
      const x = (projected.x * 0.5 + 0.5) * width;
      const y = (-projected.y * 0.5 + 0.5) * height;
      el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
      el.style.opacity = String(
        THREE.MathUtils.clamp((facing - 0.15) * 4, 0, 1) * uniforms.uOpacity.value,
      );
    }
  };

  const resize = () => {
    width = container.clientWidth || 1;
    height = container.clientHeight || 1;
    renderer.setSize(width, height, false);
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    requestRender();
  };

  // Pointer parallax, eased toward the target every frame. Fine pointers only:
  // on touch the "pointer" is wherever the last tap landed, so it would jump.
  const pointer = { x: 0, y: 0 };
  const tilt = { x: 0, y: 0 };
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const onPointerMove = (event: PointerEvent) => {
    if (drag.active) return;
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = (event.clientY / window.innerHeight) * 2 - 1;
  };
  if (!reducedMotion && finePointer) {
    window.addEventListener("pointermove", onPointerMove, { passive: true });
  }

  // Drag to spin, mouse or touch. `touch-action: pan-y` hands vertical swipes
  // back to the page so the globe never traps scrolling on phones; horizontal
  // drags spin it. Released spins coast to a stop, and the tilt eases back.
  const drag = { active: false, id: -1, lastX: 0, lastY: 0, y: 0, x: 0, velY: 0, velX: 0 };
  const DRAG_SPEED = 0.006;
  const MAX_TILT = 0.7;
  const canvas = renderer.domElement;
  canvas.style.cursor = "grab";
  canvas.style.touchAction = "pan-y";

  const onDragStart = (event: PointerEvent) => {
    if (event.button !== 0) return;
    drag.active = true;
    drag.id = event.pointerId;
    drag.lastX = event.clientX;
    drag.lastY = event.clientY;
    drag.velX = drag.velY = 0;
    // Capture keeps the drag alive when the pointer leaves the canvas; it can
    // throw for pointers the browser no longer tracks, which is harmless here.
    try {
      canvas.setPointerCapture(event.pointerId);
    } catch {}
    canvas.style.cursor = "grabbing";
  };
  const onDragMove = (event: PointerEvent) => {
    if (!drag.active || event.pointerId !== drag.id) return;
    const dx = (event.clientX - drag.lastX) * DRAG_SPEED;
    const dy = (event.clientY - drag.lastY) * DRAG_SPEED;
    drag.lastX = event.clientX;
    drag.lastY = event.clientY;
    drag.y += dx;
    drag.x = THREE.MathUtils.clamp(drag.x + dy, -MAX_TILT, MAX_TILT);
    drag.velY = dx;
    drag.velX = dy;
    requestRender();
  };
  const onDragEnd = (event: PointerEvent) => {
    if (event.pointerId !== drag.id) return;
    drag.active = false;
    drag.id = -1;
    canvas.style.cursor = "grab";
    if (reducedMotion) drag.velX = drag.velY = 0;
  };
  canvas.addEventListener("pointerdown", onDragStart);
  canvas.addEventListener("pointermove", onDragMove);
  canvas.addEventListener("pointerup", onDragEnd);
  canvas.addEventListener("pointercancel", onDragEnd);

  const startedAt = performance.now();
  let running = false;
  let visible = true;
  let frame = 0;

  const draw = () => {
    const elapsed = reducedMotion ? 0 : (performance.now() - startedAt) / 1000;
    uniforms.uTime.value = elapsed;

    tilt.x += (pointer.y * 0.18 - tilt.x) * 0.05;
    tilt.y += (pointer.x * 0.28 - tilt.y) * 0.05;
    pivot.rotation.x = tilt.x;
    pivot.rotation.y = tilt.y;
    if (!drag.active && !reducedMotion) {
      drag.y += drag.velY;
      drag.x = THREE.MathUtils.clamp(drag.x + drag.velX, -MAX_TILT, MAX_TILT);
      drag.velY *= 0.94;
      drag.velX *= 0.9;
      drag.x *= 0.97;
    }
    globe.rotation.x = baseRotX + drag.x;
    globe.rotation.y = baseRotY + Math.sin(elapsed * 0.12) * 0.32 + drag.y;
    orbit.rotation.z = elapsed * 0.05;

    rings.forEach(({ ring, material }, i) => {
      const t = reducedMotion ? 0.35 : (elapsed * 0.55 + i * 0.5) % 1;
      ring.scale.setScalar(1 + t * 2.6);
      material.opacity = (1 - t) * 0.8 * markerMaterial.opacity;
    });

    for (const arc of arcs) {
      const drawn = Math.round(arc.progress.value * ARC_SEGMENTS) + 1;
      arc.geometry.setDrawRange(0, arc.progress.value > 0 ? drawn : 0);
      const done = arc.progress.value >= 1;
      (arc.endDot.material as THREE.MeshBasicMaterial).opacity = done ? markerMaterial.opacity : 0;
      if (done && !reducedMotion) {
        const t = (elapsed * 0.22 + arc.offset) % 1;
        arc.comet.position.copy(arc.curve.getPoint(t));
        arc.cometMaterial.opacity = Math.sin(t * Math.PI);
      } else {
        arc.cometMaterial.opacity = 0;
      }
    }

    renderer.render(scene, camera);
    updateLabels();
  };

  const loop = () => {
    if (!running) return;
    draw();
    frame = requestAnimationFrame(loop);
  };

  const start = () => {
    if (running || !visible) return;
    running = true;
    frame = requestAnimationFrame(loop);
  };

  const stop = () => {
    running = false;
    cancelAnimationFrame(frame);
  };

  // With reduced motion there is no loop; tweens and theme changes ask for a
  // single frame instead.
  function requestRender() {
    if (running) return;
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(draw);
  }

  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(container);

  const intersection = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (reducedMotion) return;
    if (visible) start();
    else stop();
  });
  intersection.observe(container);

  const themeObserver = new MutationObserver(applyTheme);
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

  applyTheme();
  resize();
  if (!reducedMotion) start();

  const intro = (delay = 0) => {
    pivot.scale.setScalar(reducedMotion ? 1 : 0.86);
    const tl = gsap.timeline({ delay, onUpdate: requestRender });
    if (reducedMotion) {
      tl.to(uniforms.uOpacity, { value: 1, duration: 0.4 })
        .to(rimUniforms.uOpacity, { value: 1, duration: 0.4 }, 0)
        .to(markerMaterial, { opacity: 1, duration: 0.4 }, 0)
        .to(orbitMaterial, { opacity: 0.35, duration: 0.4 }, 0)
        .set(
          arcs.map((a) => a.progress),
          { value: 1 },
          0,
        );
      return tl;
    }
    tl.to(uniforms.uOpacity, { value: 1, duration: 1.6, ease: "power2.out" })
      .to(pivot.scale, { x: 1, y: 1, z: 1, duration: 1.8, ease: "expo.out" }, 0)
      .to(rimUniforms.uOpacity, { value: 1, duration: 1.4, ease: "power2.out" }, 0.2)
      .to(orbitMaterial, { opacity: 0.35, duration: 1.2, ease: "power2.out" }, 0.4)
      .to(markerMaterial, { opacity: 1, duration: 0.5, ease: "power2.out" }, 0.7)
      .to(
        arcs.map((a) => a.progress),
        { value: 1, duration: 1.4, ease: "power3.inOut", stagger: 0.25 },
        0.9,
      );
    return tl;
  };

  const destroy = () => {
    stop();
    resizeObserver.disconnect();
    intersection.disconnect();
    themeObserver.disconnect();
    window.removeEventListener("pointermove", onPointerMove);
    canvas.removeEventListener("pointerdown", onDragStart);
    canvas.removeEventListener("pointermove", onDragMove);
    canvas.removeEventListener("pointerup", onDragEnd);
    canvas.removeEventListener("pointercancel", onDragEnd);
    scene.traverse((object) => {
      const mesh = object as THREE.Mesh;
      mesh.geometry?.dispose();
      const material = mesh.material as THREE.Material | THREE.Material[] | undefined;
      if (Array.isArray(material)) material.forEach((m) => m.dispose());
      else material?.dispose();
    });
    renderer.dispose();
    renderer.domElement.remove();
  };

  return { intro, destroy };
}
