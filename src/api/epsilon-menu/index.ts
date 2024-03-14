import axios from 'axios';

export interface EpsilonMenu {
  id: number;
  projectId: number;
  menuName: string;
  menuType: string;
  associateId: number;
  parentId?: number;
  children?: EpsilonMenu[];
}

export const MenuCategory = {
  RuleMenu: '1',
  ModelMenu: '2',
};

/**
 * Get the rule menu tree
 * @param projectId
 * @param menuCategory
 */
export function selectEpsilonMenuTree(projectId: number, menuCategory: string) {
  return axios.get<EpsilonMenu[]>('/epsilon/menu/tree', {
    params: { projectId, menuCategory },
  });
}
