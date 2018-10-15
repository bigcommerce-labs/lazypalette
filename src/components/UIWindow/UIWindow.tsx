import { theme, Icon } from 'pattern-lab';
import React, { Component, KeyboardEvent as ReactKeyBoardEvent, MouseEvent as ReactMouseEvent } from 'react';

import { Content, Header, NavItem, Overlay, StyledWindow, Title } from './styles';

interface UIWindowProps {
    children?: JSX.Element;
    id: string;
    position?: { x: number, y: number };
    title?: string;
    topmost: boolean;
    windowRef?: any;
    onClose?(id: string): void;
    startMove?(): void;
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

    handleKeyDown = (event: ReactKeyBoardEvent<HTMLDivElement>) => {
        if (event.key === 'Escape') {
            const { id, onClose } = this.props;

            if (onClose) {
                onClose(id);
            }
        }
    };

    handleWindowClick = (event: ReactMouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
    };

    handleOnClose = (id: string) => {
        return (event: ReactMouseEvent<HTMLDivElement>) => {
            const { onClose } = this.props;

            if (onClose) {
                onClose(id);
            }
        };
    };

    render() {
        const { children, id, position, startMove, title, windowRef } = this.props;

        return (
            <Overlay>
                <StyledWindow
                    onClick={this.handleWindowClick}
                    position={position}
                    innerRef={windowRef}
                    onKeyDown={this.handleKeyDown}
                >
                    <Header
                        onMouseDown={startMove}
                    >
                        {title &&
                        <Title>{title}</Title>}
                        <NavItem onClick={this.handleOnClose(id)}>
                            <Icon
                                glyph="closeX"
                                primaryColor={theme.colors.primaryText}
                                size="smaller"
                            />
                        </NavItem>
                    </Header>
                    <Content>{children}</Content>
                </StyledWindow>
            </Overlay>
        );
    }
}

export default UIWindow;
