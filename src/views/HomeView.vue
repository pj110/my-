<template>
  <div class="header">
    <h1>我的官网</h1>
    <div>
      联系我们
    </div>
  </div>
  <section class="section1" id="section1">
    <div class="MoveCardBox">
      <MoveCard :data-image="womanPng">
        <template v-slot:header>
          <h1>小程序开发</h1>
        </template>
        <template v-slot:content>
          <p>助力数字化转型</p>
        </template>
      </MoveCard>
      <MoveCard :data-image="womanPng">
        <template v-slot:header>
          <h1>网站/H5</h1>
        </template>
        <template v-slot:content>
          <p>3D沉浸式品牌网站定制</p>
        </template>
      </MoveCard>
      <MoveCard :data-image="womanPng">
        <template v-slot:header>
          <h1>智慧城市</h1>
        </template>
        <template v-slot:content>
          <p>====</p>
        </template>
      </MoveCard>
      <MoveCard :data-image="womanPng">
        <template v-slot:header>
          <h1>大数据</h1>
        </template>
        <template v-slot:content>
          <p>===</p>
        </template>
      </MoveCard>
      <MoveCard :data-image="womanPng">
        <template v-slot:header>
          <h1>数据可视化</h1>
        </template>
        <template v-slot:content>
          <p>---</p>
        </template>
      </MoveCard>
    </div>
    <div class="section1-body">
      <p>· 抢占亿级市场流量新入口，打造微信小程序私域流量</p>
      <p>· 高效传达品牌信息，建立品牌初步印象，根据企业在不同发展阶段对应不同品牌形象需求，实现品牌线上形象传播</p>
    </div>
  </section>
  <section class="section2">
    <div class="section2-title">
      <div class="section2-title-data">
        <p>THIS DATA</p>
        <div>文本</div>
      </div>
      <div class="section2-title-carousel">
        <el-carousel :interval="4000" type="card" height="200px">
          <el-carousel-item v-for="item in 3" :key="item">
            <div>
              {{ item }}
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <div class="section2-card3D">
      <ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
        <li>6</li>
        <li>7</li>
        <li>8</li>
        <li>9</li>
        <li>10</li>
        <li>11</li>
        <li>12</li>
        <li>13</li>
        <li>14</li>
        <li>15</li>
        <li>16</li>
        <li>16</li>
        <li>16</li>
        <li>16</li>
        <li>16</li>
        <li>16</li>
        <li>16</li>
        <li>16</li>
        <li>16</li>
        <li>16</li>
        <li>16</li>
        <li>16</li>
      </ul>
    </div>
  </section>
  <section class="section3">
    <ParallaxScrolling :bgdata="ps1" onlyname="ps1">

    </ParallaxScrolling>
  </section>
  <section class="section3">
    <ParallaxScrolling :bgdata="ps2" onlyname="ps2">

    </ParallaxScrolling>
  </section>
</template>
<script setup lang="ts">
import ps1 from '@/assets/images/ps1.jpg'
import ps2 from '@/assets/images/ps2.jpg'
import womanPng from '@/assets/images/woman.png'
import { ref, onMounted, nextTick } from 'vue'
import praticleText from '@/components/canvas/TextParticle.vue'
import MoveCard from '@/components/MoveCard/MoveCard.vue'
import ParallaxScrolling from '@/components/ParallaxScrolling/ParallaxScrolling.vue'
//import SexBtn from '@/components/SexBtn/SexBtn.vue'

let canvasHeight = ref<number>(0);
let canvasWidth = ref<number>(0);
let myCanvs = ref(null);
onMounted(() => {
  canvasHeight.value = document.getElementById('section1').offsetHeight;
  canvasWidth.value = document.getElementById('section1').offsetWidth;
  nextTick(() => {
    //myCanvs.value.startCanvas()
  })
})

</script>
<style lang="scss" scoped>
.header {
  color: #fff;
  padding: 30px 5%;
  height: 130px;
  width: 100%;
  position: absolute;
  top: 0;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  align-items: center;

  div {
    cursor: pointer;
  }
}

.section1 {
  padding-top: 130px;
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: #4612a4;
  z-index: -1;

  &::after {
    content: '';
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
  }

  .MoveCardBox {
    margin: 50px 10%;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  }

  .section1-body {
    margin: 50px 10%;
    color: #fff;

    p {
      font-weight: 600;
      font-size: 50px;
      margin: 0;
    }
  }
}

.section2 {
  height: 100vh;
  margin-top: 100vh;
  width: 100%;
  padding: 100px 5% 30px;
  position: relative;
  background: #4612a4;
  padding: 100px 5% 30px;

  .section2-title {
    .section2-title-data {
      margin-bottom: 3vh;
      position: relative;
      text-align: center;

      p {
        margin: 0 0;
        font-weight: 800;
        color: transparent;
        font-size: 100px;
        line-height: 100px;
        -webkit-text-stroke: 1px #999;
      }

      div {
        font-weight: 600;
        position: absolute;
        color: #fff;
        font-size: 50px;
        top: 36%;
        width: 100%;
      }
    }

    .section2-title-carousel {
      .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
      }

      .el-carousel__item:nth-child(2n + 1) {
        background-color: #d3dce6;
      }

    }
  }

  .section2-card3D {
    perspective: 1000;
    -webkit-perspective: 1000;
    position: relative;

    ul {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      transform-style: preserve-3d;
      transform: rotateX(52deg);
      top: 0px;



      li {
        list-style-type: none;
        width: 8vw;
        height: 6vw;
        margin: 0.5vw;
        transform-style: preserve-3d;
        transition: 0.5s;

        background-color: rgb(238, 22, 191);

        &:nth-child(2n+1) {
          background-color: aqua;
        }

        &:hover {
          transform: translateZ(20px);
        }
      }
    }
  }

  &:before {
    width: 100%;
    height: 40vh;
    left: 0%;
    top: -40vh;
    content: '';
    position: absolute;
    background: linear-gradient(0deg, rgba(70, 18, 164, 1), rgba(70, 18, 164, 0));
    z-index: 1;
    pointer-events: none;
  }

  &::after {
    width: 100%;
    height: 60vh;
    left: 0%;
    bottom: 0vh;
    content: '';
    position: absolute;
    background: linear-gradient(0deg, rgba(70, 18, 164, 1), rgba(70, 18, 164, 0));
    z-index: 1;
    pointer-events: none;
  }
}

.section3 {
  height: 100vh;
  width: 100%;
  background: #4612a4;

}
</style>