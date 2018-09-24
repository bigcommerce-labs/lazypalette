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
import { loadTheme } from '../../actions/theme';
import { State } from '../../reducers/reducers';
import { ThemeVariationsEntry } from '../../reducers/theme';
import { fetchDesignPolicyAck, postDesignPolicyAck } from '../../services/themeApi';

import Draggable from '../Draggable/Draggable';
import ExpandableMenu from '../ExpandableMenu/ExpandableMenu';
import ConfirmModal from '../Modal/ConfirmModal/ConfirmModal';
import { appRoutes } from '../Routes/Routes';

import {
    CopyThemeText,
    CurrentModal,
    EditThemeFilesText,
    FileEditorPath,
    MyThemesPath,
    RestoreOriginalText
} from './constants';
import { Item, List } from './styles';

interface MoreOptionsProps extends RouteComponentProps<{}> {
    activeThemeId: string;
    configurationId: string;
    currentVariationEntry: ThemeVariationsEntry;
    isChanged: boolean;
    isPrivate: boolean;
    notifications: NotificationsProps;
    position: { x: number, y: number };
    variationId: string;
    versionId: string;
    themeId: string;
    createNotification(autoDismiss: boolean, message: string, type: string): Dispatch<State>;
    loadTheme(configurationId: string, variationId: string): any;
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
        this.setState({ currentModal: CurrentModal.NONE });
    };

    handleCopyThemeModalOpen = () => {
        this.setState({ currentModal: CurrentModal.COPY_THEME });
    };

    handleCopyTheme = () => {
        this.setState({ currentModal: CurrentModal.NONE });

        window.location.assign(MyThemesPath);
    };

    handleEditThemeFilesModalCancel = () => {
        this.setState({ currentModal: CurrentModal.NONE });
    };

    handleEditThemeFilesModalOpen = () => {
        fetchDesignPolicyAck().then((result: { designPolicyAck: boolean }) => {
            if (!result.designPolicyAck) {
                this.setState({ currentModal: CurrentModal.EDIT_THEME_FILES });
            } else {
                this.handleEditThemeFiles();
            }
        });
    };

    handleEditThemeFiles = () => {
        this.setState({ currentModal: CurrentModal.NONE });

        const { configurationId, variationId, versionId } = this.props;

        postDesignPolicyAck(this.designPolicyAcknowledged).then(data => {
            window.location.assign(FileEditorPath(versionId, variationId, configurationId));
        });
    };

    handleResetModalCancel = () => {
        this.setState({ currentModal: CurrentModal.NONE });
    };

    handleResetModalOpen = () => {
        if (this.props.isChanged) {
            this.setState({ currentModal: CurrentModal.RESET });
        } else {
            this.handleReset();
        }
    };

    handleReset = () => {
        const { currentVariationEntry, variationId } = this.props;
        const defaultConfigurationId = currentVariationEntry ? currentVariationEntry.defaultConfigurationId : '';
        this.setState({ currentModal: CurrentModal.NONE }, () => {
            this.props.loadTheme(variationId, defaultConfigurationId)
                .then(() => this.props.createNotification(true, ToastMessages.Reset, ToastType.Success));
        });
    };

    render() {
        const { activeThemeId, isPrivate, match, position, themeId } = this.props;
        const { currentModal } = this.state;

        const isActive = activeThemeId === themeId;

        return (
            <>
                <Draggable position={position}>
                    <ExpandableMenu title="More Options" back={match.url}>
                        <List>
                            <Item data-test-id="go-to-te">Go to old Theme Editor</Item>
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
                        </List>
                    </ExpandableMenu>
                </Draggable>

                {currentModal === CurrentModal.COPY_THEME &&
                    <ConfirmModal
                        primaryAction={this.handleCopyTheme}
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
                        primaryAction={this.handleEditThemeFiles}
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
                        primaryAction={this.handleReset}
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
    configurationId: state.theme.configurationId,
    currentVariationEntry: state.theme.variations
        .filter(variationEntry => variationEntry.id === state.theme.variationId)[0],
    isChanged: state.theme.isChanged,
    isPrivate: state.theme.isPrivate,
    notifications: state.notifications,
    themeId: state.theme.themeId,
    variationId: state.theme.variationId,
    versionId: state.theme.versionId,
});

const mapDispatchToProps = {
    createNotification,
    loadTheme,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RoutedMoreOptions));
