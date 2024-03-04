import axios from 'axios';

export interface RuleMenu {
  id: number;
  projectId: number;
  menuName: string;
  menuType: string;
  ruleId: number;
  parentId?: number;
  children?: RuleMenu[];
}

/**
 * Get the rule menu tree
 * @param projectId
 */
export function selectRuleMenuTree(projectId: number) {
  return axios.get<RuleMenu[]>('/rule/menu/tree', {
    params: { projectId },
  });
}
