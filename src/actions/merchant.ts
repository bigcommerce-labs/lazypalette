import { Dispatch } from 'redux';

import { State } from '../reducers/reducers';

export enum MerchantActionTypes {
    SET_STORE_DEFAULTS = 'SET_STORE_DEFAULTS',
}

export interface SetStoreDataAction {
    error?: boolean;
    payload: StoreDefaultData | Error;
    type: MerchantActionTypes.SET_STORE_DEFAULTS;
}

export interface StoreDefaultData {
    storeHash: string;
}

export function setStoreDefault(
    payload: StoreDefaultData | Error,
    error: boolean = false
): SetStoreDataAction {
    return {
        error,
        payload,
        type: MerchantActionTypes.SET_STORE_DEFAULTS,
    };
}

export function setStoreData(storeHash: string): Dispatch<State> {
    return (dispatch: Dispatch<State>) => dispatch(setStoreDefault({storeHash}));
}
