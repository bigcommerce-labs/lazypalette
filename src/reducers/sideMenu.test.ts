import * as sideMenuActions from '../actions/sideMenu';

import sideMenu, {SideMenuState} from './sideMenu';

describe('sideMenu reducer', () => {
    describe('when we dispatch a collapseSideMenu action', () => {
        it('updates the state correctly', () => {
            const initialState: SideMenuState = { collapsed: false, expandableMenuPosition: { x: 248, y: 104 } };
            const expectedState: SideMenuState = { collapsed: true, expandableMenuPosition: { x: 248, y: 104 } };
            const action = sideMenuActions.collapseSideMenu(true);

            expect(sideMenu(initialState, action)).toEqual(expectedState);
        });
    });

    describe('when we dispatch updateExpandableMenu action', () => {
        it('updates the expandableMenuPosition attribute', () => {
            const initialState: SideMenuState = { collapsed: false, expandableMenuPosition: { x: 248, y: 104 } };
            const expectedState: SideMenuState = { collapsed: false, expandableMenuPosition: { x: 300, y: 300 } };

            const action = sideMenuActions.updateExpandableMenuPosition({ x: 300, y: 300 });

            expect(sideMenu(initialState, action)).toEqual(expectedState);
        });
    });
});
