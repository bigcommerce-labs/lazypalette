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
} from '../../services/analytics';

import ButtonInput from '../ButtonInput/ButtonInput';
import ConfirmModal from '../Modal/ConfirmModal/ConfirmModal';

import { Modes, PublishModalText, ResetModalText } from './constants';
import { ButtonWrapper, Container } from './styles';
import ActiveAction from './ActiveAction/ActiveAction';
import InactiveAction from './InactiveAction/InactiveAction';
import PreviewAction from './PreviewAction/PreviewAction';

interface PubShareBoxProps {
    isChanged: boolean;
    isCurrent: boolean;
    isPrelaunchStore: boolean;
    isPurchased: boolean;
    configurationId: string;
    price: number;
    variations: ThemeVariations;
    variationHistory: ThemeVariationHistory;
    variationId: string;
    onPublish(): void;
    onReset(): void;
    onSave(): void;
}

interface PubShareBoxState {
    canPublish: boolean;
    canSave: boolean;
    isResetOpen: boolean;
    isPublishOpen: boolean;
}

export class PubShareBox extends PureComponent<PubShareBoxProps, PubShareBoxState> {
    readonly state: PubShareBoxState = {
        canPublish: false,
        canSave: false,
        isPublishOpen: false,
        isResetOpen: false,
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
            default:
                return null;
        }
    };

    getMode() {
        const { isCurrent, isPurchased, price } = this.props;

        if (isPurchased) {
            if (isCurrent) {
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
        const { variations, variationHistory, configurationId } = this.props;
        const currentVariation = variations.filter(variation => variation.isCurrent);
        let canPublish = false;
        let canSave = true;
        if (variationHistory) {
            variationHistory.forEach(variation => {
                if (variation.configurationId === configurationId) {
                    canSave = false;
                    if (variation.type === 'saved' || currentVariation.length <= 0) {
                        canPublish = true;
                    }
                }
            });
        }

        if (canSave !== this.state.canSave) {
            this.setState({canSave});
        }

        if (canPublish !== this.state.canPublish) {
            this.setState({canPublish});
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
                        body={ResetModalText.body}
                        primaryAction={this.handleReset}
                        primaryActionText={ResetModalText.action}
                        secondaryAction={() => this.handleModalCancel('reset')}
                        overlayClose={this.overlayClose}
                        title={ResetModalText.title}
                    />
                }

                {isPublishOpen &&
                  <ConfirmModal
                      body={publishModalText.body}
                      primaryAction={this.handlePublish}
                      primaryActionText={publishModalText.action}
                      secondaryAction={() => this.handleModalCancel('publish')}
                      overlayClose={this.overlayClose}
                      title={publishModalText.title}
                  />
                }
            </Container>
        );
    }
}

const mapStateToProps = ({ theme, merchant }: State) => ({
    configurationId: theme.configurationId,
    isChanged: theme.isChanged,
    isCurrent: merchant.isCurrent,
    isPrelaunchStore: merchant.isPrelaunchStore,
    isPurchased: theme.isPurchased,
    price: theme.price,
    variationHistory: theme.variationHistory,
    variationId: theme.variationId,
    variations: theme.variations,
});

export default connect(mapStateToProps)(PubShareBox);
