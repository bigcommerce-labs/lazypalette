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
    isCurrent: boolean;
    isDownForMaintenance: boolean;
    isPrelaunchStore: boolean;
    storeHash: string;
    timezoneName: string;
    timezoneOffset: number;
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

export function setStoreData(storeData: StoreDefaultData): Dispatch<State> {
    return (dispatch: Dispatch<State>) => dispatch(setStoreDefault(storeData));
}
