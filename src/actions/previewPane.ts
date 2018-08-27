import { entries } from 'lodash';
import { Dispatch } from 'redux';

import { ViewportType } from '../components/PreviewPane/PreviewPane';
import { State } from '../reducers/reducers';

import { Action } from './action';
import { ThemeConfigChange } from './theme';

export enum PreviewPaneActionTypes {
    PAGE_SOURCE_REQUEST = 'PAGE_SOURCE_REQUEST',
    PAGE_SOURCE_RESPONSE = 'PAGE_SOURCE_RESPONSE',
    PREVIEW_PANE_LOADED = 'PREVIEW_PANE_LOADED',
    PREVIEW_PANE_LOADING = 'PREVIEW_PANE_LOADING',
    THEME_FONT_CHANGE = 'THEME_FONT_CHANGE',
    THEME_PREVIEW_CONFIG_REQUEST = 'THEME_PREVIEW_CONFIG_REQUEST',
    VIEWPORT_CHANGE = 'VIEWPORT_CHANGE',
}

export interface PreviewPaneLoadingAction extends Action  {
    type: PreviewPaneActionTypes.PREVIEW_PANE_LOADING;
}
export function previewPaneLoading(): PreviewPaneLoadingAction {
    return {
        type: PreviewPaneActionTypes.PREVIEW_PANE_LOADING,
    };
}

export interface PreviewPaneLoadedAction extends Action  {
    type: PreviewPaneActionTypes.PREVIEW_PANE_LOADED;
}
export function previewPaneLoaded(): PreviewPaneLoadedAction {
    return {
        type: PreviewPaneActionTypes.PREVIEW_PANE_LOADED,
    };
}

export interface PageUrlRequest {
    page: string;
}
export interface PageUrlRequestAction extends Action  {
    payload: PageUrlRequest;
    type: PreviewPaneActionTypes.PAGE_SOURCE_REQUEST;
}
export function pageUrlRequest(payload: PageUrlRequest): PageUrlRequestAction {
    return {
        payload,
        type: PreviewPaneActionTypes.PAGE_SOURCE_REQUEST,
    };
}

export interface PageUrlResponse {
    page: string;
    pageUrl: string;
}
export interface PageUrlResponseAction extends Action  {
    error: boolean;
    payload: PageUrlResponse | Error;
    type: PreviewPaneActionTypes.PAGE_SOURCE_RESPONSE;
}
export function pageUrlResponse(
    payload: PageUrlResponse | Error,
    error: boolean = false
): PageUrlResponseAction {
    return {
        error,
        payload,
        type: PreviewPaneActionTypes.PAGE_SOURCE_RESPONSE,
    };
}

export interface FetchPageUrl {
    page: string;
}
export function fetchPageUrl(
    { page }: FetchPageUrl
) {
    return (dispatch: Dispatch<State>, getState: () => State) => {
        dispatch(pageUrlRequest({ page }));

        const { configurationId, lastCommitId, versionId } = getState().previewPane.themePreviewConfig;
        let pageSrc: string = page;

        if (versionId && configurationId) {
            const token = `${versionId}@${configurationId}`;
            const queryParams = {
                stencilEditor: lastCommitId ? `${token}@${lastCommitId}` : token,
            };
            const queryString = entries(queryParams).map(keyValuePair => keyValuePair.join('=')).join('&');

            pageSrc = page + (queryString ? `?${queryString}` : '');
        }

        return dispatch(pageUrlResponse({page, pageUrl: pageSrc }));
    };
}

export function updatePreviewPaneConfig(): (dispatch: Dispatch<State>, getState: () => State) => void {
    return (dispatch: Dispatch<State>, getState: () => State): void => {
        const {
            configurationId,
            variations,
            versionId,
        } = getState().theme;

        const isCurrentIndex = variations.map(variation => variation.isCurrent).indexOf(true);
        const lastCommitId = isCurrentIndex >= 0 ? variations[isCurrentIndex].lastCommitId : '';

        dispatch(previewPaneLoading());
        dispatch(receiveThemePreviewConfig({
            configurationId,
            lastCommitId,
            versionId,
        }));
    };
}

export interface RecieveThemePreviewConfig {
    configurationId: string;
    lastCommitId: string;
    versionId: string;
}
export interface RecieveThemePreviewConfigAction extends Action {
    payload: RecieveThemePreviewConfig;
    type: PreviewPaneActionTypes.THEME_PREVIEW_CONFIG_REQUEST;
}
export function receiveThemePreviewConfig(payload: RecieveThemePreviewConfig): RecieveThemePreviewConfigAction {
    return {
        payload,
        type: PreviewPaneActionTypes.THEME_PREVIEW_CONFIG_REQUEST,
    };
}

export function updateFonts(payload: ThemeConfigChange) {
    return {
        payload,
        type: PreviewPaneActionTypes.THEME_FONT_CHANGE,
    };
}

export interface ViewportChange {
    isRotated?: boolean;
    viewportType: ViewportType;
}
export interface ViewportChangeAction extends Action {
    payload: ViewportChange;
    type: PreviewPaneActionTypes.VIEWPORT_CHANGE;
}
export function viewportChange(payload: ViewportChange): ViewportChangeAction {
    return {
        payload,
        type: PreviewPaneActionTypes.VIEWPORT_CHANGE,
    };
}
