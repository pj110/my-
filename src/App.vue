<script setup lang="ts">
</script>

<template>
  <div class="layout-view">
    <!-- <el-scrollbar wrap-style="height: 100%" max-height="100%" always>
          </el-scrollbar> -->
    <RouterView />
    <el-backtop :bottom="100">
    </el-backtop>
  </div>
</template>

<style scoped>
.layout-view {
  height: 100%;
}
</style>
