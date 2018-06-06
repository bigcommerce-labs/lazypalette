import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';

import { State } from '../../reducers/reducers';

import DesignSubMenu from './DesignSubMenu';
import MenuItems from './MenuItems';
import SubMenu from './SubMenu';

interface SideMenuProps extends RouteComponentProps<{}> {
  themeDesignSections: string[];
}

const StyledSideMenu = styled.nav`
  height: 100%;
  padding-top: 1.875rem;
  width: 13.5rem;
  background: #F6F7F9;
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

class SideMenu extends Component<SideMenuProps, {}> {
  render() {
    return (
      <StyledSideMenu>
        <Route
          path="/"
          exact
          render={({ match }) => <MenuItems
            items={items.map(({label, path}) => ({label, path}))}
            currentPath={match.path}
          />}
        />
        <Route
          path="/design/"
          render={({ match }) => <DesignSubMenu sections={this.props.themeDesignSections} currentPath={match.path} />}
        />
        {routes.map(route => (
          <Route
            key={route.path}
            path={`/${route.path}/`}
            render={({match}) => (
              <SubMenu title={route.submenu_title} currentPath={match.path}/>)}
          />
        ))}
      </StyledSideMenu>
    );
  }
}

const mapStateToProps = (state: State) => {
  return {
    themeDesignSections: state.theme.schema.map(({ name }) => name),
  };
};

export default withRouter(connect(mapStateToProps)(SideMenu));
