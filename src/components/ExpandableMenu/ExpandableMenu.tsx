import React from 'react';

import { Header, ExpandModal, NavItem, Wrapper } from './styles';

interface ExpandableProps extends Partial<{
  title: string;
  children: JSX.Element;
  back: string;
}> {}

const ExpandableMenu = ({title, children, back = '/'}: ExpandableProps) => (
  <Wrapper>
    <ExpandModal>
      {title &&
        <Header>{title}</Header>}
      <NavItem to={back} />
      {children}
    </ExpandModal>
  </Wrapper>
);

export default ExpandableMenu;
