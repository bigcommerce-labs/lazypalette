import { theme, Icon } from 'pattern-lab';
import React, { MouseEvent, MouseEventHandler, PureComponent } from 'react';

import { CloseIcon, Container, Message, ToastBox } from './styles';

interface ToastProps extends Partial<{
    autoDismiss: boolean;
    type: string;
    children: JSX.Element | string;
    onClose: MouseEventHandler<HTMLDivElement>;
}> {}

class Toast extends PureComponent<ToastProps> {
    static defaultProps: ToastProps = {
        autoDismiss: true,
    };

    handleClose = (event: MouseEvent<HTMLDivElement>) => {
        if (this.props.onClose) {
            this.props.onClose(event);
        }
    };

    render() {
        const { autoDismiss, type, children } = this.props;

        return (
            <Container autoDismiss={autoDismiss}>
                <ToastBox type={type}>
                    <Message>{children}</Message>
                    <CloseIcon onClick={this.handleClose}>
                        <Icon
                            glyph="closeX"
                            primaryColor={theme.colors.background}
                            size="small"
                        />
                    </CloseIcon>
                </ToastBox>
            </Container>
        );
    }
}

export default Toast;
