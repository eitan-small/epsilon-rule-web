import axios from 'axios';

export interface InterfaceMenu {
  id: number;
  parentId: number;
  name: string;
  type: number;
  path?: string;
  requestMethod?: string;
  responsiblePersonName?: string;
  appId: number;
  appName: string;
  appNameCn: string;
  order: number;
  children?: InterfaceMenu[];
}

export function queryInterfaceMenu(appId?: number) {
  return axios.get<InterfaceMenu[]>('/system/interface/menuList', {
    params: { appId },
  });
}

export function ordering(
  dragKey: number,
  dropKey: number,
  dropPosition: number,
) {
  return axios.put('/system/interface/ordering', {
    dragKey,
    dropKey,
    dropPosition,
  });
}
