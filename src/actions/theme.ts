import {Dispatch} from 'redux';

import { State } from '../reducers/reducers';
import {
    ThemeSchema,
    ThemeSchemaEntrySetting,
    ThemeVariations,
    ThemeVariationHistory
} from '../reducers/theme';
import * as api from '../services/themeApi';

import { Action } from './action';
import { ConfigUpdateAction, ToastMessages, ToastType } from './constants';
import { createNotification } from './notifications';
import { fetchPageUrl, updateFonts } from './previewPane';

export enum ThemeActionTypes {
    CURRENT_THEME_RESPONSE = 'CURRENT_THEME_RESPONSE',
    THEME_CONFIG_RESPONSE = 'THEME_CONFIG_RESPONSE',
    THEME_CONFIG_CHANGE = 'THEME_CONFIG_CHANGE',
    THEME_CONFIG_RESET = 'THEME_CONFIG_RESET',
    THEME_VERSION_RESPONSE = 'THEME_VERSION_RESPONSE',
    THEME_VARIATION_RESPONSE = 'THEME_VARIATION_RESPONSE',
    THEME_VARIATION_HISTORY_RESPONSE = 'THEME_VARIATION_HISTORY_RESPONSE',
    POST_THEME_CONFIG_RESPONSE = 'POST_THEME_CONFIG_RESPONSE',
    PUBLISH_THEME_CONFIG_RESPONSE = 'PUBLISH_THEME_CONFIG_RESPONSE',
    PREVIEW_THEME_CONFIG_RESPONSE = 'PREVIEW_THEME_CONFIG_RESPONSE',
    SAVE_THEME_CONFIG_RESPONSE = 'SAVE_THEME_CONFIG_RESPONSE',
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

export interface ThemeConfigPublishAction extends Action  {
    error: boolean;
    payload: ThemeConfigPostResponse | Error;
    type: ThemeActionTypes.PUBLISH_THEME_CONFIG_RESPONSE;
}

export interface ThemeConfigPreviewAction extends Action  {
    error: boolean;
    payload: ThemeConfigPostResponse | Error;
    type: ThemeActionTypes.PREVIEW_THEME_CONFIG_RESPONSE;
}

export interface ThemeConfigSaveAction extends Action  {
    error: boolean;
    payload: ThemeConfigPostResponse | Error;
    type: ThemeActionTypes.SAVE_THEME_CONFIG_RESPONSE;
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

export interface ThemeVariationHistoryResponseAction extends Action  {
    error: boolean;
    payload: ThemeVariationHistoryResponse | Error;
    type: ThemeActionTypes.THEME_VARIATION_HISTORY_RESPONSE;
}

export interface CurrentThemeResponse {
    configurationId: string;
    isCurrent: boolean;
    isPurchased: boolean;
    variationId: string;
    themeId: string;
    variations: ThemeVariations;
    versionId: string;
    themeName: string;
    displayVersion: string;
    variationName: string;
}

export interface ThemeConfigResponse {
    settings: SettingsType;
}

export interface SettingsType {
    [key: string]: string | number | boolean;
}

export interface ThemeConfigChange {
    setting: ThemeSchemaEntrySetting;
    value: string | boolean | number;
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
    price: number;
    themeName: string;
    displayVersion: string;
    variationName: string;
}

export interface ThemeVariationHistoryResponse {
    variationHistory: ThemeVariationHistory;
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

export function themeConfigPreviewResponse(
    payload: ThemeConfigPostResponse | Error,
    error: boolean = false
): ThemeConfigPreviewAction {
    return {
        error,
        payload,
        type: ThemeActionTypes.PREVIEW_THEME_CONFIG_RESPONSE,
    };
}

export function themeConfigSaveResponse(
    payload: ThemeConfigPostResponse | Error,
    error: boolean = false
): ThemeConfigSaveAction {
    return {
        error,
        payload,
        type: ThemeActionTypes.SAVE_THEME_CONFIG_RESPONSE,
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

export function themeVariationHistoryResponse(
    payload: ThemeVariationHistoryResponse,
    error: boolean = false
): ThemeVariationHistoryResponseAction {
    return {
        error,
        payload,
        type: ThemeActionTypes.THEME_VARIATION_HISTORY_RESPONSE,
    };
}

export function fetchCurrentTheme() {
    return (dispatch: Dispatch<State>) => {
        return api.fetchCurrentTheme()
            .then(({
                configurationId,
                versionId,
                relatedVariations: variations,
                themeId,
                id: variationId,
                isCurrent,
                themeName,
                variationName,
                displayVersion,
                isPurchased,
            }) => {
                dispatch(currentThemeResponse({
                    configurationId,
                    displayVersion,
                    isCurrent,
                    isPurchased,
                    themeId,
                    themeName,
                    variationId,
                    variationName,
                    variations,
                    versionId,
                }));
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

export function loadTheme(variationId?: string, configurationId?: string) {
    return (dispatch: Dispatch<State>, getState: () => State) => {
        if (variationId) {
            return dispatch(fetchVariation(variationId, configurationId))
                .then(() => dispatch(fetchThemeData(
                    getState().theme.configurationId,
                    getState().theme.variationId,
                    getState().theme.versionId)));
        } else {
            return dispatch(fetchCurrentTheme())
                .then(() => dispatch(fetchThemeData(
                    getState().theme.configurationId,
                    getState().theme.variationId,
                    getState().theme.versionId)));
        }
    };
}

export function fetchVariation(variationId: string, configurationId?: string) {
    return (dispatch: Dispatch<State>, getState: () => State) => {
        const { storeHash } = getState().merchant;

        return api.fetchVariation(storeHash, variationId)
            .then(({
                configurationId: activeConfigurationId,
                versionId,
                relatedVariations: variations,
                isPurchased,
                themeId,
                themeName,
                variationName,
                displayVersion,
                price,
            }) => {
                dispatch(themeVariationResponse({
                    configurationId: configurationId || activeConfigurationId,
                    displayVersion,
                    isPurchased,
                    price: price || 0,
                    themeId,
                    themeName,
                    variationId,
                    variationName,
                    variations,
                    versionId,
                }));
            })
            .catch(error => dispatch(themeVariationResponse(error, true)));
    };
}

export function fetchVariationHistory(variationId: string) {
    return (dispatch: Dispatch<State>, getState: () => State) => {
        const { storeHash } = getState().merchant;

        return api.fetchVariationHistory(storeHash, variationId)
            .then(data => {
                dispatch(themeVariationHistoryResponse({ variationHistory: data }));
            })
            .catch(error => dispatch(themeVariationHistoryResponse(error, true)));
    };
}

export function updateThemeConfigChange(configChange: ThemeConfigChange) {
    return (dispatch: Dispatch<State>, getState: () => State) => {
        dispatch(themeConfigChange(configChange));

        if (configChange.setting.type === 'font') {
            dispatch(updateFonts(configChange));
        }

        return dispatch(postThemeConfigData(ConfigUpdateAction.PREVIEW))
            .then(() => {
                if (configChange.setting.force_reload) {
                    dispatch(fetchPageUrl({ page: getState().previewPane.page }));
                }
            });
    };
}

export function postThemeConfigData(configUpdateOption: ConfigUpdateAction) {
    return (dispatch: Dispatch<State>, getState: () => State) => {
        const {
            configurationId,
            settings,
            themeId,
            variationId,
            versionId,
        } = getState().theme;

        const configData: ThemeConfigPostData = {
            configurationId,
            preview: configUpdateOption === ConfigUpdateAction.PREVIEW,
            publish: configUpdateOption === ConfigUpdateAction.PUBLISH,
            reset: false,
            settings,
            themeId,
            variationId,
            versionId,
        };

        return api.postThemeConfig(configData)
            .then(({ configurationId: newConfigurationId }) => {
                const { settings: newSettings } = configData;

                if (configData.publish) {
                    dispatch(loadTheme());
                } else if (configData.preview) {
                    dispatch(themeConfigPreviewResponse({
                        configurationId: newConfigurationId,
                        settings: newSettings,
                    }));
                } else {
                    dispatch(themeConfigSaveResponse({
                        configurationId: newConfigurationId,
                        settings: newSettings,
                    }));
                    dispatch(fetchVariationHistory(variationId));
                    dispatch(createNotification(true, ToastMessages.SaveTheme, ToastType.Success));
                }
            })
            .catch(error => dispatch(themeConfigPostResponse(error, true)));
    };
}

export function fetchThemeData(configurationId: string, variationId: string, versionId: string): Dispatch<State> {
    return (dispatch: Dispatch<State>) => Promise.all([
        dispatch(fetchVariationHistory(variationId)),
        dispatch(fetchThemeVersion(versionId)),
        dispatch(fetchThemeConfig(configurationId))]);
}
