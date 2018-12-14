import { LocationDescriptor } from 'history';
import * as Vibrant from 'node-vibrant';
import CheckboxInput from 'pattern-lab/build/dist/components/CheckboxInput/CheckboxInput';
import React, { ChangeEvent, PureComponent, SFC } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, RouteComponentProps } from 'react-router-dom';
import { Dispatch } from 'redux';

import { ToastMessages, ToastType } from '../../actions/constants';
import {
    createNotification,
    NotificationsProps
} from '../../actions/notifications';
import {updateExpandableMenuPosition, Position, UpdateExpandableMenuPositionAction} from '../../actions/sideMenu';
import { loadTheme, LoadThemeResponseAction } from '../../actions/theme';
import { State } from '../../reducers/reducers';
import { ThemeVariationsEntry } from '../../reducers/theme';
import {
    trackCopyThemeCancel,
    trackCopyThemeConfirm,
    trackEditThemeFiles,
    trackEditThemeFilesCancel,
    trackEditThemeFilesConfirm,
    trackOptOut,
    trackRestoreOriginalSettings,
    trackRestoreOriginalSettingsCancel,
    trackRestoreOriginalSettingsConfirm,
} from '../../services/analytics';
import { disableStoreDesign, fetchDesignPolicyAck, postDesignPolicyAck } from '../../services/themeApi';

import Draggable from '../Draggable/Draggable';
import ExpandableMenu from '../ExpandableMenu/ExpandableMenu';
import ConfirmModal from '../Modal/ConfirmModal/ConfirmModal';
import { appRoutes } from '../Routes/Routes';

import {
    themeEditorLink,
    CopyThemeText,
    CurrentModal,
    EditThemeFilesText,
    FileEditorPath,
    MyThemesPath,
    RestoreOriginalText,
} from './constants';
import { Item, List } from './styles';

interface MoreOptionsProps extends RouteComponentProps<{}> {
    activeThemeId: string;
    canOptOut: boolean;
    configurationId: string;
    currentVariationEntry: ThemeVariationsEntry;
    isChanged: boolean;
    isPrivate: boolean;
    notifications: NotificationsProps;
    position: Position;
    storeHash: string;
    variationId: string;
    versionId: string;
    themeId: string;
    createNotification(autoDismiss: boolean, message: string, type: string): Dispatch<State>;
    loadTheme(configurationId: string, variationId: string): any;
    updateExpandableMenuPosition(expandableMenuPosition: Position): UpdateExpandableMenuPositionAction;
}

interface MoreOptionsState {
    currentModal: CurrentModal;
}

export class MoreOptions extends PureComponent<MoreOptionsProps, MoreOptionsState> {
    readonly state: MoreOptionsState = {
        currentModal: CurrentModal.NONE,
    };

    designPolicyAcknowledged: boolean = false;

    designAckChanged = (event: ChangeEvent<HTMLInputElement>) => {
        this.designPolicyAcknowledged = event.target.checked;
    };

    handleCopyThemeModalCancel = () => {
        trackCopyThemeCancel();
        this.setState({ currentModal: CurrentModal.NONE });
    };

    handleCopyThemeModalOpen = () => {
        trackEditThemeFiles('copy');
        this.setState({ currentModal: CurrentModal.COPY_THEME });
    };

    handleCopyThemeModalConfirm = () => {
        trackCopyThemeConfirm();
        this.handleCopyTheme();
    };

    handleCopyTheme = () => {
        this.setState({ currentModal: CurrentModal.NONE });
        window.location.assign(MyThemesPath);
    };

    handleEditThemeFilesModalCancel = () => {
        trackEditThemeFilesCancel();
        this.setState({ currentModal: CurrentModal.NONE });
    };

    handleEditThemeFilesModalOpen = () => {
        fetchDesignPolicyAck().then((result: { designPolicyAck: boolean }) => {
            if (!result.designPolicyAck) {
                trackEditThemeFiles('edit');
                this.setState({ currentModal: CurrentModal.EDIT_THEME_FILES });
            } else {
                trackEditThemeFiles();
                this.handleEditThemeFiles();
            }
        });
    };

    handleEditThemeFilesModalConfirm = () => {
        trackEditThemeFilesConfirm();
        this.handleEditThemeFiles();
    };

    handleEditThemeFiles = () => {
        this.setState({ currentModal: CurrentModal.NONE });

        const { configurationId, variationId, versionId } = this.props;

        postDesignPolicyAck(this.designPolicyAcknowledged).then(data => {
            window.location.assign(FileEditorPath(versionId, variationId, configurationId));
        });
    };

    handleResetModalCancel = () => {
        trackRestoreOriginalSettingsCancel();
        this.setState({ currentModal: CurrentModal.NONE });
    };

    handleResetModalOpen = () => {
        if (this.props.isChanged) {
            trackRestoreOriginalSettings('reset');
            this.setState({ currentModal: CurrentModal.RESET });
        } else {
            trackRestoreOriginalSettings();
            this.handleReset();
        }
    };

    handleResetModalConfirm = () => {
        trackRestoreOriginalSettingsConfirm();
        this.handleReset();
    };

    handleReset = () => {
        const { currentVariationEntry, variationId } = this.props;
        const defaultConfigurationId = currentVariationEntry ? currentVariationEntry.defaultConfigurationId : '';

        this.setState({ currentModal: CurrentModal.NONE }, () => {
            this.props.loadTheme(variationId, defaultConfigurationId)
                .then((result: LoadThemeResponseAction) => {
                    if (result.error) {
                        this.props.createNotification(true, ToastMessages.ErrorReset, ToastType.Error);
                    } else {
                        this.props.createNotification(true, ToastMessages.Reset, ToastType.Success);
                    }
                });
        });
    };

