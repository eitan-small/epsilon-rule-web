<template>
  <BasicNode>
    <template #icon>
      <a-image width="20" :src="EditImage" :preview="false" />
    </template>
  </BasicNode>
</template>

<script setup lang="ts">
  import EditImage from '@/assets/images/edit.png';
  import BasicNode from '../basic-node/index.vue';
</script>
