import React, { PureComponent } from 'react';

import ButtonInput from '../ButtonInput/ButtonInput';

import { Confirm, ConfirmBody, ConfirmButtons, ConfirmFooter } from './styles';
import Modal from './Modal';

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
            Cancel
        </ButtonInput>
        <ButtonInput
            onClick={secondaryAction}
            type="button"
        >
            OK
        </ButtonInput>
    </ConfirmButtons>
);

class ConfirmModal extends PureComponent<ConfirmModalProps> {
    static defaultProps: ConfirmModalProps = {
        title: 'Please Confirm:',
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
                <Confirm>
                    {body &&
                        <ConfirmBody>{body}</ConfirmBody>}
                    <ConfirmFooter>
                        <CTAButtons
                            primaryAction={primaryAction}
                            secondaryAction={secondaryAction}
                        />
                    </ConfirmFooter>
                </Confirm>
            </Modal>
        );
    }
}

export default ConfirmModal;
