import React, { MouseEvent, PureComponent } from 'react';

import { Content, Header, StyledWindow } from './styles';

interface UIWindowProps {
    children: any;
    id: string;
    position: { x: number, y: number };
    title?: string;
    topmost: boolean;
    onClose(id: string): void;
}

class UIWindow extends PureComponent<UIWindowProps> {
    wrapperRef: any;

    constructor(props: UIWindowProps) {
        super(props);
        this.wrapperRef = React.createRef();
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    handleClickOutside: EventListener = event => {
        if (!this.props.topmost) {
            return;
        }

        if (this.wrapperRef && this.wrapperRef.current && !this.wrapperRef.current.contains(event.target)) {
            if (this.props.onClose) {
                this.props.onClose(this.props.id);
            }
        }
    };

    handleModalClick = (event: MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
    };

    render() {
        const {
            children,
            position,
            title,
        } = this.props;

        return (
            <div ref={this.wrapperRef}>
                <StyledWindow
                    onClick={this.handleModalClick}
                    position={position}
                >
                    {title &&
                        <Header>{title}</Header>}
                    <Content>{children}</Content>
                </StyledWindow>
            </div>
        );
    }
}

export default UIWindow;
