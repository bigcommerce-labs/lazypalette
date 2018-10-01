import { Action } from '../actions/action';
import { SideMenuActionTypes } from '../actions/sideMenu';

export const initialState = {
    collapsed: undefined,
};

export interface SideMenuState {
    collapsed?: boolean;
}

function sideMenu(state: SideMenuState = initialState, action: Action): SideMenuState {
    if (action.error) {
        return state;
    }

    switch (action.type) {
        case SideMenuActionTypes.COLLAPSE_SIDE_MENU:
            return { ...state, collapsed: action.payload.collapsed };
        default:
            return state;
    }
}

export default sideMenu;
