import { Action } from '../actions/action';
import { PageSourceResponse, PreviewPaneActionTypes } from '../actions/previewPane';

export const initialState = {
    isFetching: true,
    page: '/',
    pageSource: '',
};

export interface PreviewPaneState {
    isFetching: boolean;
    page: string;
    pageSource: string;
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
        default:
            return state;
    }
};

export default previewPane;
