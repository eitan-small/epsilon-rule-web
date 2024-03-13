import axios from 'axios';
import { EpsilonMenu } from 'src/api/epsilon-menu';

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

interface EpsilonRule {
  ruleId: number;
  projectId: number;
  menuName: string;
  chainName: string;
  ruleDesc: string;
  enable: boolean;
  validated: boolean;
}

function selectRule(ruleId: number) {
  return axios.get<EpsilonRule>('/epsilon/rule/select', {
    params: { ruleId },
  });
}

function saveOrUpdate(rule: EpsilonRule) {
  return axios.post<EpsilonMenu>('/epsilon/rule/saveOrUpdate', rule);
}

function validateGraph(epsilonGraph: EpsilonGraph) {
  return axios.post('/epsilon/rule/validate', epsilonGraph);
}

export {
  EpsilonNode,
  EpsilonEdge,
  EpsilonGraph,
  saveRuleGraph,
  selectRuleGraph,
  EpsilonRule,
  selectRule,
  saveOrUpdate,
  validateGraph,
};
