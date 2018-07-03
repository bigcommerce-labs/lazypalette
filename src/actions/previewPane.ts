import { Dispatch } from 'redux';

import { State } from '../reducers/reducers';
import * as api from '../services/previewPane';

import { Action } from './action';

export enum PreviewPaneActionTypes {
    PAGE_SOURCE_REQUEST = 'PAGE_SOURCE_REQUEST',
    PAGE_SOURCE_RESPONSE = 'PAGE_SOURCE_RESPONSE',
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
