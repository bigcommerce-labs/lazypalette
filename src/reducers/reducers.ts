import { combineReducers } from 'redux';

import error, { ErrorState } from './error';
import previewPane, { PreviewPaneState } from './previewPane';
import theme, { ThemeState } from './theme';

export interface State {
    previewPane: PreviewPaneState;
    theme: ThemeState;
    error: ErrorState;
}

const reducers = combineReducers({
    error,
    previewPane,
    theme,
});

export default reducers;
