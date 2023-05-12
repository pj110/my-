<template>
  <div class="header">
    123123123
  </div>
  <div class="body">
    <section class="section1" id="section1">
      <div class="MoveCardBox">
        <MoveCard :data-image="womanPng">
          <template v-slot:header>
            <h1>Canyons</h1>
          </template>
          <template v-slot:content>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
          </template>
        </MoveCard>
      </div>

    </section>
    <section class="section2">
      公司官网
    </section>
  </div>
</template>
<script setup lang="ts">
import womanPng from '@/assets/images/woman.png'
import { ref, onMounted, nextTick } from 'vue'
import praticleText from '@/components/canvas/TextParticle.vue'
import MoveCard from '@/components/MoveCard/MoveCard.vue'

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
  height: 130px;
  width: 100%;
}

.body {
  height: 8000px;

}

.section1 {
  padding-top: 60px;
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: #4612a4;
  z-index: -1;

  .MoveCardBox {
  }
}

.section2 {
  height: 100vh;
  margin-top: 100vh;
  width: 100%;
  padding: 100px 5% 30px;
  position: relative;
  background: #fff;

  &:before {
    width: 100%;
    height: 40vh;
    left: 0%;
    top: -40vh;
    content: '';
    position: absolute;
    background: linear-gradient(0deg, rgba(70, 18, 164, 1), rgba(70, 18, 164, 0));
    z-index: 1;
  }

  //&::after {}
}
</style>