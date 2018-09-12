import { ToastMessages, ToastType } from '../actions/constants';
import * as notificationsActions from '../actions/notifications';

import notifications, { NotificationState } from './notifications';

describe('notifications reducer', () => {
    const initialState: NotificationState = {
        autoDismiss: true,
        message: '',
        type: '',
    };

    describe('when an error is received', () => {
        it('should not update the state', () => {
            const action = notificationsActions.openNotification({
                autoDismiss: false,
                message: 'some message',
                type: ToastType.Invalid,
            });
            action.error = true;

            expect(notifications(initialState, action)).toEqual(initialState);
        });
    });

    describe('when an openNotification action is received', () => {
        it('should add a notification to the state', () => {
            const action = notificationsActions.openNotification({
                autoDismiss: true,
                message: ToastMessages.Save,
                type: ToastType.Success,
            });

            expect(notifications(initialState, action)).toMatchSnapshot();
        });
    });

    describe('when a closeNotification action is received', () => {
        it('should remove the notification from the state', () => {
            const action = notificationsActions.closeNotification();

            expect(notifications(initialState, action)).toMatchSnapshot();
        });
    });

    describe('when an unknown action is received', () => {
        it('should not update the state', () => {
            const action = { type: 'confusedCat' };

            expect(notifications(initialState, action)).toEqual(initialState);
        });
    });
});
