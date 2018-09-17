import * as merchant from './merchant';

import {StoreDefaultData} from './merchant';

describe ('merchant actions', () => {
    describe('SET_STORE_DEFAULTS', () => {
        describe('when we set the store default', () => {
            it('responds with the expected action', () => {

                const payload: StoreDefaultData = {
                    isCurrent: true,
                    isDownForMaintenance: false,
                    isPrelaunchStore: false,
                    previewCode: 'dodge',
                    storeHash: 'meow',
                    timezoneName: 'PST',
                    timezoneOffset: 7,
                };

                const expectedAction = {
                    error: false,
                    payload,
                    type: 'SET_STORE_DEFAULTS',
                };

                expect(merchant.setStoreDefault(payload)).toEqual(expectedAction);
            });
        });
    });
});
