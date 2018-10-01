export enum SideMenuActionTypes {
    COLLAPSE_SIDE_MENU = 'COLLAPSE_SIDE_MENU',
}

export interface CollapseSideMenuAction {
    payload: {
        collapsed: boolean,
    };
    type: SideMenuActionTypes.COLLAPSE_SIDE_MENU;
}

export function collapseSideMenu(collapsed: boolean): CollapseSideMenuAction {
    return {
        payload: { collapsed },
        type: SideMenuActionTypes.COLLAPSE_SIDE_MENU,
    };
}
