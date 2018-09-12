import * as merchantActions from '../actions/merchant';

import merchant, { MerchantStoreState } from './merchant';

describe('Merchant reducer', () => {
    const initialState: MerchantStoreState = {
        isCurrent: false,
        isDownForMaintenance: false,
        isPrelaunchStore: false,
        previewCode: '',
        storeHash: '',
        timezoneName: '',
        timezoneOffset: 0,
    };

    const payload = {
        isCurrent: false,
        isDownForMaintenance: false,
        isPrelaunchStore: false,
        previewCode: 'k4k4t9q44d',
        storeHash: '1234567890',
        timezoneName: 'America/New_York',
        timezoneOffset: -6,
    };

    describe('when an error is received', () => {
        it('should not modify the state', () => {
            const errorPayload = new Error('Cat');
            const error = true;
            const action = merchantActions.setStoreDefault(errorPayload, error);

            expect(merchant(initialState, action)).toEqual(initialState);
        });
    });

    describe('when SET_STORE_DEFAULTS action is received', () => {
        it('should update the state', () => {
            const action = merchantActions.setStoreDefault(payload);
            const expectedState = { ...initialState, ...payload };

            expect(merchant(initialState, action)).toEqual(expectedState);
        });
    });

    describe('when action is not in MerchantActionTypes', () => {
        it('should not modify the state', () => {
            const error = false;
            const type = 'SOME_RANDOM_ACTION';
            const action = { error, payload, type }; // fake return from merchantActions

            expect(merchant(initialState, action)).toEqual(initialState);
        });
    });
});
