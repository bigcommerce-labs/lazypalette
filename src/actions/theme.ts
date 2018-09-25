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
import { updateActiveTheme } from './merchant';
import { createNotification } from './notifications';
import { updateFonts } from './previewPane';

export enum ThemeActionTypes {
    LOAD_THEME_RESPONSE = 'LOAD_THEME_RESPONSE',
    THEME_CONFIG_CHANGE = 'THEME_CONFIG_CHANGE',
    THEME_CONFIG_RESET = 'THEME_CONFIG_RESET',
    THEME_VARIATION_HISTORY_RESPONSE = 'THEME_VARIATION_HISTORY_RESPONSE',
    POST_THEME_CONFIG_RESPONSE = 'POST_THEME_CONFIG_RESPONSE',
    PREVIEW_THEME_CONFIG_RESPONSE = 'PREVIEW_THEME_CONFIG_RESPONSE',
    SAVE_THEME_CONFIG_RESPONSE = 'SAVE_THEME_CONFIG_RESPONSE',
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

export interface LoadThemeResponseAction extends Action  {
    error: boolean;
    payload: LoadThemeResponse | Error;
    type: ThemeActionTypes.LOAD_THEME_RESPONSE;
}

export interface ThemeVariationHistoryResponseAction extends Action  {
    error: boolean;
    payload: ThemeVariationHistoryResponse | Error;
    type: ThemeActionTypes.THEME_VARIATION_HISTORY_RESPONSE;
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
    forceReload: boolean | undefined;
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

export interface LoadThemeResponse {
    configurationId: string;
    displayVersion: string;
    editorSchema: ThemeSchema;
    isPurchased: boolean;
    lastCommitId: string;
    price: number;
    settings: SettingsType;
    themeId: string;
    themeName: string;
    variationHistory: ThemeVariationHistory;
    variationId: string;
    variationName: string;
    variations: ThemeVariations;
    versionId: string;
}

export interface ThemeVariationHistoryResponse {
    variationHistory: ThemeVariationHistory;
}

export function themeConfigChange(payload: ThemeConfigChange): ThemeConfigChangeAction {
    return {
        payload,
        type: ThemeActionTypes.THEME_CONFIG_CHANGE,
    };
}

export function themeConfigResetResponse(): ThemeConfigResetAction {
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

export function loadThemeResponse(
    payload: LoadThemeResponse,
    error: boolean = false
): LoadThemeResponseAction {
    return {
        error,
        payload,
        type: ThemeActionTypes.LOAD_THEME_RESPONSE,
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

export function loadTheme(variationId: string, configurationId?: string, upgrade?: boolean) {
    return (dispatch: Dispatch<State>, getState: () => State) => {
        const storeHash = getState().merchant.storeHash;

        return api.fetchAllThemeData({ storeHash, variationId, configurationId, upgrade }).then(({
            configurationId: activeConfigurationId,
            displayVersion,
            editorSchema,
            id: fetchedVariationId,
            isPurchased,
            lastCommitId,
            price,
            relatedVariations: variations,
            settings,
            themeId,
            themeName,
            variationHistory,
            variationName,
            versionId,
        }) => {
            return dispatch(loadThemeResponse({
                configurationId: configurationId || activeConfigurationId,
                displayVersion,
                editorSchema,
                isPurchased,
                lastCommitId,
                price: price || 0,
                settings,
                themeId,
                themeName,
                variationHistory,
                variationId: fetchedVariationId,
                variationName,
                variations,
                versionId,
            }));
        })
            .catch(error => dispatch(loadThemeResponse(error, true)));
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

        return dispatch(postThemeConfigData(ConfigUpdateAction.PREVIEW, !!configChange.setting.force_reload));
    };
}

export function postApplyUpdate() {
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
            preview: false,
            publish: false,
            reset: false,
            settings,
            themeId,
            variationId,
            versionId,
        };

        return api.postThemeUpgrade(configData)
            .then(({configurationId: newConfigurationId}) => {
                const { settings: newSettings } = configData;

                dispatch(themeConfigSaveResponse({
                    configurationId: newConfigurationId,
                    forceReload: true,
                    settings: newSettings,
                }));
                dispatch(fetchVariationHistory(variationId));
                dispatch(createNotification(true, ToastMessages.Update, ToastType.Success));
            })
            .catch(error => dispatch(themeConfigPostResponse(error, true)));
    };
}

export function postThemeConfigData(configUpdateOption: ConfigUpdateAction, forceReload: boolean) {
    return (dispatch: Dispatch<State>, getState: () => State) => {
        const { isPrelaunchStore } = getState().merchant;
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
                    dispatch(loadTheme(variationId));
                    dispatch(updateActiveTheme({
                        activeThemeId: themeId,
                        activeVariationId: variationId,
                    }));
                    dispatch(createNotification(
                        true,
                        isPrelaunchStore ? ToastMessages.Save : ToastMessages.Publish,
                        ToastType.Success
                    ));
                } else if (configData.preview) {
                    dispatch(themeConfigPreviewResponse({
                        configurationId: newConfigurationId,
                        forceReload,
                        settings: newSettings,
                    }));
                } else {
                    dispatch(themeConfigSaveResponse({
                        configurationId: newConfigurationId,
                        forceReload,
                        settings: newSettings,
                    }));
                    dispatch(fetchVariationHistory(variationId));
                    dispatch(createNotification(true, ToastMessages.Save, ToastType.Success));
                }
            })
            .catch(error => {
                let errorMsg = ToastMessages.ErrorSave;

                if (configData.publish) {
                    errorMsg = ToastMessages.ErrorPublish;
                } else if (configData.preview) {
                    errorMsg = ToastMessages.ErrorPreview;
                }

                dispatch(createNotification(false, errorMsg, ToastType.Invalid));
                dispatch(themeConfigPostResponse(error, true));
            });
    };
}

export function themeConfigReset(): Dispatch<State> {
    return (dispatch: Dispatch<State>) => {
        dispatch(themeConfigResetResponse());
        dispatch(createNotification(true, ToastMessages.Undo, ToastType.Success));
    };
}
