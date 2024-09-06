<script setup lang="ts">
</script>

<template>
  <div class="layout-view">
    <!-- <el-scrollbar wrap-style="height: 100%" max-height="100%" always>
          </el-scrollbar> -->
    <RouterView />
    <el-backtop :bottom="100"> 
      
    </el-backtop>
    <div class="foot">ICP主体备案号<el-link href="https://beian.miit.gov.cn/#/Integrated/index" :underline="false"
        target="_blank">蜀ICP备2024073907号</el-link></div>
  </div>
</template>

<style scoped>
.layout-view {
  height: 100%;

}

.foot {
  gap: 10px;
  color: #fff;
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
