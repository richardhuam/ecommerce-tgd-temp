export interface INavMenuSubItems {
  name: string;
  index?: boolean;
  path: string;
}

export interface INavMenuOption {
  title: string;
  path?: string;
  subItems?: INavMenuSubItems[];
}
