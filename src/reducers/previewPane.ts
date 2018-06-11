import { FluxStandardAction } from 'flux-standard-action';
import { PreviewPaneActionTypes } from '../actions/previewPane';
import { updateState } from './reducers';

export const initialState = {
  isError: false,
  isFetching: true,
  page: '/',
  pageSource: '',
};

export interface PreviewPaneState {
  isError: boolean;
  isFetching: boolean;
  page: string;
  pageSource: string;
}

interface Payload {
  page: string;
  pageSource: string;
}

const previewPane = (
  state: PreviewPaneState = initialState,
  action: FluxStandardAction<Payload>
): PreviewPaneState => {
  switch (action.type) {
    case PreviewPaneActionTypes.REQUEST_PAGE_SOURCE:
      return updateState(state, { ...action.payload, isFetching: true });
    case PreviewPaneActionTypes.RECEIVE_PAGE_SOURCE:
      return updateState(state, { ...action.payload, isFetching: false });
    case PreviewPaneActionTypes.RECEIVE_PAGE_SOURCE_ERROR:
      return updateState(state, { isError: true, isFetching: true });
    default:
      return state;
  }
};

export default previewPane;
