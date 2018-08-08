import * as uiWindowActions from './uiWindow';

describe('uiWindow actions', () => {
    describe('when we create an openColorPicker action', () => {
        it('creates the correct action', () => {
            const action = uiWindowActions.openColorPicker({
                color: 'FFFFFF',
                id: '1234',
                onChange: () => (1),
                position: { x: 10, y: 15 },
            });

            expect(action).toMatchSnapshot();
        });
    });
    describe('when we create a closeUIWindow action', () => {
        it('creates the correct action', () => {
            const action = uiWindowActions.closeUIWindow('5678');

            expect(action).toMatchSnapshot();
        });
    });
});
