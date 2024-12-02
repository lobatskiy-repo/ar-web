// app.js

// Перевірка підтримки WebXR
if (navigator.xr) {
  navigator.xr.isSessionSupported('immersive-ar').then((supported) => {
      if (supported) {
          const arButton = document.getElementById('ar-button');
          arButton.style.display = 'block';
          arButton.addEventListener('click', () => {
              navigator.xr.requestSession('immersive-ar').then(onSessionStarted);
          });
      } else {
          alert('AR не підтримується на цьому пристрої.');
      }
  });
} else {
  alert('WebXR не підтримується на цьому браузері.');
}

function onSessionStarted(session) {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.xr.enabled = true;
  document.body.appendChild(renderer.domElement);
  renderer.xr.setSession(session);

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera();
  scene.add(camera);

  // Додати освітлення
  const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
  scene.add(light);

  // Додати 3D-об'єкт (наприклад, куб)
  const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
  const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
  const cube = new THREE.Mesh(geometry, material);
  cube.position.set(0, 0, -1); // Розташування перед користувачем
  scene.add(cube);

  // Анімація
  function animate() {
      renderer.setAnimationLoop(render);
  }

  function render() {
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
  }

  animate();
}
