import React, { PureComponent } from 'react';

import ButtonInput from '../../ButtonInput/ButtonInput';

import { ConfirmButton, ConfirmButtons, ModalBody, ModalFooter, ModalView } from '../styles';
import Modal from '../Modal';

import { Messages } from '../constants';

interface ConfirmModalProps extends Partial<{
    body: string;
    title: string;
    secondaryActionText?: string;
    primaryAction(): void;
    secondaryAction(): void;
    overlayClose(): void;
}> {}

const CTAButtons = ({ primaryAction, secondaryAction, secondaryActionText }: ConfirmModalProps) => (
    <ConfirmButtons>
        <ConfirmButton>
            <ButtonInput
                onClick={primaryAction}
                classType="primary"
                type="button"
            >
                {Messages.Cancel}
            </ButtonInput>
        </ConfirmButton>
        <ConfirmButton>
            <ButtonInput
                onClick={secondaryAction}
                type="button"
            >
                {secondaryActionText}
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
            body,
            primaryAction,
            secondaryAction,
            secondaryActionText = Messages.Ok,
            overlayClose,
            title,
        } = this.props;

        return (
            <Modal
                onClose={primaryAction}
                overlayClose={overlayClose}
                title={title}
                isTransparent={false}
            >
                <ModalView>
                    {body &&
                        <ModalBody>{body}</ModalBody>}
                    <ModalFooter>
                        <CTAButtons
                            primaryAction={primaryAction}
                            secondaryAction={secondaryAction}
                            secondaryActionText={secondaryActionText}
                        />
                    </ModalFooter>
                </ModalView>
            </Modal>
        );
    }
}

export default ConfirmModal;
