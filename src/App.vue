<script setup lang="ts">
</script>

<template>
  <div class="layout-view">
    <el-scrollbar wrap-style="height: 100%" max-height="100%" always>
      <RouterView />
      <el-backtop :bottom="100" target=".layout-view  .el-scrollbar__wrap">
      </el-backtop>
    </el-scrollbar>
  </div>
</template>

<style scoped>
.layout-view {
  height: 100%;

}
</style>
