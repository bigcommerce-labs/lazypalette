import React, { Component, MouseEvent as ReactMouseEvent } from 'react';

import { Wrapper } from './styles';

interface DraggableProps {
    children: any;
    position: { x: number, y: number };
}

interface DraggableState {
    dragStartPos: { x: number, y: number };
    dragging: boolean;
    position: { x: number, y: number };
}

const LEFT_BUTTON = 0;

class Draggable extends Component<DraggableProps, DraggableState> {
    readonly state: DraggableState = {
        dragStartPos: { x: 0, y: 0 },
        dragging: false,
        position: this.props.position,
    };

    windowRef: any = React.createRef();

    componentDidUpdate(prevProps: DraggableProps, prevState: DraggableState) {
        if (this.state.dragging && !prevState.dragging) {
            document.addEventListener('mousemove', this.drag);
            document.addEventListener('mouseup', this.stopDrag);
        } else if (!this.state.dragging && prevState.dragging) {
            document.removeEventListener('mousemove', this.drag);
            document.removeEventListener('mouseup', this.stopDrag);
        }
    }

    startDrag = (event: ReactMouseEvent<HTMLElement>) => {
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
            const { height, width } = this.windowRef.current
                ? this.windowRef.current.getBoundingClientRect()
                : { height: 0, width: 0};

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
        return (
            <Wrapper dragging={this.state.dragging}>
                {React.cloneElement(this.props.children, {
                    position: this.state.position,
                    startDrag: this.startDrag,
                    windowRef: this.windowRef,
                })}
            </Wrapper>
        );
    }
}

export default Draggable;
