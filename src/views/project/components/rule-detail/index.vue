<template>
  <div id="detail-container">
    <a-tabs default-active-key="2">
      <a-tab-pane key="1" title="决策配置">
        <RuleDesign :rule-menu="ruleMenu" />
      </a-tab-pane>
      <a-tab-pane key="2" title="基本信息"> {{ ruleMenu }} </a-tab-pane>
      <a-tab-pane key="3" title="调用示例"> Content of Tab Panel 3</a-tab-pane>
      <a-tab-pane key="4" title="执行日志"> Content of Tab Panel 4</a-tab-pane>
      <a-tab-pane key="5" title="指标统计"> Content of Tab Panel 5</a-tab-pane>
    </a-tabs>
  </div>
</template>

<script setup lang="ts">
  import { RuleMenu } from '@/api/rule-menu';
  import RuleDesign from '../rule-design/index.vue';

  interface Props {
    ruleMenu: RuleMenu;
  }

  withDefaults(defineProps<Props>(), {});
</script>

<style scoped lang="less">
  #detail-container {
    padding: 8px 8px 0;

    :deep(.arco-tabs-nav) {
      padding: 0;
      background: var(--color-bg-1);
      border-bottom: 1px solid var(--color-neutral-3);
    }

    :deep(.arco-tabs-content) {
      padding: 0;
      border: none;
    }

    :deep(.arco-tabs-nav-tab-list) {
      display: flex;
      gap: 8px;
    }

    :deep(.arco-tabs-tab) {
      margin: 0;
      padding: 8px;
      border: none;
    }

    :deep(.arco-tabs-tab-active) {
      border: none;
    }
  }
</style>
