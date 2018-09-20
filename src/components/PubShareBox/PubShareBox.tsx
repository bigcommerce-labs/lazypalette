import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

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
    isPrelaunchStore: boolean;
    isPurchased: boolean;
    configurationId: string;
    price: number;
    themeId: string;
    variations: ThemeVariations;
    variationHistory: ThemeVariationHistory;
    variationId: string;
    onPublish(): void;
    onReset(): void;
    onSave(): void;
    onUpdate(): void;
}

interface PubShareBoxState {
    canPublish: boolean;
    canSave: boolean;
    isResetOpen: boolean;
    isPublishOpen: boolean;
    isUpdate: boolean;
}

export class PubShareBox extends PureComponent<PubShareBoxProps, PubShareBoxState> {
    readonly state: PubShareBoxState = {
        canPublish: false,
        canSave: false,
        isPublishOpen: false,
        isResetOpen: false,
        isUpdate: false,
    };

    handleModalCancel = (type: string) => {
        if (type === 'reset') {
            trackResetCancel();
            this.setState({ isResetOpen: false });
        } else {
            this.setState({ isPublishOpen: false });
        }
    };

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
        this.props.onSave();
    };

    handleReset = () => {
        trackResetConfirmation();
        this.setState({ isResetOpen: false }, () => {
            this.props.onReset();
        });
    };

    handlePublish = () => {
        trackPublish(this.props.configurationId);
        this.setState({ isPublishOpen: false}, () => {
            this.props.onPublish();
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
        const { canPublish, canSave } = this.state;

        switch (mode) {
            case Modes.ACTIVE:
                return (
                    <ActiveAction
                        isPrelaunchStore={isPrelaunchStore}
                        canPublish={canPublish}
                        canSave={canSave}
                        handleSave={this.handleSave}
                        handlePublish={isPrelaunchStore ? this.handlePublish : () => this.handleModalOpen('publish')}
                    />
                );
            case Modes.INACTIVE:
                return (
                    <InactiveAction
                        isPrelaunchStore={isPrelaunchStore}
                        canPublish={canPublish}
                        canSave={canSave}
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

    componentDidUpdate() {
        const { configurationId, initialConfigurationId, variations, variationHistory } = this.props;
        const currentVariation = variations.filter(variation => variation.isCurrent);
        let canPublish = false;
        let canSave = true;
        let isUpdate = false;

        if (variationHistory) {
            variationHistory.forEach(variation => {
                if (variation.configurationId === configurationId) {
                    canSave = false;
                    if (variation.type === 'saved' || currentVariation.length <= 0) {
                        canPublish = true;
                    }
                }

                if (variation.configurationId === initialConfigurationId && variation.type === 'upgrade') {
                    isUpdate = true;
                }
            });
        }

        if (isUpdate !== this.state.isUpdate) {
            this.setState({ isUpdate });
        }

        if (canSave !== this.state.canSave) {
            this.setState({ canSave });
        }

        if (canPublish !== this.state.canPublish) {
            this.setState({ canPublish });
        }
    }

    render() {
        const {
            isChanged,
        } = this.props;
        const {
            isPublishOpen,
            isResetOpen,
        } = this.state;

        const mode = this.getMode();

        const publishModalText = PublishModalText[mode];

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
                        primaryActionText={ResetModalText.action}
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
    isChanged: theme.isChanged,
    isPrelaunchStore: merchant.isPrelaunchStore,
    isPurchased: theme.isPurchased,
    price: theme.price,
    themeId: theme.themeId,
    variationHistory: theme.variationHistory,
    variationId: theme.variationId,
    variations: theme.variations,
});

export default connect(mapStateToProps)(PubShareBox);
