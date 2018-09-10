import React, { PureComponent } from 'react';
import { connect, Dispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

import { ConfigUpdateAction } from '../../actions/constants';
import { closeNotification, CloseNotificationAction, NotificationsProps } from '../../actions/notifications';
import { previewPanePageReloading, viewportChange, ViewportChange } from '../../actions/previewPane';
import { postThemeConfigData, themeConfigReset, ThemeConfigResetAction } from '../../actions/theme';
import { State } from '../../reducers/reducers';

import { VIEWPORT_TYPES } from '../PreviewPane/constants';
import { ViewportType } from '../PreviewPane/PreviewPane';
import PubShareBox from '../PubShareBox/PubShareBox';
import Toast from '../Toast/Toast';

import { BCLogo, StyledHeaderMenu, StyledPreviewItem } from './styles';

interface HeaderMenuProps {
    configurationId: string;
    displayVersion: string;
    isRotated: boolean;
    notifications: NotificationsProps;
    themeName: string;
    variationName: string;
    viewportType: ViewportType;
    closeNotification(): CloseNotificationAction;
    postThemeConfigData(configDataOption: ConfigUpdateAction): void;
    previewPanePageReloading(): void;
    themeConfigReset(): ThemeConfigResetAction;
    toggleViewport(payload: ViewportChange): void;
}

class HeaderMenu extends PureComponent<HeaderMenuProps> {
    handlePublish = () => this.props.postThemeConfigData(ConfigUpdateAction.PUBLISH);

    handleSave = () => this.props.postThemeConfigData(ConfigUpdateAction.SAVE);

    handleReset = () => {
        this.props.themeConfigReset();

        // The user may have made structural changes to the page, these require a force reload of the preview pane.
        // TODO: We should only need to call this when the user has made structural changes, for now we will call it
        // regardless of the type of config change, we can give better undo performance by making this smarter.
        this.props.previewPanePageReloading();
    };

    handleIconClick = (view: string) => () => {
        const { isRotated, toggleViewport, viewportType } = this.props;

        if (VIEWPORT_TYPES[view] === VIEWPORT_TYPES.DESKTOP) {
            return toggleViewport({ viewportType: VIEWPORT_TYPES.DESKTOP });
        }

        return toggleViewport({
            isRotated: viewportType === VIEWPORT_TYPES[view] ? !isRotated : isRotated,
            viewportType: VIEWPORT_TYPES[view],
        });
    };

    handleToastClose = () => this.props.closeNotification();

    render() {
        const { isRotated, notifications, viewportType } = this.props;
        const { autoDismiss, message, type } = notifications;
        const [DESKTOP, MOBILE, TABLET] = Object.keys(VIEWPORT_TYPES);
        const viewportKeys = [DESKTOP, TABLET, MOBILE];

        return (
            <StyledHeaderMenu>
                <BCLogo />
                {viewportKeys.map(view => (
                    <StyledPreviewItem
                        isRotated={VIEWPORT_TYPES[view] === VIEWPORT_TYPES.DESKTOP ? undefined : isRotated}
                        isSelected={viewportType === VIEWPORT_TYPES[view]}
                        tooltip={VIEWPORT_TYPES[view].tooltip}
                        key={view}
                        onClick={this.handleIconClick(view)}
                        viewportType={VIEWPORT_TYPES[view]}
                    />
                ))}
                <PubShareBox
                    onPublish={this.handlePublish}
                    onSave={this.handleSave}
                    onReset={this.handleReset}
                />
                {message &&
                    <Toast
                        autoDismiss={autoDismiss}
                        onClose={this.handleToastClose}
                        type={type}
                    >
                        {message}
                    </Toast>
                }
            </StyledHeaderMenu>
        );
    }
}

const mapStateToProps = ({ theme, notifications, previewPane }: State): Partial<HeaderMenuProps> => ({
    configurationId: theme.configurationId,
    displayVersion: theme.displayVersion,
    isRotated: previewPane.isRotated,
    notifications,
    themeName: theme.themeName,
    variationName: theme.variationName,
    viewportType: previewPane.viewportType,
});

const mapDispatchToProps = (dispatch: Dispatch): Partial<HeaderMenuProps> => bindActionCreators({
    closeNotification,
    postThemeConfigData,
    previewPanePageReloading,
    themeConfigReset,
    toggleViewport: viewportChange,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(HeaderMenu);
