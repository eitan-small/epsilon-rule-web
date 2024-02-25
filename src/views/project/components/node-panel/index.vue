<template>
  <a-resize-box :directions="['top']" class="node-panel">
    <template #resize-trigger>
      <div class="resize-trigger" />
    </template>
  </a-resize-box>
</template>

<style scoped lang="less">
  .node-panel {
    position: absolute;
    bottom: 8px;
    width: 100%;
    height: 100px;
    overflow: hidden;
    background-color: var(--color-bg-1);

    :deep(.arco-resizebox-trigger) {
      position: relative;

      &::before {
        position: absolute;
        top: -1.5px;
        bottom: -1.5px;
        z-index: 1;
        width: 100%;
        background-color: var(--activate-tab-color);
        opacity: 0;
        transition: opacity 0.4s;
        content: '';
      }

      &:hover::before {
        opacity: 1;
      }
    }
  }

  .resize-trigger {
    width: 100%;
    height: 1px;
    background-color: var(--color-neutral-2);
  }
</style>
