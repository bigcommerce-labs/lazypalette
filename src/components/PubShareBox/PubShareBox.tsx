import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { SettingsType } from '../../actions/theme';
import { State } from '../../reducers/reducers';
import { ThemeVariations, ThemeVariationHistory } from '../../reducers/theme';
import {
    trackPublish,
    trackResetCancel,
    trackResetClick,
    trackResetConfirmation,
    trackResetModalClose,
    trackSave,
    trackUpdate,
} from '../../services/analytics';

import ButtonInput from '../ButtonInput/ButtonInput';
import ConfirmModal from '../Modal/ConfirmModal/ConfirmModal';

import { Modes, PublishModalText, ResetModalText } from './constants';
import { ButtonWrapper, Container } from './styles';
import ActiveAction from './ActiveAction/ActiveAction';
import InactiveAction from './InactiveAction/InactiveAction';
import PreviewAction from './PreviewAction/PreviewAction';
import UpdateAction from './UpdateAction/UpdateAction';

interface PubShareBoxProps {
    activeThemeId: string;
    initialConfigurationId: string;
    isChanged: boolean;
    initialSettings: SettingsType;
    isPrelaunchStore: boolean;
    isPurchased: boolean;
    configurationId: string;
    price: number;
    settings: SettingsType;
    themeId: string;
    variations: ThemeVariations;
    variationHistory: ThemeVariationHistory;
    variationId: string;
    onPublish(): any;
    onReset(): void;
    onSave(): any;
    onUpdate(): void;
}

interface PubShareBoxState {
    isResetOpen: boolean;
    isPublishOpen: boolean;
    isUpdate: boolean;
    loading: boolean;
}

export class PubShareBox extends PureComponent<PubShareBoxProps, PubShareBoxState> {
    readonly state: PubShareBoxState = {
        isPublishOpen: false,
        isResetOpen: false,
        isUpdate: false,
        loading: false,
    };

    handleModalCancel = (type: string) => {
        if (type === 'reset') {
            trackResetCancel();
            this.setState({ isResetOpen: false });
        } else {
            this.setState({ isPublishOpen: false });
        }
    };

    getChangeCount(initialSettings: SettingsType, settings: SettingsType) {
        return Object
            .keys(settings)
            .filter(key => settings[key] !== initialSettings[key])
            .length;
    }

    handleModalOpen = (type: string) => {
        if (type === 'reset') {
            trackResetClick();
            this.setState({ isResetOpen: true });
        } else {
            this.setState({ isPublishOpen: true });
        }
    };

    overlayClose = () => {
        trackResetModalClose();
        this.setState({ isResetOpen: false });
    };

    handleSave = () => {
        trackSave();
        this.setState({ loading: true }, () => {
            this.props.onSave()
                .then(() => this.setState({ loading: false }));
        });
    };

    handleReset = () => {
        trackResetConfirmation();
        this.setState({ isResetOpen: false }, () => {
            this.props.onReset();
        });
    };

    handlePublish = () => {
        trackPublish(this.props.configurationId);
        this.setState({
            isPublishOpen: false,
            loading: true,
        }, () => {
            this.props.onPublish()
                .then(() => this.setState({ loading: false }));
        });
    };

    handleUpdate = () => {
        trackUpdate();
        this.setState({ isPublishOpen: false}, () => {
            this.props.onUpdate();
        });
    };

    getActions = (mode: Modes) => {
        const { isPrelaunchStore, price, variationId } = this.props;
        const { loading } = this.state;

        switch (mode) {
            case Modes.ACTIVE:
                return (
                    <ActiveAction
                        isPrelaunchStore={isPrelaunchStore}
                        loading={loading}
                        handleSave={this.handleSave}
                        handlePublish={isPrelaunchStore ? this.handlePublish : () => this.handleModalOpen('publish')}
                    />
                );
            case Modes.INACTIVE:
                return (
                    <InactiveAction
                        isPrelaunchStore={isPrelaunchStore}
                        loading={loading}
                        handleSave={this.handleSave}
                        handlePublish={() => this.handleModalOpen('publish')}
                    />
                );
            case Modes.PREVIEW:
                return (
                    <PreviewAction
                        price={price}
                        variationId={variationId}
                    />
                );
            case Modes.UPDATE:
                return (
                    <UpdateAction
                        handlePublish={() => this.handleModalOpen('publish')}
                    />
                );
            default:
                return null;
        }
    };

