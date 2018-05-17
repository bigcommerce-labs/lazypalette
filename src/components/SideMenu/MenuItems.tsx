import React, { Component } from 'react';
import styled from 'styled-components';

import { activeClassName, NavItem } from './styles';

interface MenuItem {
  label: string;
  path: string;
}

interface MenuItemsProps {
  items: MenuItem[];
  currentPath: string;
}

export const StyledMenuItems = styled.ul`
  font-size: 15px;
  line-height: 36px;
  list-style-type: none;
  margin-left: 46px;
  margin-top: 0;
  padding-left: 0;
  vertical-align: top;
`;

class MenuItems extends Component<MenuItemsProps, {}> {
  render() {
    return (
      <StyledMenuItems>
        {this.props.items.map(route => (
          <li key={route.path}>
            <NavItem
              to={`${this.props.currentPath}${route.path}`}
              exact
              activeClassName={activeClassName}>
                {route.label}
              </NavItem>
          </li>
        ))}
      </StyledMenuItems>
    );
  }
}

export default MenuItems;
