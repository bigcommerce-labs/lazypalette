import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { State } from '../../reducers/reducers';
import { ThemeVariations, ThemeVariationHistory } from '../../reducers/theme';
import {
    trackResetCancel,
    trackResetClick,
    trackResetConfirmation,
    trackResetModalClose,
    trackSave,
} from '../../services/analytics';

import ButtonInput from '../ButtonInput/ButtonInput';
import { Messages } from '../Modal/constants';
import ConfirmModal from '../Modal/ConfirmModal';

import { Container } from './styles';

interface PubShareBoxProps {
    isChanged: boolean;
    configurationId: string;
    variations: ThemeVariations;
    variationHistory: ThemeVariationHistory;
    onPublish(): void;
    onReset(): void;
    onSave(): void;
}

interface PubShareBoxState {
    canPublish: boolean;
    canSave: boolean;
    isResetOpen: boolean;
}

export class PubShareBox extends PureComponent<PubShareBoxProps, PubShareBoxState> {
    readonly state: PubShareBoxState = {
        canPublish: false,
        canSave: false,
        isResetOpen: false,
    };

    handleModalCancel = () => {
        trackResetCancel();
        this.setState({ isResetOpen: false });
    };

    handleModalOpen = () => {
        trackResetClick();
        this.setState({ isResetOpen: true });
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
        const { isChanged, onPublish } = this.props;
        const { canPublish, isResetOpen, canSave } = this.state;

        return (
            <Container isChanged={isChanged}>
                {isChanged &&
                    <ButtonInput
                        border={false}
                        onClick={this.handleModalOpen}
                        type="button"
                        testId="undo-changes"
                    >
                        Undo Changes
                    </ButtonInput>
                }
                <ButtonInput
                    onClick={this.handleSave}
                    type="button"
                    testId="save"
                    disabled={!canSave}
                >
                    Save
                </ButtonInput>
                <ButtonInput
                    onClick={onPublish}
                    classType="primary"
                    disabled={!canPublish}
                    testId="publish"
                >
                    Publish
                </ButtonInput>
                {isResetOpen &&
                    <ConfirmModal
                        body={Messages.Reset}
                        primaryAction={this.handleModalCancel}
                        secondaryAction={this.handleReset}
                        overlayClose={this.overlayClose}
                        title="Reset Warning"
                    />
                }
            </Container>
        );
    }
}

const mapStateToProps = ({ theme }: State) => ({
    configurationId: theme.configurationId,
    isChanged: theme.isChanged,
    variationHistory: theme.variationHistory,
    variations: theme.variations,
});

export default connect(mapStateToProps)(PubShareBox);
