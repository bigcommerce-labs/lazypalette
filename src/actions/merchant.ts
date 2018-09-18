import { Dispatch } from 'redux';

import { State } from '../reducers/reducers';

export enum MerchantActionTypes {
    SET_STORE_DEFAULTS = 'SET_STORE_DEFAULTS',
    UPDATE_ACTIVE_THEME = 'UPDATE_ACTIVE_THEME',
}

export interface SetStoreDataAction {
    error?: boolean;
    payload: StoreDefaultData | Error;
    type: MerchantActionTypes.SET_STORE_DEFAULTS;
}

export interface StoreDefaultData {
    previewCode: string;
    activeThemeId: string;
    activeVariationId: string;
    isDownForMaintenance: boolean;
    isPrelaunchStore: boolean;
    storeHash: string;
    timezoneName: string;
    timezoneOffset: number;
}

export interface UpdateActiveThemeAction {
    payload: UpdateActiveThemeData;
    type: MerchantActionTypes.UPDATE_ACTIVE_THEME;
}

export interface UpdateActiveThemeData {
    activeThemeId: string;
    activeVariationId: string;
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

export function updateActiveTheme(payload: UpdateActiveThemeData): UpdateActiveThemeAction {
    return {
        payload,
        type: MerchantActionTypes.UPDATE_ACTIVE_THEME,
    };
}
