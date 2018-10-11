import { Dispatch} from 'redux';

import { State } from '../reducers/reducers';

export enum MerchantActionTypes {
    SET_STORE_DEFAULTS = 'SET_STORE_DEFAULTS',
    UPDATE_ACTIVE_THEME = 'UPDATE_ACTIVE_THEME',
    UPDATE_QUERY_PARAMS = 'UPDATE_QUERY_PARAMS',
}

export interface SetStoreDataAction {
    error?: boolean;
    payload: StoreDefaultData | Error;
    type: MerchantActionTypes.SET_STORE_DEFAULTS;
}

export interface StoreFeatures {
    [feature: string]: boolean;
}

export interface StoreDefaultData {
    activeThemeId: string;
    activeVariationId: string;
    canOptOut: boolean;
    features: StoreFeatures;
    isDownForMaintenance: boolean;
    isPrelaunchStore: boolean;
    previewCode: string;
    storeHash: string;
}

export interface UpdateActiveThemeAction {
    payload: UpdateActiveThemeData;
    type: MerchantActionTypes.UPDATE_ACTIVE_THEME;
}

export interface UpdateQueryParamsAction {
    payload: QueryParamsData;
    type: MerchantActionTypes.UPDATE_QUERY_PARAMS;
}

export interface QueryParamsData {
    queryParams: string;
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

export function setQueryParams(payload: QueryParamsData): UpdateQueryParamsAction {
    return {
        payload,
        type: MerchantActionTypes.UPDATE_QUERY_PARAMS,
    };
}
