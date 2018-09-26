import React, { MouseEvent, MouseEventHandler, PureComponent } from 'react';

import { Close, Container, Content, Header, ModalBox, NavItem, Overlay, Title } from './styles';

interface ModalProps extends Partial<{
    backLink: string;
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
            backLink,
            children,
            isTransparent,
            title,
        } = this.props;

        return (
            <Container onClick={this.handleContainerClick}>
                <Overlay isTransparent={isTransparent} />
                <ModalBox onClick={this.handleModalClick}>
                    {title &&
                        <Header>
                            <Title>{title}</Title>
                            <Close onClick={this.handleCloseClick}/>
                        </Header>
                    }
                    {backLink &&
                        <NavItem to={backLink} replace />
                    }
                    <Content>{children}</Content>
                </ModalBox>
            </Container>
        );
    }
}

export default Modal;