    getMode() {
        const { activeThemeId, isPurchased, price, themeId } = this.props;

        if (this.state.isUpdate) {
            return Modes.UPDATE;
        }
        if (isPurchased) {
            if (activeThemeId === themeId) {
                return Modes.ACTIVE;
            } else {
                return Modes.INACTIVE;
            }
        } else if (price !== undefined) {
            return Modes.PREVIEW;
        }

        return Modes.UNKNOWN;
    }

    getPublishModalText(mode: Modes) {
        const { isPrelaunchStore } = this.props;
        if (mode === Modes.INACTIVE) {
            return isPrelaunchStore ? PublishModalText[mode].prelaunch : PublishModalText[mode].launched;
        } else {
            return PublishModalText[mode];
        }
    }

    componentDidUpdate() {
        const { initialConfigurationId, variationHistory } = this.props;
        let isUpdate = false;

        if (variationHistory) {
            variationHistory.forEach(variation => {
                if (variation.configurationId === initialConfigurationId && variation.type === 'upgrade') {
                    isUpdate = true;
                }
            });
        }

        if (isUpdate !== this.state.isUpdate) {
            this.setState({ isUpdate });
        }
    }

    render() {
        const {
            isChanged,
            initialSettings,
            settings,
        } = this.props;
        const {
            isPublishOpen,
            isResetOpen,
        } = this.state;

        const mode = this.getMode();
        const publishModalText = this.getPublishModalText(mode);
        const changesCount = this.getChangeCount(initialSettings, settings);

        return (
            <Container isChanged={isChanged}>
                {isChanged &&
                    <ButtonWrapper>
                        <ButtonInput
                            border={false}
                            onClick={() => this.handleModalOpen('reset')}
                            type="button"
                            testId="undo-changes"
                        >
                            Undo Changes
                        </ButtonInput>
                    </ButtonWrapper>
                }
                {this.getActions(mode)}
                {isResetOpen &&
                    <ConfirmModal
                        primaryAction={this.handleReset}
                        primaryActionTestId={ResetModalText.actionTestId}
                        primaryActionText={ResetModalText.action(changesCount)}
                        secondaryAction={() => this.handleModalCancel('reset')}
                        overlayClose={this.overlayClose}
                        title={ResetModalText.title}
                    >
                        {ResetModalText.body}
                    </ConfirmModal>
                }

                {isPublishOpen &&
                  <ConfirmModal
                      primaryAction={mode === Modes.UPDATE ? this.handleUpdate : this.handlePublish}
                      primaryActionText={publishModalText.action}
                      secondaryAction={() => this.handleModalCancel('publish')}
                      overlayClose={this.overlayClose}
                      title={publishModalText.title}
                  >
                      {publishModalText.body}
                  </ConfirmModal>
                }
            </Container>
        );
    }
}

const mapStateToProps = ({ theme, merchant }: State) => ({
    activeThemeId: merchant.activeThemeId,
    configurationId: theme.configurationId,
    initialConfigurationId: theme.initialConfigurationId,
    initialSettings: theme.initialSettings,
    isChanged: theme.isChanged,
    isPrelaunchStore: merchant.isPrelaunchStore,
    isPurchased: theme.isPurchased,
    price: theme.price,
    settings: theme.settings,
    themeId: theme.themeId,
    variationHistory: theme.variationHistory,
    variationId: theme.variationId,
    variations: theme.variations,
});

export default connect(mapStateToProps)(PubShareBox);
