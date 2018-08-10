import { Dispatch } from 'redux';

import { ViewportType } from '../components/PreviewPane/PreviewPane';
import { State } from '../reducers/reducers';
import * as api from '../services/previewPane';

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

export interface PageSourceRequest {
    page: string;
}
export interface PageSourceRequestAction extends Action  {
    payload: PageSourceRequest;
    type: PreviewPaneActionTypes.PAGE_SOURCE_REQUEST;
}
export function pageSourceRequest(payload: PageSourceRequest): PageSourceRequestAction {
    return {
        payload,
        type: PreviewPaneActionTypes.PAGE_SOURCE_REQUEST,
    };
}

export interface PageSourceResponse {
    page: string;
    pageSource: string;
}
export interface PageSourceResponseAction extends Action  {
    error: boolean;
    payload: PageSourceResponse | Error;
    type: PreviewPaneActionTypes.PAGE_SOURCE_RESPONSE;
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

export interface FetchPageSource {
    page: string;
}
export function fetchPageSource(
    { page }: FetchPageSource
): (dispatch: Dispatch<State>, getState: () => State) => void {
    return (dispatch: Dispatch<State>, getState: () => State): void => {
        dispatch(pageSourceRequest({ page }));

        const { configurationId, lastCommitId, versionId } = getState().previewPane.themePreviewConfig;
        const token = `${versionId}@${configurationId}`;
        const queryParams = {
            stencilEditor: lastCommitId ? `${token}@${lastCommitId}` : token,
        };

        api.requestPageSource(page, queryParams)
            .then((pageSource: string) => dispatch(pageSourceResponse({page, pageSource})))
            .catch((error: Error) => dispatch(pageSourceResponse(error, true)));
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
