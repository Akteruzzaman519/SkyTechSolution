export class Menu {
	MenuId?: number;
	MenuName: string;
	MenuURL: string;
	ChildMenus: Menu[];
	roleRelatedModule: any;
	menuParentName: any;
	menuPermission: any;
	MenuPermission: string;

	constructor() {
		this.ChildMenus = [];
	}
}

export class SubMenu {
	SubMenuId: number;
	SubMenuName: string;
	SubMenuURL: string;
}
