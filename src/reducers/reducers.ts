import { combineReducers } from 'redux';

import error, { ErrorState } from './error';
import merchant, { MerchantStoreState } from './merchant';
import notifications, { NotificationState } from './notifications';
import previewPane, { PreviewPaneState } from './previewPane';
import session, { SessionState } from './session';
import sideMenu, { SideMenuState } from './sideMenu';
import theme, { ThemeState } from './theme';
import uiWindow, { UIWindowState } from './uiWindow';

export interface State {
    error: ErrorState;
    merchant: MerchantStoreState;
    notifications: NotificationState;
    previewPane: PreviewPaneState;
    session: SessionState;
    sideMenu: SideMenuState;
    theme: ThemeState;
    uiWindow: UIWindowState;
}

const reducers = combineReducers({
    error,
    merchant,
    notifications,
    previewPane,
    session,
    sideMenu,
    theme,
    uiWindow,
});

export default reducers;
