import { ToastMessages, ToastType } from './constants';
import * as notifications from './notifications';

describe('notifications actions', () => {
    describe('OPEN_NOTIFICATION', () => {
        it('should macth the correct action', () => {
            const action = notifications.openNotification({
                autoDismiss: true,
                message: ToastMessages.Publish,
                type: ToastType.Success,
            });

            expect(action).toMatchSnapshot();
        });
    });

    describe('CLOSE_NOTIFICATION', () => {
        it('should macth the correct action', () => {
            const action = notifications.closeNotification();

            expect(action).toMatchSnapshot();
        });
    });
});
