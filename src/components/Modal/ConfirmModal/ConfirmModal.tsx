import React, { PureComponent } from 'react';

import ButtonInput from '../../ButtonInput/ButtonInput';

import { ConfirmButton, ConfirmButtons, ModalBody, ModalFooter, ModalView } from '../styles';
import Modal from '../Modal';

import { Messages } from '../constants';

interface ConfirmModalProps extends Partial<{
    title: string;
    primaryActionText?: string;
    primaryAction(): void;
    secondaryAction(): void;
    overlayClose(): void;
}> {}

const CTAButtons = ({ primaryAction, primaryActionText = Messages.Ok, secondaryAction }: ConfirmModalProps) => (
    <ConfirmButtons>
        <ConfirmButton>
            <ButtonInput
                onClick={secondaryAction}
                type="button"
                testId="cancel"
            >
                {Messages.Cancel}
            </ButtonInput>
        </ConfirmButton>
        <ConfirmButton>
            <ButtonInput
                classType="primary"
                onClick={primaryAction}
                type="button"
                testId={primaryActionText.replace(/\s+/g, '-').toLowerCase()}
            >
                {primaryActionText}
            </ButtonInput>
        </ConfirmButton>
    </ConfirmButtons>
);

class ConfirmModal extends PureComponent<ConfirmModalProps> {
    static defaultProps: ConfirmModalProps = {
        title: Messages.ConfirmTitle,
    };

    render() {
        const {
            children,
            primaryAction,
            secondaryAction,
            primaryActionText = Messages.Ok,
            overlayClose,
            title,
        } = this.props;

        return (
            <Modal
                onClose={secondaryAction}
                overlayClose={overlayClose}
                title={title}
                isTransparent={false}
            >
                <ModalView>
                    <ModalBody>{children}</ModalBody>
                    <ModalFooter>
                        <CTAButtons
                            primaryAction={primaryAction}
                            primaryActionText={primaryActionText}
                            secondaryAction={secondaryAction}
                        />
                    </ModalFooter>
                </ModalView>
            </Modal>
        );
    }
}

export default ConfirmModal;
