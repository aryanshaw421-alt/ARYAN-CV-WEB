/* ==========================================================
   ARYAN KUMAR SHAW — THREE.JS 3D SCENE & SHADER ENGINE
   ========================================================== */

(function () {
  const canvas = document.getElementById('webgl-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  // 1. Scene Setup
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x07070c, 0.0018);

  const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 80;

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance',
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // 2. Central 3D Holographic Polyhedron Core
  const coreGroup = new THREE.Group();
  scene.add(coreGroup);

  // Outer Icosahedron (Cyan Wireframe & Glass Points)
  const icosaGeometry = new THREE.IcosahedronGeometry(18, 2);
  const icosaMaterial = new THREE.MeshStandardMaterial({
    color: 0x00f2fe,
    wireframe: true,
    transparent: true,
    opacity: 0.35,
    roughness: 0.1,
    metalness: 0.9,
  });
  const icosaMesh = new THREE.Mesh(icosaGeometry, icosaMaterial);
  coreGroup.add(icosaMesh);

  // Inner Torus Knot (Violet / Indigo Core)
  const torusGeometry = new THREE.TorusKnotGeometry(10, 2.2, 100, 16);
  const torusMaterial = new THREE.MeshStandardMaterial({
    color: 0x8b5cf6,
    wireframe: true,
    transparent: true,
    opacity: 0.45,
    roughness: 0.2,
    metalness: 0.8,
  });
  const torusMesh = new THREE.Mesh(torusGeometry, torusMaterial);
  coreGroup.add(torusMesh);

  // Inner Glowing Nucleus Octahedron
  const nucleusGeometry = new THREE.OctahedronGeometry(5, 0);
  const nucleusMaterial = new THREE.MeshBasicMaterial({
    color: 0x00f5a0,
    wireframe: true,
    transparent: true,
    opacity: 0.7,
  });
  const nucleusMesh = new THREE.Mesh(nucleusGeometry, nucleusMaterial);
  coreGroup.add(nucleusMesh);

  // 3. Particle Starfield / Constellation
  const particleCount = 1800;
  const particleGeometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);

  const colorPalette = [
    new THREE.Color(0x00f2fe), // Cyan
    new THREE.Color(0x8b5cf6), // Violet
    new THREE.Color(0xec4899), // Pink
    new THREE.Color(0x00f5a0), // Emerald
  ];

  for (let i = 0; i < particleCount; i++) {
    // Distribute in a spherical cloud around the scene
    const radius = 60 + Math.random() * 140;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(Math.random() * 2 - 1);

    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = radius * Math.cos(phi);

    const chosenColor = colorPalette[Math.floor(Math.random() * colorPalette.length)];
    colors[i * 3] = chosenColor.r;
    colors[i * 3 + 1] = chosenColor.g;
    colors[i * 3 + 2] = chosenColor.b;
  }

  particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  // Custom circular point texture
  const canvasTexture = document.createElement('canvas');
  canvasTexture.width = 32;
  canvasTexture.height = 32;
  const ctx = canvasTexture.getContext('2d');
  const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
  gradient.addColorStop(0, 'rgba(255,255,255,1)');
  gradient.addColorStop(0.3, 'rgba(0,242,254,0.8)');
  gradient.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 32, 32);

  const particlePointTexture = new THREE.CanvasTexture(canvasTexture);

  const particleMaterial = new THREE.PointsMaterial({
    size: 1.8,
    vertexColors: true,
    map: particlePointTexture,
    transparent: true,
    opacity: 0.75,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
  scene.add(particleSystem);

  // 4. Dynamic Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);

  const pointLight1 = new THREE.PointLight(0x00f2fe, 3, 200);
  pointLight1.position.set(50, 50, 50);
  scene.add(pointLight1);

  const pointLight2 = new THREE.PointLight(0x8b5cf6, 3, 200);
  pointLight2.position.set(-50, -50, 50);
  scene.add(pointLight2);

  // 5. Mouse Parallax & Interaction Tracking
  let mouseX = 0;
  let mouseY = 0;
  let targetX = 0;
  let targetY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  // Scroll Tracking for Dynamic Camera Movement
  let scrollY = 0;
  window.addEventListener('scroll', () => {
    scrollY = window.scrollY || window.pageYOffset;
  });

  // 6. Responsive Resize Handling
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });

  // 7. Render Loop
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);

    const elapsedTime = clock.getElapsedTime();

    // Smooth mouse damping
    targetX += (mouseX - targetX) * 0.05;
    targetY += (mouseY - targetY) * 0.05;

    // Rotate core meshes
    icosaMesh.rotation.x = elapsedTime * 0.15;
    icosaMesh.rotation.y = elapsedTime * 0.2;

    torusMesh.rotation.x = -elapsedTime * 0.25;
    torusMesh.rotation.y = elapsedTime * 0.3;

    nucleusMesh.rotation.x = elapsedTime * 0.4;
    nucleusMesh.rotation.z = -elapsedTime * 0.4;

    // Particle slow drift
    particleSystem.rotation.y = elapsedTime * 0.03;
    particleSystem.rotation.x = elapsedTime * 0.015;

    // Position adjustments based on scroll & mouse
    const scrollFactor = scrollY * 0.04;
    coreGroup.position.y = -scrollFactor * 0.5;
    coreGroup.position.x = Math.sin(scrollFactor * 0.05) * 10;
    coreGroup.position.z = Math.cos(scrollFactor * 0.05) * 10 - (scrollFactor * 0.2);

    // Subtle parallax tilt
    camera.position.x = targetX * 12;
    camera.position.y = -targetY * 12;
    camera.lookAt(0, -scrollFactor * 0.3, 0);

    renderer.render(scene, camera);
  }

  animate();
})();
