import React from 'react';

import { Content, ExpandModal, Header, NavItem, Title, Wrapper } from './styles';

interface ExpandableProps extends Partial<{
    title: string;
    children: JSX.Element;
    back: string;
}> {}

const ExpandableMenu = ({ title, children, back = '/' }: ExpandableProps) => (
    <Wrapper>
        <ExpandModal>
            <Header>
                {title &&
                    <Title>{title}</Title>}
                <NavItem to={back}/>
            </Header>
            <Content>{children}</Content>
        </ExpandModal>
    </Wrapper>
);

export default ExpandableMenu;
