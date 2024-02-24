<template>
  <div class="rule-design">
    <div v-show="showStencil" class="stencil-container">
      <div ref="stencilRef" class="app-stencil" />
    </div>
    <div class="graph-container">
      <div ref="graphRef" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { RuleMenu } from '@/api/rule-menu';
  import { Graph } from '@antv/x6';
  import { onMounted, ref } from 'vue';
  import { Stencil } from '@antv/x6-plugin-stencil';

  interface Props {
    ruleMenu: RuleMenu;
    showStencil?: boolean;
  }
  withDefaults(defineProps<Props>(), {
    showStencil: true,
  });

  const stencilRef = ref<HTMLElement | null>(null);
  const graphRef = ref<HTMLElement | null>(null);

  let graph: Graph;

  const graphInit = () => {
    graph = new Graph({
      container: graphRef.value!,
      grid: true,
      background: {
        color: '#f5f5f5',
      },
      autoResize: true,
    });
  };

  const stencilInit = () => {
    const stencil = new Stencil({
      title: '全部展开/收起',
      target: graph,
      search(cell, keyword) {
        return cell.shape.indexOf(keyword) !== -1;
      },
      placeholder: '搜索',
      notFoundText: '未找到匹配项',
      collapsable: true,
      layoutOptions: {
        columns: 1,
        center: false,
        rowHeight: 50,
      },
      stencilGraphHeight: 0,
      groups: [
        {
          name: 'basic',
          title: '基本组件',
        },
        {
          name: 'other',
          title: '额外组件',
        },
      ],
    });

    stencilRef.value?.appendChild(stencil.container);

    const commonAttrs = {
      body: {
        fill: '#fff',
        stroke: '#8f8f8f',
        strokeWidth: 1,
      },
    };

    const n1 = graph.createNode({
      shape: 'rect',
      width: 180,
      height: 40,
      label: 'rect',
      attrs: commonAttrs,
    });

    const n2 = graph.createNode({
      shape: 'circle',
      width: 40,
      height: 40,
      label: 'circle',
      attrs: commonAttrs,
    });

    const n3 = graph.createNode({
      shape: 'ellipse',
      width: 80,
      height: 40,
      label: 'ellipse',
      attrs: commonAttrs,
    });

    const n4 = graph.createNode({
      shape: 'path',
      width: 40,
      height: 40,
      path: 'M24.85,10.126c2.018-4.783,6.628-8.125,11.99-8.125c7.223,0,12.425,6.179,13.079,13.543c0,0,0.353,1.828-0.424,5.119c-1.058,4.482-3.545,8.464-6.898,11.503L24.85,48L7.402,32.165c-3.353-3.038-5.84-7.021-6.898-11.503c-0.777-3.291-0.424-5.119-0.424-5.119C0.734,8.179,5.936,2,13.159,2C18.522,2,22.832,5.343,24.85,10.126z',
      attrs: commonAttrs,
      label: 'path',
    });

    stencil.load([n1, n2], 'basic');
    stencil.load([n3, n4], 'other');
  };
  onMounted(() => {
    graphInit();
    stencilInit();
  });
</script>

<style scoped lang="less">
  .rule-design {
    display: flex;
    gap: 4px;
    padding: 8px 0;
  }

  .stencil-container {
    display: flex;
    height: calc(100vh - 110px);
    background: var(--color-neutral-3);
  }

  .graph-container {
    width: 100%;
    height: calc(100vh - 110px);
    background: #8c78e6;
  }

  .app-stencil {
    position: relative;
    width: 200px;
    border: 1px solid #f0f0f0;
  }
</style>
