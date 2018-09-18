import { Action } from '../actions/action';
import { PageUrlResponse, PreviewPaneActionTypes } from '../actions/previewPane';
import { VIEWPORT_TYPES } from '../components/PreviewPane/constants';
import { ViewportType } from '../components/PreviewPane/PreviewPane';
import { parseFont } from '../services/previewPane';

export const initialState = {
    fontUrl: null,
    isFetching: true,
    isRotated: false,
    needsForceReload: false,
    page: '/',
    pageUrl: '',
    raceConditionDetected: false,
    themePreviewConfig: {
        configurationId: '',
        lastCommitId: '',
        variationId: '',
        versionId: '',
    },
    viewportType: VIEWPORT_TYPES.DESKTOP,
};

export interface ThemePreviewConfig {
    configurationId: string;
    lastCommitId: string;
    variationId: string;
    versionId: string;
}

export interface PreviewPaneState {
    fontUrl: string | null;
    isFetching: boolean;
    isRotated: boolean;
    needsForceReload: boolean;
    page: string;
    pageUrl: string;
    raceConditionDetected: boolean;
    themePreviewConfig: ThemePreviewConfig;
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
            return { ...state, ...action.payload as PageUrlResponse, isFetching: false };
        case PreviewPaneActionTypes.PAGE_UPDATE:
            return { ...state, ...action.payload };
        case PreviewPaneActionTypes.THEME_FONT_CHANGE:
            return { ...state, ...{ fontUrl: parseFont(action.payload.value) } };
        case PreviewPaneActionTypes.THEME_PREVIEW_CONFIG_REQUEST:
            return {
                ...state,
                ...{ themePreviewConfig: { ...state.themePreviewConfig, ...action.payload } },
                isFetching: true,
            };
        case PreviewPaneActionTypes.VIEWPORT_CHANGE:
            return { ...state, ...action.payload };
        case PreviewPaneActionTypes.PREVIEW_PANE_RACE_CONDITION_DETECTED:
            return {
                ...state,
                raceConditionDetected: true,
            };
        case PreviewPaneActionTypes.PREVIEW_PANE_RACE_CONDITION_RESOLVED:
            return {
                ...state,
                raceConditionDetected: false,
            };
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
        default:
            return state;
    }
};

export default previewPane;
