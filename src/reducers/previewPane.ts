import { Action } from '../actions/action';
import { PreviewPaneActionTypes } from '../actions/previewPane';
import { ThemeActionTypes } from '../actions/theme';

import { VIEWPORT_TYPES } from '../components/PreviewPane/constants';
import { ViewportType } from '../components/PreviewPane/PreviewPane';
import { parseFont } from '../services/previewPane';

export const initialState = {
    fontUrl: null,
    iframeUrl: '',
    isFetching: true,
    isRotated: false,
    needsForceReload: false,
    page: '/',
    raceConditionDetected: false,
    viewportType: VIEWPORT_TYPES.DESKTOP,
};

export interface PreviewPaneState {
    fontUrl: string | null;
    iframeUrl: string;
    isFetching: boolean;
    isRotated: boolean;
    needsForceReload: boolean;
    page: string;
    viewportType: ViewportType;
}

const previewPane = (
    state: PreviewPaneState = initialState,
    action: Action
): PreviewPaneState => {
    if (action.error) {
        return state;
    }

    switch (action.type) {
        case PreviewPaneActionTypes.PREVIEW_PANE_DEFAULTS:
            return { ...state, ...action.payload};
        case PreviewPaneActionTypes.PAGE_URL_REQUEST:
            return { ...state, ...action.payload, isFetching: true };
        case PreviewPaneActionTypes.PAGE_URL_RESPONSE:
            return {
                ...state,
                iframeUrl: action.payload.pageUrl,
                isFetching: false,
                page: action.payload.page,
            };
        case PreviewPaneActionTypes.PAGE_UPDATE:
            return { ...state, ...action.payload };
        case PreviewPaneActionTypes.THEME_FONT_CHANGE:
            return { ...state, ...{ fontUrl: parseFont(action.payload.value) } };
        case PreviewPaneActionTypes.THEME_PREVIEW_CONFIG_REQUEST:
            return {
                ...state,
                isFetching: true,
            };
        case PreviewPaneActionTypes.VIEWPORT_CHANGE:
            return { ...state, ...action.payload };
        case PreviewPaneActionTypes.PREVIEW_PANE_LOADING:
            return {
                ...state,
                isFetching: true,
            };
        case PreviewPaneActionTypes.PREVIEW_PANE_LOADED:
            return {
                ...state,
                isFetching: false,
            };
        case PreviewPaneActionTypes.PREVIEW_PANE_PAGE_RELOADING:
            return {
                ...state,
                needsForceReload: true,
            };
        case PreviewPaneActionTypes.PREVIEW_PANE_PAGE_RELOADED:
            return {
                ...state,
                needsForceReload: false,
            };
        case ThemeActionTypes.SAVE_THEME_CONFIG_RESPONSE:
            return {
                ...state,
                needsForceReload: action.payload.forceReload,
            };
        case ThemeActionTypes.PREVIEW_THEME_CONFIG_RESPONSE:
            return {
                ...state,
                needsForceReload: action.payload.forceReload,
            };
        default:
            return state;
    }
};

export default previewPane;
