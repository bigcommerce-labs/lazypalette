import { SessionHeartbeatActionTypes, SessionHeartbeatResponseAction } from '../actions/sessionHeartbeat';
import { SessionHeartbeatResponse } from '../services/sessionHeartbeat';

export interface SessionState {
    isLoggedIn: boolean;
}

const initialState = {
    isLoggedIn: true,
};

const session = (
    state: SessionState = initialState,
    action: SessionHeartbeatResponseAction
): SessionState => {
    switch (action.type) {
        case SessionHeartbeatActionTypes.SESSION_HEARTBEAT_RESPONSE:
            if (action.error) {
                return { ...state, isLoggedIn: false };
            } else {
                const { ok } = action.payload as SessionHeartbeatResponse;

                return { ...state, isLoggedIn: ok };
            }
        default:
            return state;
    }
};

export default session;
