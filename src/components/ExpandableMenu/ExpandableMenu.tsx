import { theme, Icon } from 'pattern-lab';
import React, { PureComponent } from 'react';

import { trackSectionClose } from '../../services/analytics';

import { Content, ExpandModal, Header, NavItem, ResizeHandle, ResizeIcon, Title } from './styles';

interface ExpandableMenuProps extends Partial<{
    back: string;
    children: JSX.Element;
    minHeight: string;
    position: { x: number, y: number };
    size: { width: number, height: number };
    title: string;
    windowRef: any;
    startMove(): void;
    startResize(): void;
}> {}

class ExpandableMenu extends PureComponent<ExpandableMenuProps> {
    render() {
        const { back = '/', children, minHeight, position, size, startMove, startResize, title, windowRef} = this.props;
        const { stroke } = theme.colors;

        return (
            <ExpandModal
                position={position}
                innerRef={windowRef}
                minHeight={minHeight}
                size={size}
            >
                <Header>
                    {title &&
                        <Title onMouseDown={startMove}>{title}</Title>}
                    <NavItem
                        onClick={() => title ? trackSectionClose(title) : ''}
                        replace
                        to={back}
                    />
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
            </ExpandModal>
        );
    }
}

export default ExpandableMenu;
