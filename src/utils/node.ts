import { register } from '@antv/x6-vue-shape';
import { PortManager } from '@antv/x6/src/model/port';

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

const getPortsByType = (type: NodeType) => {
  const ports: Partial<PortManager.Metadata> | PortManager.PortMetadata[] = {};
  ports.groups = groups;

  switch (type) {
    case NodeType.STARTNODE:
      ports.items = [
        {
          group: 'out',
        },
      ];
      break;
    case NodeType.ENDNODE:
      ports.items = [
        {
          group: 'in',
        },
      ];
      break;
    case NodeType.SWITCHNODE:
      ports.items = [
        {
          group: 'in',
        },
        {
          group: 'out',
        },
      ];
      break;
    case NodeType.CALCULATENODE:
      ports.items = [
        {
          group: 'in',
        },
        {
          group: 'out',
        },
      ];
      break;
    default:
      break;
  }

  return ports;
};

const registerNode = () => {
  register({
    shape: NodeType.STARTNODE,
    component: StartNode,
    ports: getPortsByType(NodeType.STARTNODE),
    data: {
      label: '开始节点',
      status: 'success',
    },
  });
  register({
    shape: NodeType.ENDNODE,
    component: EndNode,
    ports: getPortsByType(NodeType.ENDNODE),
    data: {
      label: '结束节点',
      status: 'failed',
    },
  });
  register({
    shape: NodeType.SWITCHNODE,
    component: SwitchNode,
    ports: getPortsByType(NodeType.SWITCHNODE),
    data: {
      label: '条件分支节点',
      status: 'default',
    },
  });
  register({
    shape: NodeType.CALCULATENODE,
    component: CalculateNode,
    ports: getPortsByType(NodeType.CALCULATENODE),
    data: {
      label: '赋值运算节点',
      status: 'default',
    },
  });
};

export { NodeType, registerNode };
