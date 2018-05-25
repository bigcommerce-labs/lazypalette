import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';

import { fetchInitialState } from '../../actions/theme';

import HeaderMenu from '../HeaderMenu/HeaderMenu';
import PreviewPane from '../PreviewPane/PreviewPane';
import SideMenu from '../SideMenu/SideMenu';
import ThemeVersions from '../ThemeVersions/ThemeVersions';

interface AppProps extends RouteComponentProps<{}> {
  fetchInitialState(): any;
}

const StyledApp = styled.div`
  align-content: flex-start;
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  position: fixed;
  width: 100%;
`;

export class App extends Component<AppProps, {}> {
  componentDidMount() {
    this.props.fetchInitialState();
  }

  render() {
    return (
      <StyledApp>
        <HeaderMenu />
        <SideMenu />
        <ThemeVersions />
        <PreviewPane />
      </StyledApp>
    );
  }
}

const mapDispatchToProps = {
  fetchInitialState,
};

export default withRouter(connect(null, mapDispatchToProps)(App));
