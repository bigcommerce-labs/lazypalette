import React, { PureComponent } from 'react';

import { Content, ExpandModal, Header, NavItem, Title } from './styles';

interface ExpandableMenuProps extends Partial<{
    back: string;
    children: JSX.Element;
    position: { x: number, y: number };
    title: string;
    windowRef: any;
    startDrag(): void;
}> {}

class ExpandableMenu extends PureComponent<ExpandableMenuProps> {
    render() {
        const { back = '/', children, position, startDrag, title, windowRef} = this.props;

        return (
            <ExpandModal
                position={position}
                innerRef={windowRef}
            >
                <Header>
                    {title &&
                        <Title onMouseDown={startDrag}>{title}</Title>}
                    <NavItem to={back}/>
                </Header>
                <Content>{children}</Content>
            </ExpandModal>
        );
    }
}

export default ExpandableMenu;
