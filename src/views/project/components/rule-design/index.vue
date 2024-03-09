<template>
  <div class="rule-design">
    <div v-show="showStencil" class="stencil-container">
      <div ref="stencilRef" class="app-stencil" />
    </div>
    <div class="graph-container">
      <div ref="graphRef" />
      <NodePanel v-if="selectedNode" :selected-node="selectedNode" />
      <RuleDesignTool
        :graph="graph"
        @save="handleSave"
        @validate="handleValidate"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { RuleMenu } from '@/api/rule-menu';
  import { Graph } from '@antv/x6';
  import { onMounted, ref } from 'vue';
  import { Stencil } from '@antv/x6-plugin-stencil';
  import { Selection } from '@antv/x6-plugin-selection';
  import { getPortsByType, NodeType, registerNode } from '@/utils/node';
  import { Keyboard } from '@antv/x6-plugin-keyboard';
  import {
    EpsilonGraph,
    saveRuleGraph,
    selectRuleGraph,
    validateGraph,
  } from '@/api/rule';
  import { Message } from '@arco-design/web-vue';
  import { generateUUID } from '@/utils/common';
  import NodePanel from '../node-panel/index.vue';
  import RuleDesignTool from '../rule-design-tool/index.vue';

  interface Props {
    ruleMenu: RuleMenu;
    showStencil?: boolean;
  }

  const props = withDefaults(defineProps<Props>(), {
    showStencil: true,
  });

  const stencilRef = ref<HTMLElement | null>(null);
  const graphRef = ref<HTMLElement | null>(null);

  const selectedNode = ref();

  let graph: Graph;
  const graphInit = () => {
    graph = new Graph({
      container: graphRef.value!,
      grid: true,
      background: {
        color: '#f5f5f5',
      },
      autoResize: true,
      panning: true,
      mousewheel: true,
      connecting: {
        snap: true,
        allowBlank: false,
        allowLoop: false,
        allowNode: false,
        allowMulti: false,
        connector: 'smooth',
        createEdge() {
          return graph.createEdge({
            id: generateUUID(),
            attrs: {
              line: {
                stroke: 'var(--color-neutral-6)',
                strokeWidth: 1,
                targetMarker: {
                  name: 'classic',
                  size: 8,
                },
                zIndex: -1,
              },
            },
          });
        },
        validateConnection({ sourceCell, sourceMagnet, targetMagnet }) {
          // 基本的端口校验：确保连接是从输出端口到输入端口
          if (
            !(
              sourceMagnet?.getAttribute('port-group') === 'out' &&
              targetMagnet?.getAttribute('port-group') === 'in'
            )
          ) {
            return false;
          }

          // 非 SWITCH_NODE 节点只允许有一条出口
          const edges = graph
            .getEdges()
            .filter((edge) => edge.getSourceCell()?.id === sourceCell?.id);

          if (sourceCell?.shape !== NodeType.SWITCHNODE && edges.length > 1) {
            return false;
          }

          // 如果以上校验都通过，则允许连接
          return true;
        },
      },
    });
    graph.use(
      new Selection({
        enabled: true,
        multiple: false,
      }),
    );
    graph.use(
      new Keyboard({
        enabled: true,
      }),
    );
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
      getDragNode: (node) => {
        return graph.createNode({
          id: generateUUID(),
          shape: node.shape,
        });
      },
      getDropNode: (node) => {
        return node.clone({ keepId: true });
      },
    });

    stencilRef.value?.appendChild(stencil.container);

    const commonAttrs = {
      body: {
        fill: '#fff',
        stroke: '#8f8f8f',
        strokeWidth: 1,
      },
    };

    const n0 = graph.createNode({
      shape: 'path',
      width: 40,
      height: 40,
      path: 'M24.85,10.126c2.018-4.783,6.628-8.125,11.99-8.125c7.223,0,12.425,6.179,13.079,13.543c0,0,0.353,1.828-0.424,5.119c-1.058,4.482-3.545,8.464-6.898,11.503L24.85,48L7.402,32.165c-3.353-3.038-5.84-7.021-6.898-11.503c-0.777-3.291-0.424-5.119-0.424-5.119C0.734,8.179,5.936,2,13.159,2C18.522,2,22.832,5.343,24.85,10.126z',
      attrs: commonAttrs,
      label: 'path',
    });

    const startNode = graph.createNode({
      shape: 'start-node',
    });

    const endNode = graph.createNode({
      shape: 'end-node',
    });

    const switchNode = graph.createNode({
      shape: 'switch-node',
    });

    const calculateNode = graph.createNode({
      shape: 'calculate-node',
    });

    stencil.load([startNode, endNode, switchNode, calculateNode], 'basic');
    stencil.load([n0], 'other');
  };

  const registerEvent = () => {
    // 新增 node 时动态添加 port
    graph.on('node:added', ({ node }) => {
      node.addPorts(getPortsByType(node.shape as NodeType, node.id));
    });
    // 鼠标移入后显示 port
    graph.on('node:mouseenter', ({ node }) => {
      const ports = node.getPorts();
      ports.forEach((port) => {
        node.portProp(port.id!, 'attrs/circle', {
          fill: '#fff',
          stroke: '#85A5FF',
        });
      });
    });
    graph.on('node:mouseleave', ({ node }) => {
      const ports = node.getPorts();
      ports.forEach((port) => {
        node.portProp(port.id!, 'attrs/circle', {
          fill: 'transparent',
          stroke: 'transparent',
        });
      });
    });
    graph.on('node:click', ({ node }) => {
      selectedNode.value = node;
    });
    graph.on('blank:click', () => {
      selectedNode.value = undefined;
    });
    // 绑定Del键删除节点或边
    graph.bindKey(['del'], () => {
      const cells = graph.getSelectedCells();
      if (cells.length) {
        graph.removeCells(cells);
      }
    });
  };

  const ruleChainInit = async () => {
    if (!props.ruleMenu.ruleId) {
      return;
    }

    // 获取规则链信息
    const response = await selectRuleGraph(props.ruleMenu.ruleId);
    const epsilonGraph = response.data;
    const nodes = epsilonGraph.nodes.map((node) => {
      return {
        id: node.nodeId,
        shape: node.shape,
        position: {
          x: node.positionX,
          y: node.positionY,
        },
        data: {
          label: node.label,
          status: 'default',
          script: node.epsilonScript,
        },
      };
    });
    graph.addNodes(nodes);

    const edges = epsilonGraph.edges.map((edge) => {
      return {
        id: edge.edgeId,
        source: { cell: edge.sourceId, port: `${edge.sourceId}-out` },
        target: { cell: edge.targetId, port: `${edge.targetId}-in` },
        attrs: {
          line: {
            stroke: 'var(--color-neutral-6)',
            strokeWidth: 1,
            targetMarker: {
              name: 'classic',
              size: 8,
            },
            zIndex: -1,
          },
        },
      };
    });
    graph.addEdges(edges);
  };

  const getEpsilonGraph = (): EpsilonGraph => {
    const nodes = graph.getNodes().map((node) => {
      const position = node.getPosition();
      return {
        nodeId: node.id,
        ruleId: props.ruleMenu.ruleId,
        shape: node.shape,
        label: node.getData().label,
        positionX: position.x,
        positionY: position.y,
        epsilonScript: node.getData().script,
      };
    });
    const edges = graph.getEdges().map((edge) => {
      return {
        edgeId: edge.id,
        ruleId: props.ruleMenu.ruleId,
        sourceId: edge.getSourceCellId(),
        targetId: edge.getTargetCellId(),
      };
    });
    return {
      ruleId: props.ruleMenu.ruleId,
      nodes,
      edges,
    };
  };

  const handleSave = () => {
    const epsilonGraph = getEpsilonGraph();
    saveRuleGraph(epsilonGraph).then(() => {
      Message.success('保存成功！');
    });
  };

  const handleValidate = () => {
    const epsilonGraph = getEpsilonGraph();
    validateGraph(epsilonGraph).then(() => {
      Message.success('校验成功！');
    });
  };

  onMounted(() => {
    // 注册自定义节点
    registerNode();
    // 初始化画布
    graphInit();
    // 注册事件
    registerEvent();
    // 初始化 stencil
    stencilInit();
    // 初始化规则图
    ruleChainInit();
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
    position: relative;
    width: 100%;
    height: calc(100vh - 110px);
    overflow: hidden;
  }

  .app-stencil {
    position: relative;
    width: 200px;
    border: 1px solid #f0f0f0;
  }
</style>
