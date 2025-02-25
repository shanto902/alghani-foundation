type TSubmenu = {
  label: string;
  link: string;
};
type TMenu = {
  label: string;
  link?: string;
  submenu?: TSubmenu[];
};

export type TSetting = {
  menu: TMenu[];
};
