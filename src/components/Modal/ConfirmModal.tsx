import React, { PureComponent } from 'react';

import ButtonInput from '../ButtonInput/ButtonInput';

import { Confirm, ConfirmBody, ConfirmButtons, ConfirmFooter } from './styles';
import Modal from './Modal';

interface ConfirmModalProps extends Partial<{
    body: string;
    title: string;
    onClose(): void;
    secondaryAction(): void;
}> {}

class ConfirmModal extends PureComponent<ConfirmModalProps> {
    static defaultProps: ConfirmModalProps = {
        title: 'Please Confirm:',
    };

    render() {
        const {
            body,
            onClose,
            secondaryAction,
            title,
        } = this.props;

        return (
            <Modal
                onClose={onClose}
                title={title}
                isTransparent={false}
            >
                <Confirm>
                    <ConfirmBody>{body}</ConfirmBody>
                    <ConfirmFooter>
                        <ConfirmButtons>
                            <ButtonInput
                                onClick={onClose}
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
                    </ConfirmFooter>
                </Confirm>
            </Modal>
        );
    }
}

export default ConfirmModal;