    handleOptOut = () => {
        const { configurationId, variationId, versionId } = this.props;
        this.setState({ currentModal: CurrentModal.NONE}, () => {
            trackOptOut();
            disableStoreDesign(this.props.storeHash)
                .then(() => {
                    const { protocol, hostname } = window.location;
                    window.location.assign(
                        `${protocol}//${hostname}/${themeEditorLink(versionId, variationId, configurationId)}`
                    );
                })
                .catch(() => {
                    this.props.createNotification(true, ToastMessages.ErrorSwitchToThemeEditor, ToastType.Error);
                });
        });
    };

    getColorsFromImage = () => {
        window.console.log('get the colors');
        // const image = new Image();
        // image.src = 'data:image/gif;base64,R0lGODlhEAAQAOZZAABdAJlmAP//////AAAzmciTANGeAP/2AABgyP/lAABJAABIAABiyf';
        const image = 'https://i.imgur.com/2S7dWHD.jpg';
        Vibrant.from(image).getSwatches().then((swatches: any) => {
            for (const swatch in swatches) {
                if (swatches.hasOwnProperty(swatch) && swatches[swatch]) {
                    window.console.log(swatch, swatches[swatch].getHex());
                }
            }
        });
    };

    render() {
        const {
            activeThemeId,
            canOptOut,
            isPrivate,
            location,
            match,
            position,
            themeId,
        } = this.props;
        const { currentModal } = this.state;

        const isActive = activeThemeId === themeId;

        const locationDesciptor: LocationDescriptor = {
            pathname: match.url,
            search: location.search,
        };

        return (
            <>
                <Draggable position={position}>
                    <ExpandableMenu
                        title="More Options"
                        back={locationDesciptor}
                        updatePosition={this.props.updateExpandableMenuPosition}
                    >
                        <List>
                            {canOptOut &&
                                <Item
                                    data-test-id="switch-to-theme-editor"
                                    onClick={this.handleOptOut}
                                >
                                    Switch to old Theme Editor
                                </Item>
                            }
                            <Item
                                data-test-id="edit-theme-files"
                                onClick={isPrivate
                                    ? this.handleEditThemeFilesModalOpen
                                    : this.handleCopyThemeModalOpen}
                            >
                                Edit Theme Files
                            </Item>
                            <Item
                                data-test-id="restore-original"
                                onClick={this.handleResetModalOpen}
                            >
                                Restore original theme styles
                            </Item>
                            <Item
                                data-test-id="get-colors-from-image"
                                onClick={this.getColorsFromImage}
                            >
                                Get colors from image
                            </Item>
                        </List>
                    </ExpandableMenu>
                </Draggable>

                {currentModal === CurrentModal.COPY_THEME &&
                    <ConfirmModal
                        primaryAction={this.handleCopyThemeModalConfirm}
                        primaryActionText={CopyThemeText.action}
                        secondaryAction={this.handleCopyThemeModalCancel}
                        overlayClose={this.handleCopyThemeModalCancel}
                        title={CopyThemeText.title}
                    >
                        {CopyThemeText.body}
                    </ConfirmModal>
                }

                {currentModal === CurrentModal.EDIT_THEME_FILES &&
                    <ConfirmModal
                        primaryAction={this.handleEditThemeFilesModalConfirm}
                        primaryActionText={EditThemeFilesText.action}
                        secondaryAction={this.handleEditThemeFilesModalCancel}
                        overlayClose={this.handleEditThemeFilesModalCancel}
                        title={EditThemeFilesText.title}
                    >
                        <>
                            {isActive ? EditThemeFilesText.bodyActive : EditThemeFilesText.bodyInactive}
                            <CheckboxInput
                                onChange={this.designAckChanged}
                                label="Do not show me again"
                            />
                        </>
                    </ConfirmModal>
                }

                {currentModal === CurrentModal.RESET &&
                    <ConfirmModal
                        primaryAction={this.handleResetModalConfirm}
                        primaryActionText={RestoreOriginalText.action}
                        secondaryAction={this.handleResetModalCancel}
                        overlayClose={this.handleResetModalCancel}
                        title={RestoreOriginalText.title}
                    >
                        {RestoreOriginalText.body}
                    </ConfirmModal>
                }
            </>
        );
    }
}

const RoutedMoreOptions: SFC<MoreOptionsProps> = props => (
    <Route
        path={appRoutes.options.path}
        exact
        render={() => <MoreOptions {...props}/>}
    />
);

const mapStateToProps = (state: State) => ({
    activeThemeId: state.merchant.activeThemeId,
    canOptOut: state.merchant.canOptOut,
    configurationId: state.theme.configurationId,
    currentVariationEntry: state.theme.variations
        .filter(variationEntry => variationEntry.id === state.theme.variationId)[0],
    isChanged: state.theme.isChanged,
    isPrivate: state.theme.isPrivate,
    notifications: state.notifications,
    position: state.sideMenu.expandableMenuPosition,
    storeHash: state.merchant.storeHash,
    themeId: state.theme.themeId,
    variationId: state.theme.variationId,
    versionId: state.theme.versionId,
});

const mapDispatchToProps = {
    createNotification,
    loadTheme,
    updateExpandableMenuPosition,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RoutedMoreOptions));
