import React, { Component } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';

import { activeClassName, NavItem } from './styles';

import ThemeVariations from '../ThemeVariations/ThemeVariations';

interface MenuItem {
  label: string;
  path: string;
}

interface MenuItemsProps extends RouteComponentProps<{}> {
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

const ExpandMenuRoutes = ({route}: {route: string}) => {
  switch (route) {
    case 'theme':
      return <ThemeVariations />;
    // TODO: expand to include logo & settings
    default:
      return null;
  }
};

class MenuItems extends Component<MenuItemsProps, {}> {
  isPathActive = (path: string) => (
    this.props.location.pathname === `${this.props.currentPath}${path}`
  );

  toggleLink = (path: string) => (
    this.isPathActive(path) ? this.props.currentPath : `${this.props.currentPath}${path}`
  );

  render() {
    return (
      <StyledMenuItems>
        {this.props.items.map(({path, label}) => (
          <li key={path}>
            <ExpandMenuRoutes route={path} />
            <NavItem
              to={this.toggleLink(path)}
              exact
              isActive={(match, location) => this.isPathActive(path)}
              activeClassName={activeClassName}>
                {label}
            </NavItem>
          </li>
        ))}
      </StyledMenuItems>
    );
  }
}

export default withRouter(MenuItems);
