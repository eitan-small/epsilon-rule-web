<template>
  <div :class="['epsilon-node', statusClass]">
    <div :class="['node-left', statusClass]" />
    <div :style="{ marginLeft: '8px' }">
      <slot name="icon" />
    </div>
    <a-typography-text
      class="label"
      :ellipsis="{
        rows: 1,
        showTooltip: true,
      }"
    >
      {{ label }}
    </a-typography-text>
    <div class="node-status">
      <a-image
        v-if="status === 'success'"
        :src="SuccessImage"
        width="24"
        :preview="false"
      />
      <a-image
        v-else-if="status === 'failed'"
        :src="FailedImage"
        width="24"
        :preview="false"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, defineProps } from 'vue';
  import SuccessImage from '@/assets/images/success.png';
  import FailedImage from '@/assets/images/failed.png';

  interface Props {
    status: 'default' | 'success' | 'failed';
    label: string;
  }

  const props = withDefaults(defineProps<Props>(), {
    status: 'default',
  });

  const statusClass = computed(() => {
    switch (props.status) {
      case 'success':
        return 'status-success';
      case 'failed':
        return 'status-failed';
      default:
        return 'status-default';
    }
  });
</script>

<style scoped lang="less">
  .epsilon-node {
    display: flex;
    align-items: center;
    width: 180px;
    height: 40px;
    overflow: hidden;
    background-color: var(--color-bg-1);
    border: 1px solid var(--color-neutral-4);
    border-radius: var(--border-radius-medium);
  }

  .x6-node-selected .epsilon-node {
    border-color: #1890ff;
    box-shadow: 0 0 0 4px #d4e8fe;

    &.status-success {
      border-color: #52c41a;
      box-shadow: 0 0 0 4px #ccecc0;
    }

    &.status-failed {
      border-color: #ff4d4f;
      box-shadow: 0 0 0 4px #fedcdc;
    }
  }

  .node-left {
    width: 4px;
    height: 40px;
    background: rgb(var(--arcoblue-6));

    &.status-success {
      background-color: rgb(var(--green-6));
    }

    &.status-failed {
      background-color: rgb(var(--red-6));
    }
  }

  .label {
    width: 90px;
    margin: 0 8px;
  }

  .node-status {
    margin-right: 8px;
    margin-left: auto;
  }
</style>

<style lang="less">
  .x6-edge:hover path:nth-child(2) {
    stroke: #1890ff;
    stroke-width: 1px;
  }

  .x6-edge-selected path:nth-child(2) {
    stroke: #1890ff;
    stroke-width: 1.5px !important;
  }
</style>
