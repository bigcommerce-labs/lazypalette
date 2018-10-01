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
});
