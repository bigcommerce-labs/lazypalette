import { SessionHeartbeatResponse } from '../services/sessionHeartbeat';

export enum SessionHeartbeatActionTypes {
    SESSION_HEARTBEAT_RESPONSE = 'SESSION_HEARTBEAT_RESPONSE',
}

export interface SessionHeartbeatResponseAction {
    error: boolean;
    payload: SessionHeartbeatResponse | Error;
    type: SessionHeartbeatActionTypes.SESSION_HEARTBEAT_RESPONSE;
}

export function sessionHeartbeatResponse(
    payload: SessionHeartbeatResponse,
    err: Error | null
): SessionHeartbeatResponseAction {
    if (err) {
        return {
            error: true,
            payload: err,
            type: SessionHeartbeatActionTypes.SESSION_HEARTBEAT_RESPONSE,
        };
    }

    return {
        error: false,
        payload,
        type: SessionHeartbeatActionTypes.SESSION_HEARTBEAT_RESPONSE,
    };
}
