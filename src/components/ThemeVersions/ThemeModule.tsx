import React from 'react';

import { ThemePropsList } from './ThemeVersions';
import { Header, Item, List, MenuModal, NavItem, Thumb, Title, Wrapper } from './styles';

const ThemeModule = (props: { variants: ThemePropsList }) => (
  <Wrapper>
    <MenuModal>
      <Header>Store theme</Header>
      <NavItem to="/design" />
      <List>
        {props.variants.map(variant => (
          <Item key={variant.name}>
            <Title>{variant.name}</Title>
            <Thumb theme={variant.image} />
          </Item>
        ))}
      </List>
    </MenuModal>
  </Wrapper>
);

export default ThemeModule;
