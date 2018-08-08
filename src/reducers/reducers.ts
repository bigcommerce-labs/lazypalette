import { combineReducers } from 'redux';

import error, { ErrorState } from './error';
import merchant, { MerchantStoreState } from './merchant';
import previewPane, { PreviewPaneState } from './previewPane';
import session, { SessionState } from './session';
import theme, { ThemeState } from './theme';
import uiWindow, { UIWindowState } from './uiWindow';

export interface State {
    error: ErrorState;
    merchant: MerchantStoreState;
    uiWindow: UIWindowState;
    previewPane: PreviewPaneState;
    session: SessionState;
    theme: ThemeState;
}

const reducers = combineReducers({
    error,
    merchant,
    previewPane,
    session,
    theme,
    uiWindow,
});

export default reducers;
