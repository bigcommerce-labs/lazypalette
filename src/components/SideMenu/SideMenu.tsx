import Axios from 'axios';
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import styled from 'styled-components';

import DesignSubMenu from './DesignSubMenu';
import MenuItems from './MenuItems';
import SubMenu from './SubMenu';

const SideMenuContainer = styled.nav`
  height: 100%;
  margin-top: 95px;
  width: 216px;
`;

const items = [
  {
    label: 'Design',
    path: 'design',
  },
  {
    label: 'Pages and Layout',
    path: 'pages',
  },
  {
    label: 'Apps',
    path: 'apps',
  },
  {
    label: 'History',
    path: 'history',
  },
];

const routes = [
  {
    path: 'pages',
    submenu_title: 'Pages',
  },
  {
    path: 'apps',
    submenu_title: 'Apps',
  },
  {
    path: 'history',
    submenu_title: 'History',
  },
];

const currentThemeAPI = '/internalapi/v1/sfm/currenttheme';
const configurationAPI = (configId: string) => `/internalapi/v1/themeeditor/configurations/${configId}`;
const themeVersionAPI = (storeHash: string, versionId: string) =>
  `/admin/services/themes/stores/${storeHash}/versions/${versionId}`;

interface SideMenuState {
  designItems: any[];
}

class SideMenu extends Component<any, SideMenuState> {
  constructor(props: any) {
    super(props);
    this.state = {
      designItems: [],
    };
  }

  componentDidMount() {
    this.fetchItems();
  }

  fetchItems() {
    Axios.get(currentThemeAPI)
      .then(({ data: { data: { configurationId, versionId }}}) => {
        this.fetchThemeConfig(versionId, configurationId);
      });
  }

  fetchThemeConfig(versionId: string, configurationId: string) {
    Axios.get(configurationAPI(configurationId))
      .then(({ data: { data: { storeHash }}}) => {
        this.fetchThemeVersion(storeHash, versionId);
      });
  }

  fetchThemeVersion(storeHash: string, versionId: string) {
    Axios.get(themeVersionAPI(storeHash, versionId))
      .then(({ data: { data: { editorSchema }}}) => {
        const schema: any[] = editorSchema;
        const designItems: any[] = [];
        schema.forEach((section, index) => {
          designItems.push({
            label: section.name,
            path: `${index}`,
          });
        });
        this.setState(() => {
          return { designItems };
        });
      });
  }

  render() {
    return (
      <SideMenuContainer>
        <Route
          path="/"
          exact
          render={({match}) => <MenuItems items={items.map(({label, path}) => ({label, path}))} match={match}/>}
        />
        <Route
          path="/design/"
          render={({ match }) => <DesignSubMenu items={this.state.designItems} match={match} />}
        />
        {routes.map(route => (
          <Route
            key={route.path}
            path={`/${route.path}/`}
            render={({match}) => (
              <SubMenu title={route.submenu_title} match={match}/>)}
          />
        ))}
      </SideMenuContainer>
    );
  }
}

export default SideMenu;
