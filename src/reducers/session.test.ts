import * as sessionActions from '../actions/sessionHeartbeat';

import session, { SessionState } from './session';

const initialState: SessionState = {
    isLoggedIn: true,
};

describe('session reducer', () => {
    describe('when we have a successful action', () => {
        it('does not modify state the user remains logged in', () => {
            const action = sessionActions.sessionHeartbeatResponse(
                { ok: true },
                null
            );

            expect(session(initialState, action)).toEqual({
                isLoggedIn: true,
            });
        });
    });

    describe('when we have an unsuccessful action', () => {
        describe('when we get back an error from the API', () => {
            it('logs the user out', () => {
                const action = sessionActions.sessionHeartbeatResponse(
                    { ok: false },
                    new Error('meow meow')
                );

                expect(session(initialState, action)).toEqual({
                    isLoggedIn: false,
                });
            });
        });

        describe('when we get back a response, but user is logged out', () => {
            it('logs the user out', () => {
                const action = sessionActions.sessionHeartbeatResponse(
                    { ok: false },
                    null
                );

                expect(session(initialState, action)).toEqual({
                    isLoggedIn: false,
                });
            });
        });
    });
});
