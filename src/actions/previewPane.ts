import { Dispatch } from 'redux';

import { State } from '../reducers/reducers';
import * as api from '../services/previewPane';
import * as themeApi from '../services/themeApi';

import { Action } from './action';
import { ThemeConfigChange } from './theme';

export enum PreviewPaneActionTypes {
    PAGE_SOURCE_REQUEST = 'PAGE_SOURCE_REQUEST',
    PAGE_SOURCE_RESPONSE = 'PAGE_SOURCE_RESPONSE',
    THEME_PREVIEW_CONFIG_REQUEST = 'THEME_PREVIEW_CONFIG_REQUEST',
}

export interface PageSourceRequestAction extends Action  {
    payload: PageSourceRequest;
    type: PreviewPaneActionTypes.PAGE_SOURCE_REQUEST;
}

export interface PageSourceResponseAction extends Action  {
    error: boolean;
    payload: PageSourceResponse | Error;
    type: PreviewPaneActionTypes.PAGE_SOURCE_RESPONSE;
}

export interface PageSourceRequest {
    page: string;
}

export interface PageSourceResponse {
    page: string;
    pageSource: string;
}

export function pageSourceRequest(payload: PageSourceRequest): PageSourceRequestAction {
    return {
        payload,
        type: PreviewPaneActionTypes.PAGE_SOURCE_REQUEST,
    };
}

export function pageSourceResponse(
    payload: PageSourceResponse | Error,
    error: boolean = false
): PageSourceResponseAction {
    return {
        error,
        payload,
        type: PreviewPaneActionTypes.PAGE_SOURCE_RESPONSE,
    };
}

export const fetchPageSource = (page: string) => {
    return (dispatch: Dispatch<State>) => {
        dispatch(pageSourceRequest({ page }));

        return api.requestPageSource(page)
            .then((pageSource: string) => dispatch(pageSourceResponse({page, pageSource})))
            .catch((error: Error) => dispatch(pageSourceResponse(error, true)));
    };
};

export function receiveThemeConfigChange(configChange: ThemeConfigChange) {
    return (dispatch: Dispatch<State>, getState: () => State) => {
        const {
            configurationId,
            settings: currentSettings,
            themeId,
            variationId,
            variations,
            versionId,
        } = getState().theme;
        const settings = { ...currentSettings, ...configChange };
        const {
            lastCommitId,
        } = variations[variations.map(variation => variation.isCurrent).indexOf(true)];

        return themeApi.postThemeConfig({
            configurationId,
            preview: true,
            publish: false,
            reset: false,
            settings,
            themeId,
            variationId,
            versionId,
        })
            .then(({ configurationId: newConfigurationId }) => dispatch(receiveThemePreviewConfig(
                newConfigurationId, versionId, lastCommitId
            )));
    };
}

export function receiveThemePreviewConfig(
    configurationId: string,
    versionId: string,
    lastCommitId: string
) {
    return {
        payload: {
            configurationId,
            lastCommitId,
            versionId,
        },
        type: PreviewPaneActionTypes.THEME_PREVIEW_CONFIG_REQUEST,
    };
}
