import * as sideMenuActions from '../actions/sideMenu';

import sideMenu from './sideMenu';

describe('sideMenu reducer', () => {
    describe('when we dispatch a collapseSideMenu action', () => {
        it('updates the state correctly', () => {
            const initialState = { collapsed: false };
            const expectedState = { collapsed: true };
            const action = sideMenuActions.collapseSideMenu(true);

            expect(sideMenu(initialState, action)).toEqual(expectedState);
        });
    });
});
