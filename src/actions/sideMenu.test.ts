import { SideMenuActionTypes } from './sideMenu';
import * as sideMenuActions from './sideMenu';

describe('sideMenu actions', () => {
    describe('when we create a collapseSideMenu action', () => {
        it('creates the correct action', () => {
            const action = sideMenuActions.collapseSideMenu(true);

            expect(action).toEqual({
                payload: {
                    collapsed: true,
                },
                type: SideMenuActionTypes.COLLAPSE_SIDE_MENU,
            });
        });
    });

    describe('when we create a updateExpandableMenuPosition action', () => {
        it('creates the correct action', () => {
            const action = sideMenuActions.updateExpandableMenuPosition({x: 300, y: 300});

            expect(action).toEqual({
                payload: {
                    expandableMenuPosition: {x: 300, y: 300},
                },
                type: SideMenuActionTypes.UPDATE_EXPANDABLE_MENU_POSITION,
            });
        });
    });
});
