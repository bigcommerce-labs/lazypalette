import { combineReducers } from 'redux';

import error, { ErrorState } from './error';
import previewPane, { PreviewPaneState } from './previewPane';
import session, { SessionState } from './session';
import theme, { ThemeState } from './theme';

export interface State {
    previewPane: PreviewPaneState;
    theme: ThemeState;
    error: ErrorState;
    session: SessionState;
}

const reducers = combineReducers({
    error,
    previewPane,
    session,
    theme,
});

export default reducers;
