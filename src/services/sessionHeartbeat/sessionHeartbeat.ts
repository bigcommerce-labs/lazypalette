import Axios, { AxiosResponse } from 'axios';
import jsonp from 'jsonp';
import throttle from 'lodash/throttle';

import { HeartbeatInterval, Links, Messages } from './constants';

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
    `${oauthBaseUrl}${Links.Route}${lastActive}`;

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
                new Error(Messages.LogoutSvc)
            );

            return;
        }

        // Make sure the response from A&A says the user is still logged in
        const err = data.ok ? null : new Error(Messages.LogoutSvc);

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
export function cpHeartbeat(callback: (data: SessionHeartbeatResponse, err: Error | null) => void) {
    Axios.get(Links.CPRoute)
        .then(({ data: { status } }: AxiosResponse<CPSessionHeartbeatResponse>) => {
            callback(
                { ok: status === Messages.AliveStatus },
                null
            );
        })
        .catch(() => {
            const err = new Error(Messages.LogoutCP);

            callback(
                { ok: false },
                err
            );
        });
}

/*
 * Throttle the requests to the login service heartbeat and the cp session heartbeat based on a configured interval.
 */
export const throttledHeartbeat = throttle((
    oauthBaseUrl: string,
    callback: (data: SessionHeartbeatResponse, err: Error | null) => void
) => {
    loginHeartbeat(oauthBaseUrl, (loginResponse: SessionHeartbeatResponse, loginErr: Error) => {
        if (loginErr || !loginResponse.ok) {
            return callback(loginResponse, loginErr);
        } else {
            cpHeartbeat((cpResponse, cpErr) => {
                return callback(cpResponse, cpErr);
            });
        }
    });
}, HeartbeatInterval, { leading: true });
