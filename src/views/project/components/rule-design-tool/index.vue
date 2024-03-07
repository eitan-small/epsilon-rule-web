<template>
  <div class="tool-container">
    <a-tooltip
      content="刷新"
      mini
      position="top"
      background-color="rgb(var(--arcoblue-5))"
    >
      <a-button type="text" @click="emitRefresh">
        <template #icon>
          <Icon name="icon-refresh" />
        </template>
      </a-button>
    </a-tooltip>
    <a-tooltip
      content="后退"
      mini
      position="top"
      background-color="rgb(var(--arcoblue-5))"
    >
      <a-button type="text" @click="emitGoBack">
        <template #icon>
          <Icon name="icon-arrow-left" />
        </template>
      </a-button>
    </a-tooltip>
    <a-tooltip
      content="前进"
      mini
      position="top"
      background-color="rgb(var(--arcoblue-5))"
    >
      <a-button type="text" @click="emitGoForward">
        <template #icon>
          <Icon name="icon-arrow-right" />
        </template>
      </a-button>
    </a-tooltip>
    <a-tooltip
      content="保存"
      mini
      position="top"
      background-color="rgb(var(--arcoblue-5))"
    >
      <a-button type="text" @click="emitSave">
        <template #icon>
          <Icon name="icon-save" />
        </template>
      </a-button>
    </a-tooltip>
    <a-tooltip
      content="校验"
      mini
      position="top"
      background-color="rgb(var(--arcoblue-5))"
    >
      <a-button type="text" @click="emitValidate">
        <template #icon>
          <Icon name="icon-safe" />
        </template>
      </a-button>
    </a-tooltip>
  </div>
</template>

<script setup lang="ts">
  import { Graph } from '@antv/x6';
  import Icon from '@/components/icon/index.vue';

  defineProps({
    graph: Graph,
  });

  // Define custom events
  const emit = defineEmits([
    'refresh',
    'goBack',
    'goForward',
    'save',
    'validate',
  ]);

  // Methods to emit events
  const emitRefresh = () => emit('refresh');
  const emitGoBack = () => emit('goBack');
  const emitGoForward = () => emit('goForward');
  const emitSave = () => emit('save');
  const emitValidate = () => emit('validate');
</script>

<style scoped lang="less">
  .tool-container {
    position: absolute;
    top: 8px;
    left: 8px;
    display: flex;
    gap: 4px;
    width: auto;
    height: auto;
    overflow: hidden;
    background-color: var(--color-bg-1);
  }
</style>
