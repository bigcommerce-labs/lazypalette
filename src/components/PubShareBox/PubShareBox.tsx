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

import { Messages } from './constants';
import { Container } from './styles';
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
            isCurrent,
            isPrelaunchStore,
            isPurchased,
            price,
            variationId,
        } = this.props;
        const {
            canPublish,
            isPublishOpen,
            isResetOpen,
            canSave,
        } = this.state;

        return (
            <Container isChanged={isChanged}>
                {isChanged &&
                    <ButtonInput
                        border={false}
                        onClick={() => this.handleModalOpen('reset')}
                        type="button"
                        testId="undo-changes"
                    >
                        Undo Changes
                    </ButtonInput>
                }
                {isPurchased &&
                    (isCurrent ?
                        <ActiveAction
                            isPrelaunchStore={isPrelaunchStore}
                            canPublish={canPublish}
                            canSave={canSave}
                            handleSave={this.handleSave}
                            handlePublish={() => this.handleModalOpen('publish')}
                        /> :
                        <InactiveAction
                            isPrelaunchStore={isPrelaunchStore}
                            canPublish={canPublish}
                            canSave={canSave}
                            handleSave={this.handleSave}
                            handlePublish={() => this.handleModalOpen('publish')}
                        />
                    )
                }
                {!isPurchased && price !== undefined &&
                    <PreviewAction
                        price={price}
                        variationId={variationId}
                    />
                }
                {isResetOpen &&
                    <ConfirmModal
                        body={Messages.Reset}
                        primaryAction={() => this.handleModalCancel('reset')}
                        secondaryAction={this.handleReset}
                        overlayClose={this.overlayClose}
                        title="Reset Warning"
                    />
                }

                {isPublishOpen &&
                  <ConfirmModal
                      body={Messages.Publish}
                      secondaryActionText="Publish"
                      primaryAction={() => this.handleModalCancel('publish')}
                      secondaryAction={this.handlePublish}
                      overlayClose={this.overlayClose}
                      title="Publish changes"
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
