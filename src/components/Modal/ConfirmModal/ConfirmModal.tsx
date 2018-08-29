import React, { PureComponent } from 'react';

import ButtonInput from '../../ButtonInput/ButtonInput';

import { ConfirmButtons, ModalBody, ModalFooter, ModalView } from '../styles';
import Modal from '../Modal';

import { Messages } from '../constants';

interface ConfirmModalProps extends Partial<{
    body: string;
    title: string;
    primaryAction(): void;
    secondaryAction(): void;
    overlayClose(): void;
}> {}

const CTAButtons = ({ primaryAction, secondaryAction }: ConfirmModalProps) => (
    <ConfirmButtons>
        <ButtonInput
            onClick={primaryAction}
            classType="primary"
            type="button"
        >
            {Messages.Cancel}
        </ButtonInput>
        <ButtonInput
            onClick={secondaryAction}
            type="button"
        >
            {Messages.Ok}
        </ButtonInput>
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
                        />
                    </ModalFooter>
                </ModalView>
            </Modal>
        );
    }
}

export default ConfirmModal;
