import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';
import * as queryString from 'query-string';
import { ThemeProvider as PatternLabThemeProvider } from 'pattern-lab';

import { fetchInitialState } from '../../actions/theme';

import HeaderMenu from '../HeaderMenu/HeaderMenu';
import PreviewPane from '../PreviewPane/PreviewPane';
import SideMenu from '../SideMenu/SideMenu';

interface AppProps extends RouteComponentProps<{}> {
  config: {
    assetPath: string;
    storeHash: string;
  };
  fetchInitialState(storeHash: string, variationID: string): any;
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
    const queryParams = queryString.parse(this.props.location.search);
    const variationId = queryParams.variationId ? queryParams.variationId : '';
    this.props.fetchInitialState(this.props.config.storeHash, variationId);
  }

  render() {
    return (
      <PatternLabThemeProvider>
        <StyledApp>
          <HeaderMenu />
          <SideMenu />
          <PreviewPane />
        </StyledApp>
      </PatternLabThemeProvider>
    );
  }
}

const mapDispatchToProps = {
    fetchInitialState,
};

export default withRouter(connect(null, mapDispatchToProps)(App));
