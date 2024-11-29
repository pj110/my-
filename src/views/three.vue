<template>
    <div id="three"></div>
</template>

<script setup>
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { onMounted } from 'vue';

const scene = new THREE.Scene();

// 创建相机
const width = window.innerWidth, height = window.innerHeight;
const camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
//设置相机位置
  camera.position.set(0, 0, 100);
//设置相机方向
  camera.lookAt(0, 0, 0);

// 创建渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);

  //光源
  const ambient = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(ambient);
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);//光源，color:灯光颜色，intensity:光照强度
  directionalLight.position.set(400, 200, 300);
  scene.add(directionalLight);



// 使用 GLTFLoader 加载模型
let model = null;
const mixer = new THREE.AnimationMixer(model);
const loader = new GLTFLoader();
loader.load(
  '../../public/copilot.glb', // 这里替换为你的 glb 文件路径
  (gltf) => {
    model = gltf.scene;
    model.scale.set(10, 10, 10); // 根据需要调整模型的大小
    model.position.set(0, 0, 0); // 设置模型位置
    gltf.animations.forEach((clip) => {
        mixer.clipAction(clip).play();
    });
    scene.add(model);
  },
  undefined,
  (error) => {
    console.error('加载模型失败', error);
  }
);

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
  if (model) {
    // 创建一个新的向量，表示鼠标在世界坐标中的位置
    const vector = new THREE.Vector3(-mouse.x, -mouse.y, 1); // 1 表示在摄像机的远近平面上
    vector.unproject(camera); // 转换为世界坐标
    vector.sub(camera.position).normalize(); // 得到从相机到鼠标位置的单位向量

    // 设置模型的朝向，始终朝向鼠标的方向
    model.lookAt(vector); // 将物体朝向该方向
    model.rotation.y += Math.PI; // 反转模型朝向
  }
};

// 挂载渲染器
onMounted(() => {
  document.getElementById('three')?.appendChild(renderer.domElement);

  // 监听鼠标移动事件
  window.addEventListener('mousemove', onMouseMove, false);

  // 渲染循环
  const animate = () => {
    requestAnimationFrame(animate);

  // 更新动画
  if (mixer) mixer.update(0.01);
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
