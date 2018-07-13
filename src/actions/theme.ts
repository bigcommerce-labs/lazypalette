import { Dispatch } from 'redux';

import { State } from '../reducers/reducers';
import { ThemeSchema, ThemeVariations } from '../reducers/theme';
import * as api from '../services/themeApi';

import { Action } from './action';
import { receiveThemeConfigChange } from './previewPane';

export enum ThemeActionTypes {
    CURRENT_THEME_RESPONSE = 'CURRENT_THEME_RESPONSE',
    THEME_CONFIG_RESPONSE = 'THEME_CONFIG_RESPONSE',
    THEME_CONFIG_CHANGE = 'THEME_CONFIG_CHANGE',
    THEME_CONFIG_RESET = 'THEME_CONFIG_RESET',
    THEME_VERSION_RESPONSE = 'THEME_VERSION_RESPONSE',
    THEME_VARIATION_RESPONSE = 'THEME_VARIATION_RESPONSE',
    POST_THEME_CONFIG_RESPONSE = 'POST_THEME_CONFIG_RESPONSE',
}

export interface CurrentThemeResponseAction extends Action {
    error: boolean;
    payload: CurrentThemeResponse | Error;
    type: ThemeActionTypes.CURRENT_THEME_RESPONSE;
}

export interface ThemeConfigResponseAction extends Action  {
    error: boolean;
    payload: ThemeConfigResponse | Error;
    type: ThemeActionTypes.THEME_CONFIG_RESPONSE;
}

export interface ThemeConfigChangeAction extends Action  {
    payload: ThemeConfigChange;
    type: ThemeActionTypes.THEME_CONFIG_CHANGE;
}

export interface ThemeConfigResetAction extends Action  {
    type: ThemeActionTypes.THEME_CONFIG_RESET;
}

export interface ThemeConfigPostAction extends Action  {
    error: boolean;
    payload: ThemeConfigPostResponse | Error;
    type: ThemeActionTypes.POST_THEME_CONFIG_RESPONSE;
}

export interface ThemeVersionResponseAction extends Action  {
    error: boolean;
    payload: ThemeVersionResponse | Error;
    type: ThemeActionTypes.THEME_VERSION_RESPONSE;
}

export interface ThemeVariationResponseAction extends Action  {
    error: boolean;
    payload: ThemeVariationResponse | Error;
    type: ThemeActionTypes.THEME_VARIATION_RESPONSE;
}

export interface CurrentThemeResponse {
    configurationId: string;
    variationId: string;
    themeId: string;
    variations: ThemeVariations;
    versionId: string;
}

export interface ThemeConfigResponse {
    settings: SettingsType;
}

export interface SettingsType {
    [key: string]: string | number | boolean;
}

export interface ThemeConfigChange {
    [key: string]: string | boolean | number;
}

export interface ThemeConfigPostResponse {
    configurationId: string;
    settings: {};
}

export interface ThemeConfigPostData {
    configurationId: string;
    preview: boolean;
    publish: boolean;
    reset: boolean;
    settings: {};
    themeId: string;
    variationId: string;
    versionId: string;
}

export interface ThemeVersionResponse {
    editorSchema: ThemeSchema;
}

export interface ThemeVariationResponse {
    configurationId: string;
    variationId: string;
    themeId: string;
    variations: ThemeVariations;
    versionId: string;
    isPurchased: boolean;
}

export function currentThemeResponse(
    payload: CurrentThemeResponse | Error,
    error: boolean = false
): CurrentThemeResponseAction {
    return {
        error,
        payload,
        type: ThemeActionTypes.CURRENT_THEME_RESPONSE,
    };
}

export function themeConfigResponse(
    payload: ThemeConfigResponse | Error,
    error: boolean = false
): ThemeConfigResponseAction {
    return {
        error,
        payload,
        type: ThemeActionTypes.THEME_CONFIG_RESPONSE,
    };
}

export function themeConfigChange(payload: ThemeConfigChange): ThemeConfigChangeAction {
    return {
        payload,
        type: ThemeActionTypes.THEME_CONFIG_CHANGE,
    };
}

export function themeConfigReset(): ThemeConfigResetAction {
    return {
        type: ThemeActionTypes.THEME_CONFIG_RESET,
    };
}

