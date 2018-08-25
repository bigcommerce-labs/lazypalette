import React, { Component, MouseEvent as ReactMouseEvent } from 'react';

import { Content, Header, Overlay, StyledWindow, Title } from './styles';

interface UIWindowProps {
    children?: JSX.Element;
    id: string;
    position?: { x: number, y: number };
    title?: string;
    topmost: boolean;
    windowRef?: any;
    onClose?(id: string): void;
    startDrag?(): void;
}

const LEFT_BUTTON = 0;

class UIWindow extends Component<UIWindowProps> {
    componentDidMount() {
        document.addEventListener('mousedown', this.handleDocumentClick);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleDocumentClick);
    }

    handleDocumentClick = (event: MouseEvent)  => {
        const { id, onClose, topmost, windowRef} = this.props;

        if (event.button !== LEFT_BUTTON || !topmost) {
            return;
        }

        if (windowRef && windowRef.current && !windowRef.current.contains(event.target)) {
            if (onClose) {
                onClose(id);
            }
        }
    };

    handleWindowClick = (event: ReactMouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
    };

    render() {
        const { children, position, startDrag, title, windowRef } = this.props;

        return (
            <Overlay>
                <StyledWindow
                    onClick={this.handleWindowClick}
                    position={position}
                    innerRef={windowRef}
                >
                    <Header
                        onMouseDown={startDrag}
                    >
                        {title &&
                        <Title>{title}</Title>}
                    </Header>
                    <Content>{children}</Content>
                </StyledWindow>
            </Overlay>
        );
    }
}

export default UIWindow;
