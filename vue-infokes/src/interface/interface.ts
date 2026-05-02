export interface MenuInterface {
  menu: MenuRevampInterface[];
}

export interface MenuRevampInterface {
  id: number;
  name: string;
  icon: string;
  parentId: number | null;
  isExpanded: boolean;
  isFolder: boolean;
  mimeType: string;
}
