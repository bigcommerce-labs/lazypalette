export enum SideMenuActionTypes {
    COLLAPSE_SIDE_MENU = 'COLLAPSE_SIDE_MENU',
    UPDATE_EXPANDABLE_MENU_POSITION = 'UPDATE_EXPANDABLE_MENU_POSITION',
}

export interface Position {
    x: number;
    y: number;
}

export interface CollapseSideMenuAction {
    payload: {
        collapsed: boolean,
    };
    type: SideMenuActionTypes.COLLAPSE_SIDE_MENU;
}
export interface UpdateExpandableMenuPositionAction {
    payload: {
        expandableMenuPosition: Position,
    };
    type: SideMenuActionTypes.UPDATE_EXPANDABLE_MENU_POSITION;
}

export function collapseSideMenu(collapsed: boolean): CollapseSideMenuAction {
    return {
        payload: { collapsed },
        type: SideMenuActionTypes.COLLAPSE_SIDE_MENU,
    };
}

export function updateExpandableMenuPosition(expandableMenuPosition: Position): UpdateExpandableMenuPositionAction {
    return {
        payload: { expandableMenuPosition },
        type: SideMenuActionTypes.UPDATE_EXPANDABLE_MENU_POSITION,
    };
}
