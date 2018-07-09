import { combineReducers } from 'redux';

import error, { ErrorState } from './error';
import merchant, { MerchantStoreState } from './merchant';
import previewPane, { PreviewPaneState } from './previewPane';
import theme, { ThemeState } from './theme';

export interface State {
    merchant: MerchantStoreState;
    previewPane: PreviewPaneState;
    theme: ThemeState;
    error: ErrorState;
}

const reducers = combineReducers({
    error,
    merchant,
    previewPane,
    theme,
});

export default reducers;
