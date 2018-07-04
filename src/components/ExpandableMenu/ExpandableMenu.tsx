import React from 'react';

import { Content, ExpandModal, Header, NavItem, Wrapper } from './styles';

interface ExpandableProps extends Partial<{
    title: string;
    children: JSX.Element;
    back: string;
}> {}

const ExpandableMenu = ({ title, children, back = '/' }: ExpandableProps) => (
    <Wrapper>
        <ExpandModal>
            {title &&
                <Header>{title}</Header>}
            <NavItem to={back}/>
            <Content>{children}</Content>
        </ExpandModal>
    </Wrapper>
);

export default ExpandableMenu;
