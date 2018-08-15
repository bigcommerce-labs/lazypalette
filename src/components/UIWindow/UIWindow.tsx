import React, { Component, MouseEvent as ReactMouseEvent } from 'react';

import { Content, Header, Overlay, StyledWindow, Title } from './styles';

interface UIWindowProps {
    children: any;
    id: string;
    position: { x: number, y: number };
    title?: string;
    topmost: boolean;
    onClose(id: string): void;
}

interface UIWindowState {
    dragStartPos: { x: number, y: number };
    dragging: boolean;
    position: { x: number, y: number };
}

const LEFT_BUTTON = 0;

class UIWindow extends Component<UIWindowProps, UIWindowState> {
    readonly state: UIWindowState = {
        dragStartPos: { x: 0, y: 0 },
        dragging: false,
        position: this.props.position,
    };

    windowRef: any = React.createRef();

    componentDidUpdate(prevProps: UIWindowProps, prevState: UIWindowState) {
        if (this.state.dragging && !prevState.dragging) {
            document.addEventListener('mousemove', this.drag);
            document.addEventListener('mouseup', this.stopDrag);
        } else if (!this.state.dragging && prevState.dragging) {
            document.removeEventListener('mousemove', this.drag);
            document.removeEventListener('mouseup', this.stopDrag);
        }
    }
    componentDidMount() {
        document.addEventListener('mousedown', this.handleDocumentClick);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleDocumentClick);
    }

    handleDocumentClick = (event: MouseEvent)  => {
        if (event.button !== LEFT_BUTTON) { return; }

        if (!this.props.topmost) {
            return;
        }

        if (this.windowRef && this.windowRef.current && !this.windowRef.current.contains(event.target)) {
            if (this.props.onClose) {
                this.props.onClose(this.props.id);
            }
        }
    };

    handleWindowClick = (event: ReactMouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
    };

    startDrag = (event: ReactMouseEvent<HTMLDivElement>) => {
        if (event.button === LEFT_BUTTON) {
            this.setState({
                dragStartPos: {
                    x: event.pageX - this.state.position.x,
                    y: event.pageY - this.state.position.y,
                },
                dragging: true,
            });
            event.stopPropagation();
            event.preventDefault();
        }
    };

    stopDrag = (event: MouseEvent) => {
        this.setState({ dragging: false });
        event.stopPropagation();
        event.preventDefault();
    };

    drag = (event: MouseEvent) => {
        if (this.state.dragging) {
            const { height, width } = this.windowRef.current.getBoundingClientRect();

            const x = Math.min(Math.max(event.pageX - this.state.dragStartPos.x, 0), window.innerWidth - width);
            const y = Math.min(Math.max(event.pageY - this.state.dragStartPos.y, 0), window.innerHeight - height);
            this.setState({
                position: {
                    x,
                    y,
                },
            });
            event.stopPropagation();
            event.preventDefault();
        }
    };

    render() {
        const { children, title } = this.props;
        const { dragging, position } = this.state;

        return (
            <Overlay>
                <StyledWindow
                    onClick={this.handleWindowClick}
                    position={position}
                    innerRef={this.windowRef}
                >
                    <Header
                        dragging={dragging}
                        onMouseDown={this.startDrag}
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
