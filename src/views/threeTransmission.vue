<template>
  <div id="three"></div>
</template>
<script setup>
import * as THREE from 'three'
import { onMounted, ref } from 'vue'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
const scene = new THREE.Scene()
// 创建相机
const width = window.innerWidth,
  height = window.innerHeight - 70
const camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000)
//设置相机位置
camera.position.set(0, 0, 100)
//设置相机方向
camera.lookAt(0, 0, 0)
const exposure = ref(1)
// 创建渲染器
const renderer = new THREE.WebGLRenderer({
  alpha: true,
  antialias: true
  //   logarithmicDepthBuffer: true
})
renderer.toneMapping = THREE.ReinhardToneMapping
// 伽马值
renderer.toneMappingExposure = exposure.value
renderer.setSize(width, height)

//光源
const ambient = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambient)
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5) //光源，color:灯光颜色，intensity:光照强度
directionalLight.position.set(400, 200, 300)
scene.add(directionalLight)
// 添加控制气
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.dampingFactor = 0.25
controls.screenSpacePanning = false

// 创建一个TorusKnotGeometry
const radius = 20 // 圆环半径
const tube = 10 // 管道半径
const radialSegments = 100 // 环的细分
const tubularSegments = 16 // 管道细分
// 创建一个TorusKnotGeometry
const torusKnotGeometry = new THREE.TorusKnotGeometry(
  radius,
  tube,
  radialSegments,
  tubularSegments,
)
// 获取 TorusKnotGeometry 的顶点位置
const positions = torusKnotGeometry.attributes.position.array
// 创建一个新的 BufferGeometry 用于存放填充点
// const newGeometry = new THREE.BufferGeometry();
// const randomPositions = []
// 生成 400 个随机点并将其分布到 TorusKnotGeometry 内
// 创建材质
const material = new THREE.MeshBasicMaterial({ color: 0x0077ff, wireframe: true })
const torus=new THREE.Mesh(torusKnotGeometry, material)
torus.position.x=0
torus.position.y=0
torus.position.z=0
scene.add(torus)
for (let i = 0; i < positions.length/3; i++) {

  // 计算点在 torus knot 上的位置
  const x = positions[i*3];
  const y = positions[i*3+1];
  const z = positions[i*3+2];
  // 创建一个锥形几何体
  const coneGeometry = new THREE.ConeGeometry(1, 1, 3, 1)
    // 创建锥形 Mesh
    const cone = new THREE.Mesh(coneGeometry, material);
    cone.position.x=x
    cone.position.y=y
    cone.position.z=z

    scene.add(cone);
  // 将计算得到的点位置添加到 randomPositions 数组中
  // randomPositions.push(x, y, z)
}
// 设置 BufferGeometry 的顶点数据
// newGeometry.setAttribute('position', new THREE.Float32BufferAttribute(randomPositions, 3));
// 创建一个 Mesh
// const material = new THREE.PointsMaterial({ color: 0x00ff00, size: 0.2 });
// const points = new THREE.Points(newGeometry, material);
// 添加到场景中
// scene.add(points);

// 挂载渲染器
onMounted(() => {
  document.getElementById('three')?.appendChild(renderer.domElement)

  // 渲染循环
  const animate = () => {
    requestAnimationFrame(animate)
    // 渲染场景
    renderer.render(scene, camera)
  }

  animate()
})
</script>
