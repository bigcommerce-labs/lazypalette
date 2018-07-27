import { Action } from '../actions/action';
import { PageSourceResponse, PreviewPaneActionTypes } from '../actions/previewPane';
import { VIEWPORT_TYPES } from '../components/PreviewPane/constants';
import { ViewportType } from '../components/PreviewPane/PreviewPane';

export const initialState = {
    isFetching: true,
    isRotated: false,
    page: '/',
    pageSource: '',
    themePreviewConfig: {
        configurationId: '',
        lastCommitId: '',
        versionId: '',
    },
    viewportType: VIEWPORT_TYPES.DESKTOP,
};

export interface ThemePreviewConfig {
    configurationId: string;
    lastCommitId: string;
    versionId: string;
}

export interface PreviewPaneState {
    isFetching: boolean;
    isRotated: boolean;
    page: string;
    pageSource: string;
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
        case PreviewPaneActionTypes.PAGE_SOURCE_REQUEST:
            return { ...state, ...action.payload, isFetching: true };
        case PreviewPaneActionTypes.PAGE_SOURCE_RESPONSE:
            return { ...state, ...action.payload as PageSourceResponse, isFetching: false };
        case PreviewPaneActionTypes.THEME_PREVIEW_CONFIG_REQUEST:
            return {
                ...state,
                ...{ themePreviewConfig: { ...state.themePreviewConfig, ...action.payload } },
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
        default:
            return state;
    }
};

export default previewPane;
