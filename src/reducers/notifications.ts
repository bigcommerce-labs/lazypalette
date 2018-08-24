import { Action } from '../actions/action';
import { NotificationActionTypes } from '../actions/notifications';

export interface NotificationState {
    autoDismiss: boolean;
    message: string;
    type: string;
}

const initialState: NotificationState = {
    autoDismiss: true,
    message: '',
    type: '',
};

function notifications(state: NotificationState = initialState, action: Action): NotificationState {
    if (action.error) {
        return state;
    }

    switch (action.type) {
        case NotificationActionTypes.OPEN_NOTIFICATION:
            return { ...state,
                autoDismiss: action.payload.autoDismiss,
                message: action.payload.message,
                type: action.payload.type,
            };
        case NotificationActionTypes.CLOSE_NOTIFICATION:
            return { ...state,
                autoDismiss: true,
                message: '',
                type: '',
            };
        default:
            return state;
    }
}

export default notifications;
