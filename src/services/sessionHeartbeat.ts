import Axios, { AxiosResponse } from 'axios';
import jsonp from 'jsonp';
import throttle from 'lodash/throttle';

/*
 * Raw response format from login service heartbeat endpoint. This interface is also re-used for the cp session
 * heartbeat call so we can have a consistent action.
 */
export interface SessionHeartbeatResponse {
    ok: boolean;
}

/*
 * Call the heartbeat endpoint in the bc app. Since store design is not run inside the control panel,
 * we will need to explicitly keep the users cp session active by polling the heartbeat endpoint.
 */
const heartbeatRoute = (oauthBaseUrl: string, lastActive: number) =>
    `${oauthBaseUrl}/session/heartbeat?last_active=${lastActive}`;

// https://github.com/bigcommerce/A-A/blob/master/app/controllers/sessions_controller.rb#L21
export function loginHeartbeat(
    oauthBaseUrl: string,
    callback: (data: SessionHeartbeatResponse, err: Error | null) => void
) {
    const lastActive = (new Date()).getTime();
    const route = heartbeatRoute(oauthBaseUrl, lastActive);
    const jsonpOpts = {};

    return jsonp(route, jsonpOpts, (loginError: Error, data: SessionHeartbeatResponse) => {
        // If we get any errors from the login service, we will treat the user as logged out.
        // TODO - Look into adding retry logic with back-off so we arent so aggressive in logging the user out in the
        // case of a brief incident.
        if (loginError) {
            callback(
                { ok: false },
                new Error('LoginSvc - Logged Out')
            );

            return;
        }

        // Make sure the response from A&A says the user is still logged in
        const err = data.ok ? null : new Error('LoginSvc - Logged Out');

        callback(
            { ok: data.ok },
            err
        );
    });
}

/*
 * Raw response format from BC App CP heartbeat endpoint.
 */
interface CPSessionHeartbeatResponse {
    status: string;
}

/*
 * Call the heartbeat endpoint in the login service. Since store design is not run inside the control panel,
 * we will need to explicitly keep the users login session active by polling the heartbeat endpoint.
 */
const cpHeartbeatRoute = '/admin/remote.php?w=heartbeat';

export function cpHeartbeat(callback: (data: SessionHeartbeatResponse, err: Error | null) => void) {
    Axios.get(cpHeartbeatRoute)
        .then(({ data: { status } }: AxiosResponse<CPSessionHeartbeatResponse>) => {
            callback(
                { ok: status === 'ALIVE' },
                null
            );
        })
        .catch(() => {
            const err = new Error('CP - Logged Out');

            callback(
                { ok: false },
                err
            );
        });
}

/*
 * Throttle the requests to the login service heartbeat and the cp session heartbeat based on a configured interval.
 */
export const HEARTBEAT_INTERVAL = 10000; // milliseconds

export const throttledHeartbeat = (
    oauthBaseUrl: string,
    callback: (data: SessionHeartbeatResponse, err: Error | null) => void
) =>
    throttle(() => {
        loginHeartbeat(oauthBaseUrl, (loginResponse: SessionHeartbeatResponse, loginErr: Error) => {
            if (loginErr || !loginResponse.ok) {
                return callback(loginResponse, loginErr);
            } else {
                cpHeartbeat((cpResponse, cpErr) => {
                    return callback(cpResponse, cpErr);
                });
            }
        });
    }, HEARTBEAT_INTERVAL, { leading: true });
