<template>
  <BasicNode>
    <template #icon>
      <a-image width="20" :src="SwitchImage" :preview="false" />
    </template>
  </BasicNode>
</template>

<script setup lang="ts">
  import SwitchImage from '@/assets/images/switch.png';
  import BasicNode from '../basic-node/index.vue';
</script>
