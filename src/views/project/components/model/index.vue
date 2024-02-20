<template>
  <SplitPanel>
    <template #left>
      <a-typography-paragraph>Left</a-typography-paragraph>
    </template>
    <template #right>
      <a-typography-paragraph>Right</a-typography-paragraph>
    </template>
  </SplitPanel>
</template>

<script setup lang="ts">
  import SplitPanel from '../split-panel/index.vue';
</script>

<style scoped lang="less"></style>
