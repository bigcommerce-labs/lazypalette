import { ThemeProvider as PatternLabThemeProvider } from 'pattern-lab';
import * as queryString from 'query-string';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Dispatch } from 'redux';
import 'srcdoc-polyfill';

import { setStoreData } from '../../actions/merchant';
import { loadTheme } from '../../actions/theme';
import { State } from '../../reducers/reducers';
import HeaderMenu from '../HeaderMenu/HeaderMenu';
import Routes from '../Routes/Routes';
import SideMenu from '../SideMenu/SideMenu';
import UserSessionActivity from '../UserSessionActivity/UserSessionActivity';
import UIWindowProvider from '../UIWindowProvider/UIWindowProvider';

import { StyledApp, Viewport } from './styles';

interface AppProps extends RouteComponentProps<{}> {
    config: {
      assetPath: string;
      storeHash: string;
      oauthBaseUrl: string;
    };
    fetchInitialState(variationID: string): Dispatch<State>;
    setStoreData(storeHash: string): Dispatch<State>;
}

export class App extends Component<AppProps, {}> {
    componentDidMount() {
        const queryParams = queryString.parse(this.props.location.search);
        const variationId = queryParams.variationId ? queryParams.variationId : '';
        const { storeHash } = this.props.config;
        this.props.setStoreData(storeHash);
        this.props.fetchInitialState(variationId);
    }

    render() {
        return (
            <PatternLabThemeProvider>
                <UserSessionActivity oauthBaseUrl={this.props.config.oauthBaseUrl}>
                    <UIWindowProvider>
                        <StyledApp>
                            <HeaderMenu />
                            <Viewport>
                                <SideMenu />
                                <Routes />
                            </Viewport>
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
