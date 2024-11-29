<template>
    <div id="three"></div>
</template>

<script setup>
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { onMounted } from 'vue';

const scene = new THREE.Scene();

// 创建相机
const width = window.innerWidth, height = window.innerHeight;
const camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
camera.position.set(200, 200, 200);
camera.lookAt(0, 0, 0);

// 创建渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);

// 创建一个物体
const geometry = new THREE.BoxGeometry(100, 100, 100);
const material = new THREE.MeshPhongMaterial({
  color: 0x00ffff,
  shininess: 50,
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// 添加环境光
const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(ambientLight);

// 添加点光源
const light1 = new THREE.PointLight(0xffffff, 1);
light1.position.set(100, 100, 100);
scene.add(light1);

// 添加控制器
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.screenSpacePanning = false;
controls.addEventListener('change', () => {
  renderer.render(scene, camera);
});

// 监听鼠标移动事件
const mouse = new THREE.Vector2();
const onMouseMove = (event) => {
  // 将鼠标位置从屏幕坐标转换为标准化设备坐标 (-1 到 +1)
  mouse.x = (event.clientX / width) * 2 - 1;
  mouse.y = -(event.clientY / height) * 2 + 1;
};

// 更新模型的朝向
const updateModelRotation = () => {
  // 创建一个新的向量，表示鼠标在世界坐标中的位置
  const vector = new THREE.Vector3(mouse.x, mouse.y, 1); // 1 表示在摄像机的远近平面上
  vector.unproject(camera); // 转换为世界坐标
  vector.sub(camera.position).normalize(); // 得到从相机到鼠标位置的单位向量

  // 设置物体的朝向，始终朝向鼠标的方向
  mesh.lookAt(vector); // 将物体朝向该方向
};

// 挂载渲染器
onMounted(() => {
  document.getElementById('three')?.appendChild(renderer.domElement);

  // 监听鼠标移动事件
  window.addEventListener('mousemove', onMouseMove, false);

  // 渲染循环
  const animate = () => {
    requestAnimationFrame(animate);

    // 更新模型的朝向
    updateModelRotation();

    // 渲染场景
    renderer.render(scene, camera);
  };

  animate();
});


</script>

<style scoped lang="scss">

</style>
