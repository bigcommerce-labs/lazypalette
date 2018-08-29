import { ThemeProvider as PatternLabThemeProvider } from 'pattern-lab';
import * as queryString from 'query-string';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Dispatch } from 'redux';
import 'srcdoc-polyfill';

import { setStoreData, StoreDefaultData } from '../../actions/merchant';
import { loadTheme } from '../../actions/theme';
import { State } from '../../reducers/reducers';

import Banner from '../Banner/Banner';
import HeaderMenu from '../HeaderMenu/HeaderMenu';
import Routes from '../Routes/Routes';
import SideMenu from '../SideMenu/SideMenu';
import UserSessionActivity from '../UserSessionActivity/UserSessionActivity';
import UIWindowProvider from '../UIWindowProvider/UIWindowProvider';

import { StyledApp, Viewport } from './styles';

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

export class App extends Component<AppProps, {}> {
    componentDidMount() {
        const queryParams = queryString.parse(this.props.location.search);
        const variationId = queryParams.variationId ? queryParams.variationId : '';
        const { storeHash, isDownForMaintenance, isPrelaunchStore } = this.props.config;
        const isCurrent = variationId === '';

        this.props.setStoreData({
            isCurrent,
            isDownForMaintenance,
            isPrelaunchStore,
            storeHash,
        });
        this.props.fetchInitialState(variationId);
    }

    render() {
        const { isDownForMaintenance, isPrelaunchStore } = this.props.config;
        const addBanner = isDownForMaintenance || isPrelaunchStore;
        const message = isDownForMaintenance
            ? 'Your store is under maintenance'
            : isPrelaunchStore
                ? 'Your store has not been published'
                : '';

        return (
            <PatternLabThemeProvider>
                <UserSessionActivity oauthBaseUrl={this.props.config.oauthBaseUrl}>
                    <UIWindowProvider>
                        <StyledApp>
                            {addBanner ? <Banner message={message}/> : ''}
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
