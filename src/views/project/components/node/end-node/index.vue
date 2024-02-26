<template>
  <BasicNode>
    <template #icon>
      <a-image width="20" :src="EndImage" :preview="false" />
    </template>
  </BasicNode>
</template>

<script setup lang="ts">
  import EndImage from '@/assets/images/end.png';
  import BasicNode from '../basic-node/index.vue';
</script>
