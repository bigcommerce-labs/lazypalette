import { Dispatch } from 'redux';

import { State } from '../reducers/reducers';

import { Action } from './action';
import { ToastTimeout } from './constants';

export enum NotificationActionTypes {
    OPEN_NOTIFICATION = 'OPEN_NOTIFICATION',
    CLOSE_NOTIFICATION = 'CLOSE_NOTIFICATION',
}

export interface OpenNotificationAction extends Action  {
    payload: NotificationsProps;
    type: NotificationActionTypes.OPEN_NOTIFICATION;
}

export interface CloseNotificationAction extends Action  {
    type: NotificationActionTypes.CLOSE_NOTIFICATION;
}

export interface NotificationsProps {
    autoDismiss: boolean;
    message: string;
    type: string;
}

export function openNotification(content: NotificationsProps): OpenNotificationAction {
    return {
        payload: {
            autoDismiss: content.autoDismiss,
            message: content.message,
            type: content.type,
        },
        type: NotificationActionTypes.OPEN_NOTIFICATION,
    };
}

export function closeNotification(): CloseNotificationAction {
    return {
        type: NotificationActionTypes.CLOSE_NOTIFICATION,
    };
}

export function createNotification(autoDismiss: boolean, message: string, type: string) {
    return (dispatch: Dispatch<State>) => {
        dispatch(openNotification({ autoDismiss, message, type }));

        if (autoDismiss) {
            setTimeout(() => {
                dispatch(closeNotification());
            }, ToastTimeout.Duration);
        }
    };
}