export function themeConfigPostResponse(
    payload: ThemeConfigPostResponse | Error,
    error: boolean = false
): ThemeConfigPostAction {
    return {
        error,
        payload,
        type: ThemeActionTypes.POST_THEME_CONFIG_RESPONSE,
    };
}

export function themeVersionResponse(
    payload: ThemeVersionResponse | Error,
    error: boolean = false
): ThemeVersionResponseAction {
    return {
        error,
        payload,
        type: ThemeActionTypes.THEME_VERSION_RESPONSE,
    };
}

export function themeVariationResponse(
    payload: ThemeVariationResponse,
    error: boolean = false
): ThemeVariationResponseAction {
    return {
        error,
        payload,
        type: ThemeActionTypes.THEME_VARIATION_RESPONSE,
    };
}

export function fetchCurrentTheme() {
    return (dispatch: Dispatch<State>) => {
        return api.fetchCurrentTheme()
            .then(({ configurationId, versionId, relatedVariations: variations, themeId, id: variationId }) => {
                dispatch(currentThemeResponse({ configurationId, versionId, variations, themeId, variationId }));
            })
            .catch(error => dispatch(currentThemeResponse(error, true)));
    };
}

export function fetchThemeConfig(configurationId: string) {
    return (dispatch: Dispatch<State>) => {
        return api.fetchThemeConfig(configurationId)
            .then(({ settings }) => dispatch(themeConfigResponse({ settings })))
            .catch(error => dispatch(themeConfigResponse(error, true)));
    };
}

export function fetchThemeVersion(versionId: string) {
    return (dispatch: Dispatch<State>, getState: () => State) => {
        const { storeHash } = getState().merchant;

        return api.fetchThemeVersion(storeHash, versionId)
            .then(({ editorSchema }) => dispatch(themeVersionResponse({ editorSchema })))
            .catch(error => dispatch(themeVersionResponse(error, true)));
    };
}

export function changeThemeVariation(variationId: string) {
    return (dispatch: Dispatch<State>, getState: () => State) => {
        return dispatch(fetchVariation(variationId))
            .then(() => dispatch(fetchThemeData(getState().theme.versionId,
                getState().theme.configurationId)));
    };
}

export function fetchInitialState(storeHash: string, variationId: string) {
    return (dispatch: Dispatch<State>, getState: () => State) => {
        if (variationId !== '') {
            return dispatch(fetchVariation(variationId))
                .then(() => dispatch(fetchThemeData(getState().theme.versionId,
                    getState().theme.configurationId)));
        } else {
            return dispatch(fetchCurrentTheme())
                .then(() => dispatch(fetchThemeData(getState().theme.versionId,
                    getState().theme.configurationId)));
        }
    };
}

export function fetchVariation(variationId: string) {
    return (dispatch: Dispatch<State>, getState: () => State) => {
        const { storeHash } = getState().merchant;

        return api.fetchVariation(storeHash, variationId)
            .then(({ configurationId, versionId, relatedVariations: variations, isPurchased, themeId }) => {
                dispatch(themeVariationResponse({
                    configurationId,
                    isPurchased,
                    themeId,
                    variationId,
                    variations,
                    versionId,
                }));
            })
            .catch(error => dispatch(themeVariationResponse(error, true)));
    };
}

export function updateThemeConfigChange(configChange: ThemeConfigChange) {
    return (dispatch: Dispatch<State>) => Promise.all([
        dispatch(themeConfigChange(configChange)),
        dispatch(receiveThemeConfigChange(configChange))]);
}

export function postThemeConfigData(configData: ThemeConfigPostData): Dispatch<State> {
    return (dispatch: Dispatch<State>) => {
        return api.postThemeConfig(configData)
            .then(({ configurationId }) => {
                const { settings } = configData;

                dispatch(themeConfigPostResponse({
                    configurationId,
                    settings,
                }));
            })
            .catch(error => dispatch(themeConfigPostResponse(error, true)));
    };
}

export function fetchThemeData(versionId: string, configurationId: string): Dispatch<State> {
    return (dispatch: Dispatch<State>) => Promise.all([
        dispatch(fetchThemeVersion(versionId)),
        dispatch(fetchThemeConfig(configurationId))]);
}
