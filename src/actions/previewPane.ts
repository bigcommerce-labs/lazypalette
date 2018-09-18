import { entries } from 'lodash';
import { Dispatch } from 'redux';

import { ViewportType } from '../components/PreviewPane/PreviewPane';
import { State } from '../reducers/reducers';

import { Action } from './action';
import { ThemeConfigChange } from './theme';

export enum PreviewPaneActionTypes {
    PREVIEW_PANE_DEFAULTS = 'PREVIEW_PANE_DEFAULTS',
    PAGE_URL_REQUEST = 'PAGE_URL_REQUEST',
    PAGE_URL_RESPONSE = 'PAGE_URL_RESPONSE',
    PAGE_UPDATE = 'PAGE_UPDATE',
    PREVIEW_PANE_RACE_CONDITION_DETECTED = 'PREVIEW_PANE_RACE_CONDITION_DETECTED',
    PREVIEW_PANE_RACE_CONDITION_RESOLVED = 'PREVIEW_PANE_RACE_CONDITION_RESOLVED',
    PREVIEW_PANE_LOADED = 'PREVIEW_PANE_LOADED',
    PREVIEW_PANE_LOADING = 'PREVIEW_PANE_LOADING',
    PREVIEW_PANE_PAGE_RELOADING = 'PREVIEW_PANE_PAGE_RELOADING',
    PREVIEW_PANE_PAGE_RELOADED = 'PREVIEW_PANE_PAGE_RELOADED',
    THEME_FONT_CHANGE = 'THEME_FONT_CHANGE',
    THEME_PREVIEW_CONFIG_REQUEST = 'THEME_PREVIEW_CONFIG_REQUEST',
    VIEWPORT_CHANGE = 'VIEWPORT_CHANGE',
}

export interface PreviewPaneRaceConditionDetectedAction extends Action  {
    type: PreviewPaneActionTypes.PREVIEW_PANE_RACE_CONDITION_DETECTED;
}

export function previewPaneRaceConditionDetected(): PreviewPaneRaceConditionDetectedAction {
    return {
        type: PreviewPaneActionTypes.PREVIEW_PANE_RACE_CONDITION_DETECTED,
    };
}

export interface PreviewPaneRaceConditionResolvedAction extends Action  {
    type: PreviewPaneActionTypes.PREVIEW_PANE_RACE_CONDITION_RESOLVED;
}

export function previewPaneRaceConditionResolved(): PreviewPaneRaceConditionResolvedAction {
    return {
        type: PreviewPaneActionTypes.PREVIEW_PANE_RACE_CONDITION_RESOLVED,
    };
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

export interface PreviewPanePageReloadingAction extends Action  {
    type: PreviewPaneActionTypes.PREVIEW_PANE_PAGE_RELOADING;
}

export function previewPanePageReloading(): PreviewPanePageReloadingAction {
    return {
        type: PreviewPaneActionTypes.PREVIEW_PANE_PAGE_RELOADING,
    };
}

export interface PreviewPanePageReloadedAction extends Action  {
    type: PreviewPaneActionTypes.PREVIEW_PANE_PAGE_RELOADED;
}

export function previewPanePageReloaded(): PreviewPanePageReloadedAction {
    return {
        type: PreviewPaneActionTypes.PREVIEW_PANE_PAGE_RELOADED,
    };
}

export interface PageUrlRequest {
    page: string;
}

export interface PageUrlRequestAction extends Action  {
    payload: PageUrlRequest;
    type: PreviewPaneActionTypes.PAGE_URL_REQUEST;
}

export function pageUrlRequest(payload: PageUrlRequest): PageUrlRequestAction {
    return {
        payload,
        type: PreviewPaneActionTypes.PAGE_URL_REQUEST,
    };
}

export interface PageUrlResponse {
    page: string;
    pageUrl: string;
}

export interface PageUrlResponseAction extends Action  {
    error: boolean;
    payload: PageUrlResponse | Error;
    type: PreviewPaneActionTypes.PAGE_URL_RESPONSE;
}

export function pageUrlResponse(
    payload: PageUrlResponse | Error,
    error: boolean = false
): PageUrlResponseAction {
    return {
        error,
        payload,
        type: PreviewPaneActionTypes.PAGE_URL_RESPONSE,
    };
}

export interface UpdatePagePayload {
    page: string;
}

export interface UpdatePageAction extends Action {
    payload: UpdatePagePayload;
    type: PreviewPaneActionTypes.PAGE_UPDATE;
}

export function updatePage({ page }: UpdatePagePayload): UpdatePageAction {
    return {
        payload: { page },
        type: PreviewPaneActionTypes.PAGE_UPDATE,
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
        let pageUrl: string = page;

        if (versionId && configurationId) {
            const token = `${versionId}@${configurationId}`;
            const queryParams = {
                stencilEditor: lastCommitId ? `${token}@${lastCommitId}` : token,
            };
            const queryString = entries(queryParams).map(keyValuePair => keyValuePair.join('=')).join('&');

            pageUrl = page + (queryString ? `?${queryString}` : '');
        }

        return dispatch(pageUrlResponse({ page, pageUrl }));
    };
}

export function updatePreviewPaneConfig(): (dispatch: Dispatch<State>, getState: () => State) => void {
    return (dispatch: Dispatch<State>, getState: () => State): void => {
        const {
            configurationId,
            lastCommitId,
            variationId,
            versionId,
        } = getState().theme;

        dispatch(previewPaneLoading());
        dispatch(receiveThemePreviewConfig({
            configurationId,
            lastCommitId,
            variationId,
            versionId,
        }));
    };
}

export interface RecieveThemePreviewConfig {
    configurationId: string;
    lastCommitId: string;
    variationId: string;
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

export interface SetPreviewPaneDefaultAction extends Action {
    payload: PreviewPaneDefaultData;
    type: PreviewPaneActionTypes.PREVIEW_PANE_DEFAULTS;
}

export interface PreviewPaneDefaultData {
    page: string;
}

export function setPreviewPaneDefault(
    payload: PreviewPaneDefaultData
): SetPreviewPaneDefaultAction {
    return {
        payload,
        type: PreviewPaneActionTypes.PREVIEW_PANE_DEFAULTS,
    };
}

export function setPreviewPaneData(previewPaneData: PreviewPaneDefaultData): Dispatch<State> {
    return (dispatch: Dispatch<State>) => dispatch(setPreviewPaneDefault(previewPaneData));
}
