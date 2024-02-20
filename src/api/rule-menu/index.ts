import axios from 'axios';

export interface RuleMenuVo {
  id: number;
  projectId: number;
  menuName: string;
  menuType: string;
  chainName?: string;
  parentId?: number;
  children?: RuleMenuVo[];
}

/**
 * Get the rule menu tree
 * @param projectId
 */
export function selectRuleMenuTree(projectId: number) {
  return axios.get<RuleMenuVo[]>('/rule/menu/tree', {
    params: { projectId },
  });
}
