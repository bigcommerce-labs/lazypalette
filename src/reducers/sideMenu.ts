import { Action } from '../actions/action';
import { Position, SideMenuActionTypes } from '../actions/sideMenu';

export const initialState = {
    collapsed: undefined,
    expandableMenuPosition: { x: 248, y: 104 },
};

export interface SideMenuState {
    collapsed?: boolean;
    expandableMenuPosition: Position;
}

function sideMenu(state: SideMenuState = initialState, action: Action): SideMenuState {
    if (action.error) {
        return state;
    }

    switch (action.type) {
        case SideMenuActionTypes.COLLAPSE_SIDE_MENU:
            return { ...state, collapsed: action.payload.collapsed };
        case SideMenuActionTypes.UPDATE_EXPANDABLE_MENU_POSITION:
            return { ...state, expandableMenuPosition: action.payload.expandableMenuPosition };
        default:
            return state;
    }
}

export default sideMenu;
