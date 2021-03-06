import { theme, Icon } from 'pattern-lab';
import React, { MouseEvent, MouseEventHandler, PureComponent } from 'react';

import { Close, Container, Content, Header, ModalBox, Overlay, Title } from './styles';

interface ModalProps extends Partial<{
    children: any;
    isTransparent: boolean;
    title: string;
    onClose: MouseEventHandler<HTMLDivElement>;
    overlayClose: MouseEventHandler<HTMLDivElement>;
}> {}

class Modal extends PureComponent<ModalProps> {
    static defaultProps: ModalProps = {
        isTransparent: true,
    };

    handleContainerClick = (event: MouseEvent<HTMLDivElement>) => {
        if (this.props.overlayClose) {
            this.props.overlayClose(event);
        }
    };

    handleCloseClick = (event: MouseEvent<HTMLDivElement>) => {
        if (this.props.onClose) {
            this.props.onClose(event);
        }
    };

    handleModalClick = (event: MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
    };

    render() {
        const {
            children,
            isTransparent,
            onClose,
            title,
        } = this.props;

        return (
            <Container onClick={this.handleContainerClick}>
                <Overlay isTransparent={isTransparent} />
                <ModalBox onClick={this.handleModalClick}>
                    <Header>
                        <Title>{title}</Title>
                        {onClose &&
                            <Close onClick={this.handleCloseClick}>
                                <Icon
                                    glyph="closeX"
                                    primaryColor={theme.colors.primaryText}
                                    size="small"
                                />
                            </Close>
                        }
                    </Header>
                    <Content>{children}</Content>
                </ModalBox>
            </Container>
        );
    }
}

export default Modal;
