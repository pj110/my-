<template>
  <div v-loading="loading">
    <div style="text-align: center; display:flex; justify-content: center; gap:40px; align-items: center;">
      <el-radio-group v-model="radio1" @change="chengeData">
        <el-radio value="/无标2.glb" size="large">金色小子</el-radio>
        <el-radio value="/无标题.glb" size="large">紫色小子</el-radio>
        <el-radio value="/copilot.glb" size="large">无色小子</el-radio>
        <el-radio value="球" size="large">球</el-radio>
      </el-radio-group>
      <div style="width: 200px;">
        <el-slider v-model="exposure" :min='0' :max="4" :step="0.1" @input="sliderChange"/>
      </div>
      
    </div>
    <div id="three"></div>
  </div>
</template>

<script setup>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { EXRLoader } from 'three/examples/jsm/loaders/EXRLoader'
import { onMounted, ref } from 'vue'
const radio1 = ref('/无标2.glb')
const scene = new THREE.Scene()
const loading = ref(false)
// 创建相机
const width = window.innerWidth,
height = window.innerHeight - 70
const camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000)
//设置相机位置
camera.position.set(0, 0, 100)
//设置相机方向
camera.lookAt(0, 0, 0)
const exposure = ref(1)
const sliderChange=(e)=>{
    renderer.toneMappingExposure = exposure.value
    // 渲染场景
    renderer.render(scene, camera)
}
// 创建渲染器
const renderer = new THREE.WebGLRenderer({
  alpha: true,
  antialias: true
  //   logarithmicDepthBuffer: true
})
renderer.toneMapping = THREE.ReinhardToneMapping
renderer.toneMappingExposure = exposure.value
renderer.setSize(width, height)

//光源
const ambient = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambient)
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5) //光源，color:灯光颜色，intensity:光照强度
directionalLight.position.set(400, 200, 300)
scene.add(directionalLight)

// 添加环境
const exrLoader = new EXRLoader()
let textureMap = null
exrLoader.loadAsync('/IndoorEnvironmentHDRI009_4K-HDR.exr').then((texture) => {
  textureMap = texture
  textureMap.mapping = THREE.EquirectangularReflectionMapping
  //   scene.background = textureMap
  scene.environment = textureMap
})
function addTextureToModel(model) {
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load('/bakedHead.png');

    // 遍历模型的所有网格，替换其材质的贴图
    model.traverse((child) => {
        if (child.isMesh) {
            // 确保材质是 `MeshStandardMaterial` 类型（GLTF 默认类型）
            if (child.material && child.material.isMeshStandardMaterial) {
                child.material.map = texture; // 替换贴图
                child.material.needsUpdate = true; // 通知渲染器材质已更新
            }
        }
    });
}
// 使用 GLTFLoader 加载模型
let model = null
const mixer = new THREE.AnimationMixer(model)
const loader = new GLTFLoader()
const loadGlb = (url = '/无标2.glb') => {
  loading.value = true
  loader.load(
    url, // 这里替换为你的 glb 文件路径
    (gltf) => {
      // console.log(gltf.scene.children[0].children[0]);

      loading.value = false
      model = gltf.scene
      model.scale.set(10, 10, 10) // 根据需要调整模型的大小
      model.position.set(0, 0, 0) // 设置模型位置
      scene.add(model)
    },
    undefined,
    (error) => {
      console.error('加载模型失败', error)
    }
  )
}
loadGlb()
// 加载金属球
function createBox() {
  const geometry = new THREE.IcosahedronGeometry(10, 10)
  model = new THREE.Mesh(
    geometry,
    new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 1.0, //金属
      roughness: 0.0, //粗糙度
      clearcoat: 1.0, //物体表面清漆层或者说透明涂层的厚度
      clearcoatRoughness: 0.5, //透明涂层表面的粗糙度
      transmission: 1.0, //透光率
      reflectivity: 1.0, //反射率
      sheen: 1.0, //光泽
      ior: 1.0, //折射率
      envMapIntensity: 1.0
    })
  )
  model.position.set(0, 0, 0)
  scene.add(model)
}
// createBox()
const chengeData = (e) => {
  if (model) {
    scene.remove(model)
    model = null // 清空当前模型引用，避免内存泄漏
  }
  if (e === '球') {
    scene.background = textureMap
    controls.enableRotate = true
    createBox()
  } else {
    controls.enableRotate = false
    scene.background = ''
    loadGlb(e)
  }
}
// 添加控制器
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.dampingFactor = 0.25
controls.screenSpacePanning = false
controls.enableRotate = false
controls.addEventListener('change', () => {
  renderer.render(scene, camera)
})

// 监听鼠标移动事件
const mouse = new THREE.Vector2()
const onMouseMove = (event) => {
  // 将鼠标位置从屏幕坐标转换为标准化设备坐标 (-1 到 +1)
  mouse.x = (event.clientX / width) * 2 - 1
  mouse.y = -(event.clientY / height) * 2 + 1
}

// 更新模型的朝向
const updateModelRotation = () => {
  if (model) {
    // 创建一个新的向量，表示鼠标在世界坐标中的位置
    const vector = new THREE.Vector3(-mouse.x, -mouse.y, 1) // 1 表示在摄像机的远近平面上
    vector.unproject(camera) // 转换为世界坐标
    vector.sub(camera.position).normalize() // 得到从相机到鼠标位置的单位向量

    // 设置模型的朝向，始终朝向鼠标的方向
    model.lookAt(vector) // 将物体朝向该方向
    model.rotation.y += Math.PI // 反转模型朝向
  }
}

// 挂载渲染器
onMounted(() => {
  document.getElementById('three')?.appendChild(renderer.domElement)

  // 监听鼠标移动事件
  window.addEventListener('mousemove', onMouseMove, false)

  // 渲染循环
  const animate = () => {
    requestAnimationFrame(animate)

    // 更新动画
    if (mixer) mixer.update(0.01)
    // 更新模型的朝向
    updateModelRotation()

    // 渲染场景
    renderer.render(scene, camera)
  }

  animate()
})
</script>

<style scoped lang="scss"></style>
