import React, { Component, MouseEvent as ReactMouseEvent } from 'react';

import { Wrapper } from './styles';

interface DraggableProps {
    children: any;
    position: Position;
}

interface DraggableState {
    moveStartPos: Position;
    moving: boolean;
    position: Position;
    resizeStartPos: Position;
    resizing: boolean;
    size?: { width: number, height: number };
}

interface Position {
    x: number;
    y: number;
}

const LEFT_BUTTON = 0;

class Draggable extends Component<DraggableProps, DraggableState> {
    readonly state: DraggableState = {
        moveStartPos: { x: 0, y: 0 },
        moving: false,
        position: this.props.position,
        resizeStartPos: { x: 0, y: 0 },
        resizing: false,
    };

    windowRef: any = React.createRef();

    componentDidUpdate(prevProps: DraggableProps, prevState: DraggableState) {
        if ((this.state.moving || this.state.resizing) &&
            !(prevState.moving || prevState.resizing)) {
            document.addEventListener('mousemove', this.drag);
            document.addEventListener('mouseup', this.stopDrag);
        } else if (!(this.state.moving || this.state.resizing) &&
            (prevState.moving || prevState.resizing)) {
            document.removeEventListener('mousemove', this.drag);
            document.removeEventListener('mouseup', this.stopDrag);
        }
    }

    startMove = (event: ReactMouseEvent<HTMLElement>) => {
        if (event.button === LEFT_BUTTON) {
            this.setState({
                moveStartPos: {
                    x: event.pageX - this.state.position.x,
                    y: event.pageY - this.state.position.y,
                },
                moving: true,
            });
            event.stopPropagation();
            event.preventDefault();
        }
    };

    startResize = (event: ReactMouseEvent<HTMLElement>) => {
        if (event.button === LEFT_BUTTON) {
            const { height, width } = this.windowRef.current
                ? this.windowRef.current.getBoundingClientRect()
                : { height: 0, width: 0};

            this.setState({
                resizeStartPos: {
                    x: event.pageX - width,
                    y: event.pageY - height,
                },
                resizing: true,
                size: { width, height },
            });
            event.stopPropagation();
            event.preventDefault();
        }
    };

    stopDrag = (event: MouseEvent) => {
        this.setState({ moving: false, resizing: false });
        event.stopPropagation();
        event.preventDefault();
    };

    drag = (event: MouseEvent) => {
        const { left, top, height, width } = this.windowRef.current
            ? this.windowRef.current.getBoundingClientRect()
            : { left: 0, top: 0, height: 0, width: 0};

        if (this.state.moving) {
            this.setState({
                position: {
                    x: Math.min(Math.max(event.pageX - this.state.moveStartPos.x, 0), window.innerWidth - width),
                    y: Math.min(Math.max(event.pageY - this.state.moveStartPos.y, 0), window.innerHeight - height),
                },
            });
        }

        if (this.state.resizing) {
            this.setState({
                size: {
                    height: Math.min(Math.max(event.pageY - this.state.resizeStartPos.y, 0), window.innerHeight - top),
                    width: Math.min(Math.max(event.pageX - this.state.resizeStartPos.x, 0), window.innerWidth - left),
                },
            });
        }

        if (this.state.resizing || this.state.moving) {
            event.stopPropagation();
            event.preventDefault();
        }
    };

    render() {
        return (
            <Wrapper dragging={this.state.moving || this.state.resizing}>
                {React.cloneElement(this.props.children, {
                    position: this.state.position,
                    size: this.state.size,
                    startMove: this.startMove,
                    startResize: this.startResize,
                    windowRef: this.windowRef,
                })}
            </Wrapper>
        );
    }
}

export default Draggable;
