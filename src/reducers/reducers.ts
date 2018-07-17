import { combineReducers } from 'redux';

import error, { ErrorState } from './error';
import merchant, { MerchantStoreState } from './merchant';
import previewPane, { PreviewPaneState } from './previewPane';
import session, { SessionState } from './session';
import theme, { ThemeState } from './theme';

export interface State {
    merchant: MerchantStoreState;
    previewPane: PreviewPaneState;
    theme: ThemeState;
    error: ErrorState;
    session: SessionState;
}

const reducers = combineReducers({
    error,
    merchant,
    previewPane,
    session,
    theme,
});

export default reducers;
