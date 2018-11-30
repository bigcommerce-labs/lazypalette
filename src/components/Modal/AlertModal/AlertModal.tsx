import { Button } from 'pattern-lab';
import React, { PureComponent } from 'react';

import { ModalBody, ModalFooter, ModalView } from '../styles';
import Modal from '../Modal';

import { Messages } from '../constants';

interface AlertModalProps extends Partial<{
    actionText: string;
    body: string;
    title: string;
    primaryAction(): void;
}> {}

class AlertModal extends PureComponent<AlertModalProps> {
    static defaultProps: AlertModalProps = {
        actionText: Messages.Ok,
        title: Messages.AlertTitle,
    };

    render() {
        const {
            actionText,
            body,
            primaryAction,
            title,
        } = this.props;

        return (
            <Modal
                title={title}
                isTransparent={false}
            >
                <ModalView>
                    {body &&
                        <ModalBody>{body}</ModalBody>}
                    <ModalFooter>
                        <Button
                            onClick={primaryAction}
                            testId={(actionText || Messages.Ok).replace(/\s+/g, '-').toLowerCase()}
                        >
                            {actionText}
                        </Button>
                    </ModalFooter>
                </ModalView>
            </Modal>
        );
    }
}

export default AlertModal;
