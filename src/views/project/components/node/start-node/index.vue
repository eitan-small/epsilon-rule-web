<template>
  <BasicNode label="开始节点" status="default">
    <template #icon>
      <a-image width="20" :src="StartImage" :preview="false" />
    </template>
  </BasicNode>
</template>

<script setup lang="ts">
  import StartImage from '@/assets/images/start.png';
  import BasicNode from '../basic-node/index.vue';
</script>
