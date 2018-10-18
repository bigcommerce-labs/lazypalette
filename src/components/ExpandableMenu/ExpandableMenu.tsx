import { LocationDescriptor } from 'history';
import { theme, Icon } from 'pattern-lab';
import React, { PureComponent } from 'react';

import { Position } from '../../actions/sideMenu';
import { trackSectionClose } from '../../services/analytics';

import { Content, ContentsWrapper, ExpandModal, Header, NavItem, ResizeHandle, ResizeIcon, Title } from './styles';

interface ExpandableMenuProps extends Partial<{
    back: LocationDescriptor;
    children: JSX.Element;
    minHeight: string;
    position: Position;
    size: { width: number, height: number };
    title: string;
    windowRef: any;
    startMove(): void;
    startResize(): void;
    updatePosition(expandableMenuPosition: Position): void;
}> {}

class ExpandableMenu extends PureComponent<ExpandableMenuProps> {
    componentDidUpdate(prevProps: ExpandableMenuProps) {
        const { position: currPosition } = this.props;
        const { position: prevPosition } = prevProps;
        if (prevPosition && currPosition) {
            if (currPosition.x !== prevPosition.x || currPosition.y !== prevPosition.y) {
                if (this.props.updatePosition) {
                    this.props.updatePosition(currPosition);
                }
            }
        }
    }

    handleClick = () => {
        if (this.props.title) {
            trackSectionClose(this.props.title);
        }
    };

    render() {
        const {
            back = {pathname: '/'},
            children,
            minHeight,
            position,
            size,
            startMove,
            startResize,
            title,
            windowRef,
        } = this.props;
        const { stroke } = theme.colors;

        return (
            <ExpandModal
                position={position}
                innerRef={windowRef}
                minHeight={minHeight}
                size={size}
            >
                <ContentsWrapper>
                    <Header>
                        {title &&
                            <Title onMouseDown={startMove}>{title}</Title>}
                        <NavItem
                            onClick={this.handleClick}
                            replace
                            to={back}
                        >
                            <Icon
                                glyph="closeX"
                                primaryColor={theme.colors.primaryText}
                                size="small"
                            />
                        </NavItem>
                    </Header>
                    <Content>{children}</Content>
                    <ResizeHandle onMouseDown={startResize}>
                        <ResizeIcon>
                            <Icon
                                glyph="resizeable"
                                primaryColor={stroke}
                                size="large"
                            />
                        </ResizeIcon>
                    </ResizeHandle>
                </ContentsWrapper>
            </ExpandModal>
        );
    }
}

export default ExpandableMenu;
