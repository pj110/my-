<template>
    <div class="pj-ParallaxScrolling" :class="onlyname"
        :style="{ 'background-position-y': positionY1 + 'px','background-image': `url(${props.bgdata})` }">

    </div>
</template>
<script setup lang="ts">
import { ref, onMounted, onUpdated, defineExpose } from 'vue';

const props = withDefaults(
    defineProps<{
        bgdata: string,
        onlyname: string
    }>(),
    {
        bgdata: null,
        onlyname: ''
    }
)
onMounted(() => {
    //console.log('111', document.getElementsByClassName(props.onlyname))
    window.addEventListener("scroll", handleScroll); //创建滚动监听，页面滚动回调handleScroll方法
    let bgTest: any = document.getElementsByClassName(props.onlyname)[0];
    console.log(bgTest.offsetTop)
    Y1.value = bgTest.offsetTop * ratio.value
})

let positionY1 = ref<number>(0)
let Y1 = ref<number>(0)
let ratio = ref<number>(0.5)

const handleScroll = () => {
    let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
    console.log(scrollTop)
    positionY1.value = Y1.value - scrollTop * ratio.value;
}
</script>
<style lang="scss" scoped>
@import '@/style/mixin.scss';

@include b(ParallaxScrolling) {
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-attachment: fixed;

}
</style>