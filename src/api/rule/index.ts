import axios from 'axios';

interface EpsilonNode {
  nodeId: string;
  ruleId: number;
  shape: string;
  label: string;
  positionX: number;
  positionY: number;
  epsilonScript?: string;
}

interface EpsilonEdge {
  edgeId: string;
  ruleId: number;
  sourceId: string;
  targetId: string;
}

interface EpsilonGraph {
  ruleId: number;
  nodes: EpsilonNode[];
  edges: EpsilonEdge[];
}

function saveRuleGraph(epsilonGraph: EpsilonGraph) {
  return axios.post('/epsilon/rule/updateGraph', epsilonGraph);
}

function selectRuleGraph(ruleId: number) {
  return axios.get<EpsilonGraph>('/epsilon/rule/selectGraph', {
    params: { ruleId },
  });
}

export {
  EpsilonNode,
  EpsilonEdge,
  EpsilonGraph,
  saveRuleGraph,
  selectRuleGraph,
};
