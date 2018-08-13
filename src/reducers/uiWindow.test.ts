import * as uiWindowActions from '../actions/uiWindow';

import uiWindow, { UIWindowState } from './uiWindow';

const initialState: UIWindowState = {
    uiWindows: [
        {
            content: {
                position: { x: 5, y: 10 },
            },
            id: '5678',
            type: uiWindowActions.UIWindowTypes.COLOR_PICKER,
        },
        {
            content: {
                position: { x: 15, y: 20 },
            },
            id: '0987',
            type: uiWindowActions.UIWindowTypes.COLOR_PICKER,
        },
    ],
};

describe('uiWindow reducer', () => {
    describe('when we dispatch an openColorPicker action', () => {
        it('adds a window to its state', () => {
            const action = uiWindowActions.openColorPicker({
                color: '#FFFFFF',
                id: '1234',
                position: { x: 10, y: 10 },
            });

            expect(uiWindow(initialState, action)).toMatchSnapshot();
        });
    });

    describe('when we dispatch an closeUIWindow action', () => {
        it('removes a window from its state', () => {
            const action = uiWindowActions.closeUIWindow('5678');

            expect(uiWindow(initialState, action)).toMatchSnapshot();
        });
    });

    describe('when we dispatch an error action', () => {
        it('does not change its state', () => {
            const action = uiWindowActions.closeUIWindow('5678');
            action['error'] = true; // tslint:disable-line

            expect(uiWindow(initialState, action)).toMatchSnapshot();
        });
    });

    describe('when we dispatch an unrelated action', () => {
        it('does not change its state', () => {
            const action = {
                type: 'fred',
            };

            expect(uiWindow(initialState, action)).toMatchSnapshot();
        });
    });
});
