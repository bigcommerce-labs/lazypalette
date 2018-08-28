import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { State } from '../../reducers/reducers';
import { ThemeVariations } from '../../reducers/theme';
import {
    trackResetCancel,
    trackResetClick,
    trackResetConfirmation,
    trackResetModalClose,
    trackSave,
} from '../../services/analytics';

import ButtonInput from '../ButtonInput/ButtonInput';
import { Messages } from '../Modal/constants';
import ConfirmModal from '../Modal/ConfirmModal/ConfirmModal';

import { Container } from './styles';

interface PubShareBoxProps {
    isChanged: boolean;
    variations: ThemeVariations;
    onPublish(): void;
    onReset(): void;
    onSave(): void;
}

interface PubShareBoxState {
    canPublish: boolean;
    isResetOpen: boolean;
}

export class PubShareBox extends PureComponent<PubShareBoxProps, PubShareBoxState> {
    readonly state: PubShareBoxState = {
        canPublish: false,
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
        const { isChanged, variations } = this.props;
        const currentVariation = variations.filter(variation => variation.isCurrent);
        const canPublish = currentVariation.length ? isChanged : variations.length > 0;

        if (canPublish !== this.state.canPublish) {
            this.setState({canPublish});
        }
    }

    render() {
        const { isChanged, onPublish } = this.props;
        const { canPublish, isResetOpen } = this.state;

        return (
            <Container isChanged={isChanged}>
                {isChanged &&
                    <ButtonInput
                        border={false}
                        onClick={this.handleModalOpen}
                        type="button"
                    >
                        Undo Changes
                    </ButtonInput>
                }
                <ButtonInput
                    onClick={this.handleSave}
                    type="button"
                >
                    Save
                </ButtonInput>
                <ButtonInput
                    onClick={onPublish}
                    classType="primary"
                    disabled={!canPublish}
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
    variations: theme.variations,
});

export default connect(mapStateToProps)(PubShareBox);
