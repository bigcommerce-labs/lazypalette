import { Dispatch } from 'redux';

import { State } from '../reducers/reducers';

export enum MerchantActionTypes {
    SET_STORE_DEFAULTS = 'SET_STORE_DEFAULTS',
}

export interface SetStoreDataAction {
    payload: StoreDefaultData;
    type: MerchantActionTypes.SET_STORE_DEFAULTS;
}

export interface StoreDefaultData {
    storeHash: string;
}

export function setStoreDefault(payload: StoreDefaultData): SetStoreDataAction {
    return {
        payload,
        type: MerchantActionTypes.SET_STORE_DEFAULTS,
    };
}

export function setStoreData(storeHash: string): Dispatch<State> {
    return (dispatch: Dispatch<State>) => dispatch(setStoreDefault({storeHash}));
}
