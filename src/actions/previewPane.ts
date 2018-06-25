import { ErrorFluxStandardAction, FluxStandardAction } from 'flux-standard-action';
import { Dispatch } from 'react-redux';

import * as api from '../services/previewPane';

export enum PreviewPaneActionTypes {
    REQUEST_PAGE_SOURCE = 'REQUEST_PAGE_SOURCE',
    RECEIVE_PAGE_SOURCE = 'RECEIVE_PAGE_SOURCE',
    RECEIVE_PAGE_SOURCE_ERROR = 'RECEIVE_PAGE_SOURCE_ERROR',
}

export const requestPageSource = (page: string): FluxStandardAction<{
page: string;
}> => ({
    payload: {
        page,
    },
    type: PreviewPaneActionTypes.REQUEST_PAGE_SOURCE,
});

export const receivePageSource = (page: string, pageSource: string): FluxStandardAction<{
page: string;
pageSource: string;
}> => ({
    payload: {
        page,
        pageSource,
    },
    type: PreviewPaneActionTypes.RECEIVE_PAGE_SOURCE,
});

export const receivePageSourceError = (page: string, error: Error): ErrorFluxStandardAction<Error> => ({
    error: true,
    payload: error,
    type: PreviewPaneActionTypes.RECEIVE_PAGE_SOURCE_ERROR,
});

export const fetchPageSource = (page: string) => {
    return (dispatch: Dispatch<FluxStandardAction<{ page: string }> | ErrorFluxStandardAction<Error>>) => {
        dispatch(requestPageSource(page));

        return api.requestPageSource(page)
            .then((pageSource: string) => dispatch(receivePageSource(page, pageSource)))
            .catch((error: Error) => dispatch(receivePageSourceError(page, error)));
    };
};
