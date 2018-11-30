import { Button, ButtonStyles } from 'pattern-lab';
import React, { PureComponent } from 'react';

import { ConfirmButton, ConfirmButtons, ModalBody, ModalFooter, ModalView } from '../styles';
import Modal from '../Modal';

import { Messages } from '../constants';

interface ConfirmModalProps extends Partial<{
    title: string;
    primaryActionText?: string;
    primaryActionTestId?: string;
    primaryAction(): void;
    secondaryAction(): void;
    overlayClose(): void;
}> {}

const CTAButtons = ({
    primaryAction,
    primaryActionTestId,
    primaryActionText = Messages.Ok,
    secondaryAction,
}: ConfirmModalProps) => (
    <ConfirmButtons>
        <ConfirmButton>
            <Button
                buttonStyle={ButtonStyles.Outlined}
                onClick={secondaryAction}
                testId="cancel"
            >
                {Messages.Cancel}
            </Button>
        </ConfirmButton>
        <ConfirmButton>
            <Button
                onClick={primaryAction}
                testId={ primaryActionTestId
                    ? primaryActionTestId
                    : primaryActionText.replace(/\s+/g, '-').toLowerCase()}
            >
                {primaryActionText}
            </Button>
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
            primaryActionTestId,
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
                            primaryActionTestId={primaryActionTestId}
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
