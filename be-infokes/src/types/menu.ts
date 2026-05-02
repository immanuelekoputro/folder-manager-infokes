export interface Menu {
  id: number;
  name: string;
  parentId: number | null;
}

export interface ResponseMenuList {
  code: number;
  message: string;
  data: Menu[];
}
