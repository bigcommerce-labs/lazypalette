import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import styled from 'styled-components';

import MenuItems from './MenuItems';
import SubMenu from './SubMenu';

const SideMenuContainer = styled.nav`
  height: 100%;
  margin-top: 95px;
  width: 216px;
`;

const routes = [
  {
    items: [
      {
        label: 'Logo and Store Name',
        path: 'logo',
      },
      {
        label: 'Store Theme',
        path: 'theme',
      },
      {
        label: 'Styles',
        path: 'styles',
      },
      {
        label: 'Typography',
        path: 'typography',
      },
      {
        label: 'Iconography',
        path: 'iconography',
      },
      {
        label: 'Buttons',
        path: 'buttons',
      },
      {
        label: 'Forms',
        path: 'forms',
      },
      {
        label: 'Navigation',
        path: 'navigation',
      },
    ],
    label: 'Design',
    path: 'design',
    submenu_title: 'Design',
  },
  {
    items: [],
    label: 'Pages and Layout',
    path: 'pages',
    submenu_title: 'Pages',
  },
  {
    items: [],
    label: 'Apps',
    path: 'apps',
    submenu_title: 'Apps',
  },
  {
    items: [],
    label: 'History',
    path: 'history',
    submenu_title: 'History',
  },
];

class SideMenu extends Component {
  render() {
    return (
      <SideMenuContainer>
        <Route
          path="/"
          exact
          render={({match}) => <MenuItems routes={routes.map(({label, path}) => ({label, path}))} match={match}/>}
        />
        {routes.map(route => (
          <Route
            key={route.path}
            path={`/${route.path}/`}
            render={({match}) => (
              <SubMenu title={route.submenu_title} items={route.items} match={match}/>)}
          />
        ))}
      </SideMenuContainer>
    );
  }
}

export default SideMenu;
