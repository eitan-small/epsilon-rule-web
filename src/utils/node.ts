import { register } from '@antv/x6-vue-shape';

import StartNode from '@/views/project/components/node/start-node/index.vue';
import EndNode from '@/views/project/components/node/end-node/index.vue';
import SwitchNode from '@/views/project/components/node/switch-node/index.vue';
import CalculateNode from '@/views/project/components/node/calculate-node/index.vue';

// 节点类型
// eslint-disable-next-line no-shadow
enum NodeType {
  STARTNODE = 'start-node',
  ENDNODE = 'end-node',
  SWITCHNODE = 'switch-node',
  CALCULATENODE = 'calculate-node',
}

const groups = {
  in: {
    position: 'left',
    attrs: {
      circle: {
        r: 4,
        magnet: true,
        stroke: 'transparent',
        strokeWidth: 1,
        fill: 'transparent',
      },
    },
  },

  out: {
    position: {
      name: 'right',
      args: {
        dx: 0,
      },
    },
    attrs: {
      circle: {
        r: 4,
        magnet: true,
        stroke: 'transparent',
        strokeWidth: 1,
        fill: 'transparent',
      },
    },
  },
};

/**
 * 根据节点类型获取 ports
 * @param type    节点类型
 * @param nodeId  节点 id
 */
const getPortsByType = (type: NodeType, nodeId: string) => {
  let ports = [];

  switch (type) {
    case NodeType.STARTNODE:
      ports = [
        {
          id: `${nodeId}-out`,
          group: 'out',
        },
      ];
      break;
    case NodeType.ENDNODE:
      ports = [
        {
          id: `${nodeId}-in`,
          group: 'in',
        },
      ];
      break;
    default:
      ports = [
        {
          id: `${nodeId}-in`,
          group: 'in',
        },
        {
          id: `${nodeId}-out`,
          group: 'out',
        },
      ];
      break;
  }

  return ports;
};

const registerNode = () => {
  register({
    shape: NodeType.STARTNODE,
    component: StartNode,
    size: {
      width: 180,
      height: 40,
    },
    ports: {
      groups,
    },
    data: {
      label: '开始节点',
      status: 'default',
    },
  });
  register({
    shape: NodeType.ENDNODE,
    component: EndNode,
    size: {
      width: 180,
      height: 40,
    },
    ports: {
      groups,
    },
    data: {
      label: '结束节点',
      status: 'default',
    },
  });
  register({
    shape: NodeType.SWITCHNODE,
    component: SwitchNode,
    size: {
      width: 180,
      height: 40,
    },
    ports: {
      groups,
    },
    data: {
      label: '条件分支节点',
      status: 'default',
    },
  });
  register({
    shape: NodeType.CALCULATENODE,
    component: CalculateNode,
    size: {
      width: 180,
      height: 40,
    },
    ports: {
      groups,
    },
    data: {
      label: '赋值运算节点',
      status: 'default',
    },
  });
};

export { NodeType, groups, registerNode, getPortsByType };
