import React, { PureComponent } from 'react';
import { connect, Dispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

import { ConfigUpdateAction } from '../../actions/constants';
import { closeNotification, CloseNotificationAction, NotificationsProps } from '../../actions/notifications';
import { previewPanePageReloading, viewportChange, ViewportChange } from '../../actions/previewPane';
import { postApplyUpdate, postThemeConfigData, themeConfigReset } from '../../actions/theme';
import { State } from '../../reducers/reducers';
import { trackViewportChange } from '../../services/analytics';

import { VIEWPORT_TYPES } from '../PreviewPane/constants';
import { ViewportType } from '../PreviewPane/PreviewPane';
import PubShareBox from '../PubShareBox/PubShareBox';
import Toast from '../Toast/Toast';

import { StyledHeaderMenu, StyledPreviewItem, ViewportIcons } from './styles';
import HeaderMenuLogo from './HeaderMenuLogo';

interface HeaderMenuProps {
    configurationId: string;
    displayVersion: string;
    isRotated: boolean;
    notifications: NotificationsProps;
    themeName: string;
    variationName: string;
    viewportType: ViewportType;
    closeNotification(): CloseNotificationAction;
    postApplyUpdate(): void;
    postThemeConfigData(configDataOption: ConfigUpdateAction, forceReload: boolean): void;
    previewPanePageReloading(): void;
    themeConfigReset(): void;
    toggleViewport(payload: ViewportChange): void;
}

class HeaderMenu extends PureComponent<HeaderMenuProps> {
    handlePublish = () => this.props.postThemeConfigData(ConfigUpdateAction.PUBLISH, false);

    handleSave = () => this.props.postThemeConfigData(ConfigUpdateAction.SAVE, false);

    handleReset = () => {
        this.props.themeConfigReset();

        // The user may have made structural changes to the page, these require a force reload of the preview pane.
        // TODO: We should only need to call this when the user has made structural changes, for now we will call it
        // regardless of the type of config change, we can give better undo performance by making this smarter.
        this.props.previewPanePageReloading();
    };

    handleUpdate = () => this.props.postApplyUpdate();

    handleIconClick = (view: string) => () => {
        const { isRotated, toggleViewport, viewportType } = this.props;
        const args: ViewportChange = { viewportType: VIEWPORT_TYPES[view] };

        if (VIEWPORT_TYPES[view] !== VIEWPORT_TYPES.DESKTOP) {
            args.isRotated = viewportType === VIEWPORT_TYPES[view] ? !isRotated : isRotated;
        }

        trackViewportChange(view, !!args.isRotated);
        toggleViewport(args);

    };

    handleToastClose = () => this.props.closeNotification();

    render() {
        const { isRotated, notifications, viewportType } = this.props;
        const { autoDismiss, message, type } = notifications;
        const [DESKTOP, MOBILE, TABLET] = Object.keys(VIEWPORT_TYPES);
        const viewportKeys = [DESKTOP, TABLET, MOBILE];

        return (
            <StyledHeaderMenu>
                <HeaderMenuLogo />
                <ViewportIcons>
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
                </ViewportIcons>
                <PubShareBox
                    onPublish={this.handlePublish}
                    onSave={this.handleSave}
                    onReset={this.handleReset}
                    onUpdate={this.handleUpdate}
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
    postApplyUpdate,
    postThemeConfigData,
    previewPanePageReloading,
    themeConfigReset,
    toggleViewport: viewportChange,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(HeaderMenu);
