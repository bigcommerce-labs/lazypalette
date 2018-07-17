import * as sessionHeartbeat from './sessionHeartbeat';

describe('sessionHeartbeat actions', () => {
    describe('SESSION_HEARTBEAT_RESPONSE', () => {
        describe('when we get a successful response', () => {
            it('responds with the expected action', () => {
                const expectedAction = {
                    error: false,
                    payload: { ok: true },
                    type: 'SESSION_HEARTBEAT_RESPONSE',
                };

                expect(sessionHeartbeat.sessionHeartbeatResponse(
                    { ok: true },
                    null
                )).toEqual(expectedAction);
            });
        });

        describe('when we get a unsuccessful response', () => {
            describe('when we get an API error', () => {
                it('responds with the expected action', () => {
                    const expectedAction = {
                        error: true,
                        payload: new Error('meow meow'),
                        type: 'SESSION_HEARTBEAT_RESPONSE',
                    };

                    expect(sessionHeartbeat.sessionHeartbeatResponse(
                        { ok: false },
                        new Error('meow meow')
                    )).toEqual(expectedAction);
                });
            });

            describe('when we get back a response, but the session is inactive', () => {
                it('responds with the expected action', () => {
                    const expectedAction = {
                        error: false,
                        payload: { ok: false },
                        type: 'SESSION_HEARTBEAT_RESPONSE',
                    };

                    expect(sessionHeartbeat.sessionHeartbeatResponse(
                        { ok: false },
                        null
                    )).toEqual(expectedAction);
                });
            });
        });
    });
});
