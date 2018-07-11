import { ThemeProvider as PatternLabThemeProvider } from 'pattern-lab';
import * as queryString from 'query-string';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Dispatch } from 'redux';
import 'srcdoc-polyfill';
import styled from 'styled-components';

import { fetchInitialState } from '../../actions/theme';

import HeaderMenu from '../HeaderMenu/HeaderMenu';
import PreviewPane from '../PreviewPane/PreviewPane';
import SideMenu from '../SideMenu/SideMenu';
import UserSessionActivity from '../UserSessionActivity/UserSessionActivity';

import { State } from '../../reducers/reducers';

interface AppProps extends RouteComponentProps<{}> {
    config: {
      assetPath: string;
      storeHash: string;
      oauthBaseUrl: string;
    };
    fetchInitialState(storeHash: string, variationID: string): Dispatch<State>;
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
                <UserSessionActivity oauthBaseUrl={this.props.config.oauthBaseUrl}>
                    <StyledApp>
                        <HeaderMenu/>
                        <SideMenu/>
                        <PreviewPane/>
                    </StyledApp>
                </UserSessionActivity>
            </PatternLabThemeProvider>
        );
    }
}

const mapDispatchToProps = {
    fetchInitialState,
};

export default withRouter(connect(null, mapDispatchToProps)(App));
