<template>
  <div class="rule-design">
    <div v-show="showComponent" class="component-panel">
      ComponentPanel11111
    </div>
    <div class="graph-container">
      <div ref="graphRef" class="graphRef" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { RuleMenu } from '@/api/rule-menu';
  import { Graph } from '@antv/x6';
  import { onMounted, ref } from 'vue';

  interface Props {
    ruleMenu: RuleMenu;
    showComponent?: boolean;
  }

  withDefaults(defineProps<Props>(), {
    showComponent: true,
  });

  const graphRef = ref(null);
  let graph;

  const data = {
    nodes: [
      {
        id: 'node1',
        shape: 'rect',
        x: 40,
        y: 40,
        width: 100,
        height: 40,
        label: 'hello',
        attrs: {
          // body 是选择器名称，选中的是 rect 元素
          body: {
            stroke: '#8f8f8f',
            strokeWidth: 1,
            fill: '#fff',
            rx: 6,
            ry: 6,
          },
        },
      },
      {
        id: 'node2',
        shape: 'rect',
        x: 160,
        y: 180,
        width: 100,
        height: 40,
        label: 'world',
        attrs: {
          body: {
            stroke: '#8f8f8f',
            strokeWidth: 1,
            fill: '#fff',
            rx: 6,
            ry: 6,
          },
        },
      },
    ],
    edges: [
      {
        shape: 'edge',
        source: 'node1',
        target: 'node2',
        label: 'x6',
        attrs: {
          // line 是选择器名称，选中的边的 path 元素
          line: {
            stroke: '#8f8f8f',
            strokeWidth: 1,
          },
        },
      },
    ],
  };

  const graphInit = () => {
    graph = new Graph({
      container: graphRef.value,
      width: graphRef.value.clientWidth,
      height: graphRef.value.clientHeight,
      background: {
        color: 'var(--color-neutral-2)',
      },
    });

    graph.fromJSON(data); // 渲染元素
    graph.centerContent(); // 居中显示
  };

  onMounted(() => {
    console.log('aaa');
    graphInit();
  });
</script>

<style scoped lang="less">
  .rule-design {
    display: flex;
    gap: 4px;
    padding: 8px 0;
  }

  .component-panel {
    height: calc(100vh - 110px);
    background: var(--color-neutral-3);
  }

  .graph-container {
    width: 100%;
    height: calc(100vh - 110px);
    overflow: hidden auto;

    .graphRef {
      width: 100%;
      height: 100%;
    }
  }
</style>
