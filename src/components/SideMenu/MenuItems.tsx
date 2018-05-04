import React, { Component } from 'react';
import styled from 'styled-components';

import { activeClassName, NavItem } from './styles';

export const StyledMenuItems = styled.ul`
  font-size: 15px;
  line-height: 36px;
  list-style-type: none;
  margin-left: 46px;
  margin-top: 0;
  padding-left: 0;
  vertical-align: top;
`;

interface MenuItem {
  label: string;
  path: string;
}

interface MenuItemsProps {
  items: MenuItem[];
  match: any;
}

class MenuItems extends Component<MenuItemsProps, any> {
  render() {
    return (
      <StyledMenuItems>
        {this.props.items.map(route => (
          <li key={route.path}>
            <NavItem
              to={`${this.props.match.path}${route.path}`}
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
