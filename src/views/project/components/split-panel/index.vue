<template>
  <div class="model-container">
    <a-split
      :style="{
        height: '100%',
        width: 'calc(100vw - 80px)',
      }"
      default-size="250px"
      max="0.5"
      min="250px"
    >
      <template #first>
        <slot name="left" />
      </template>
      <template #second>
        <slot name="right" />
      </template>
      <template #resize-trigger>
        <div class="resize-trigger" />
      </template>
    </a-split>
  </div>
</template>

<style scoped lang="less">
  .model-container {
    :deep(.arco-split-trigger) {
      position: relative;

      &::before {
        position: absolute;
        right: -1.5px;
        left: -1.5px;
        z-index: 1;
        height: 100%;
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
    width: 1px;
    height: 100%;
    background-color: var(--color-neutral-2);
  }
</style>
