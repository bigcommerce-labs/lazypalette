import { ThemeProvider as PatternLabThemeProvider } from 'pattern-lab';
import * as queryString from 'query-string';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Dispatch } from 'redux';
import 'srcdoc-polyfill';
import styled from 'styled-components';

import { setStoreData, StoreDefaultData } from '../../actions/merchant';
import { loadTheme } from '../../actions/theme';

import HeaderMenu from '../HeaderMenu/HeaderMenu';
import Routes from '../Routes/Routes';
import SideMenu from '../SideMenu/SideMenu';
import UserSessionActivity from '../UserSessionActivity/UserSessionActivity';
import UIWindowProvider from '../UIWindowProvider/UIWindowProvider';

import { State } from '../../reducers/reducers';

interface AppProps extends RouteComponentProps<{}> {
    config: {
      assetPath: string;
      isDownForMaintenance: boolean;
      isPrelaunchStore: boolean;
      storeHash: string;
      oauthBaseUrl: string;
    };
    fetchInitialState(variationID: string): Dispatch<State>;
    setStoreData(storeData: StoreDefaultData): Dispatch<State>;
}

const StyledApp = styled.div`
    background: ${({ theme: { colors } }) => colors.background};
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
        const { storeHash, isDownForMaintenance, isPrelaunchStore } = this.props.config;
        this.props.setStoreData({ storeHash, isDownForMaintenance, isPrelaunchStore });
        this.props.fetchInitialState(variationId);
    }

    render() {
        return (
            <PatternLabThemeProvider>
                <UserSessionActivity oauthBaseUrl={this.props.config.oauthBaseUrl}>
                    <UIWindowProvider>
                        <StyledApp>
                            <HeaderMenu />
                            <SideMenu />
                            <Routes />
                        </StyledApp>
                    </UIWindowProvider>
                </UserSessionActivity>
            </PatternLabThemeProvider>
        );
    }
}

const mapDispatchToProps = {
    fetchInitialState: loadTheme,
    setStoreData,
};

export default withRouter(connect(null, mapDispatchToProps)(App));
