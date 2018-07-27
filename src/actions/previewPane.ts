import { Dispatch } from 'redux';

import { ViewportType } from '../components/PreviewPane/PreviewPane';
import { State } from '../reducers/reducers';
import * as api from '../services/previewPane';

import { Action } from './action';

export enum PreviewPaneActionTypes {
    PAGE_SOURCE_REQUEST = 'PAGE_SOURCE_REQUEST',
    PAGE_SOURCE_RESPONSE = 'PAGE_SOURCE_RESPONSE',
    PREVIEW_PANE_LOADED = 'PREVIEW_PANE_LOADED',
    PREVIEW_PANE_LOADING = 'PREVIEW_PANE_LOADING',
    THEME_PREVIEW_CONFIG_REQUEST = 'THEME_PREVIEW_CONFIG_REQUEST',
    VIEWPORT_CHANGE = 'VIEWPORT_CHANGE',
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

export interface PreviewPaneLoadingAction extends Action  {
    type: PreviewPaneActionTypes.PREVIEW_PANE_LOADING;
}

export interface PreviewPaneLoadedAction extends Action  {
    type: PreviewPaneActionTypes.PREVIEW_PANE_LOADED;
}

export function previewPaneLoading(): PreviewPaneLoadingAction {
    return {
        type: PreviewPaneActionTypes.PREVIEW_PANE_LOADING,
    };
}

export function previewPaneLoaded(): PreviewPaneLoadedAction {
    return {
        type: PreviewPaneActionTypes.PREVIEW_PANE_LOADED,
    };
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

export function receiveThemeConfigChange() {
    return (dispatch: Dispatch<State>, getState: () => State) => {
        const {
            configurationId,
            variations,
            versionId,
        } = getState().theme;

        const isCurrentIndex = variations.map(variation => variation.isCurrent).indexOf(true);
        const lastCommitId = isCurrentIndex >= 0 ? variations[isCurrentIndex].lastCommitId : '';

        dispatch(previewPaneLoading());
        dispatch(receiveThemePreviewConfig(
            configurationId,
            versionId,
            lastCommitId
        ));
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

export function viewportChange(viewportType: ViewportType, isRotated: boolean = false) {
    return {
        payload: {
            isRotated,
            viewportType,
        },
        type: PreviewPaneActionTypes.VIEWPORT_CHANGE,
    };
}
