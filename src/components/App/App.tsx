import { ThemeProvider as PatternLabThemeProvider } from 'pattern-lab';
import * as queryString from 'query-string';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Dispatch } from 'redux';

import 'srcdoc-polyfill';

import { setStoreData, StoreDefaultData } from '../../actions/merchant';
import {
    setPreviewPaneData,
    PreviewPaneDefaultData
} from '../../actions/previewPane';
import { loadTheme } from '../../actions/theme';
import BrowserContext from '../../context/BrowserContext';
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
          guestPassword: string;
          isDownForMaintenance: boolean;
          isPrelaunchStore: boolean;
          oauthBaseUrl: string;
          storeHash: string;
          timezoneName: string;
          timezoneOffset: number;
    };
    fetchInitialState(variationID: string): Dispatch<State>;
    setPreviewPaneData(previewPaneData: PreviewPaneDefaultData): Dispatch<State>;
    setStoreData(storeData: StoreDefaultData): Dispatch<State>;
}

export class App extends Component<AppProps, {}> {
    componentDidMount() {
        const queryParams = queryString.parse(this.props.location.search);
        const variationId = queryParams.variationId ? queryParams.variationId : '';
        const page = queryParams.redirectIframeUrl ? `/${queryParams.redirectIframeUrl}` : '/';
        const {
            storeHash,
            guestPassword,
            isDownForMaintenance,
            isPrelaunchStore,
            timezoneName,
            timezoneOffset,
        } = this.props.config;

        const isCurrent = variationId === '';

        this.props.setStoreData({
            isCurrent,
            isDownForMaintenance,
            isPrelaunchStore,
            previewCode: guestPassword,
            storeHash,
            timezoneName,
            timezoneOffset,
        });
        this.props.setPreviewPaneData({page});
        this.props.fetchInitialState(variationId);
    }

    render() {
        const {
            guestPassword,
            isDownForMaintenance,
            isPrelaunchStore,
        } = this.props.config;

        return (
            <PatternLabThemeProvider>
                <BrowserContext.Provider value={{ _window: window }}>
                    <UserSessionActivity oauthBaseUrl={this.props.config.oauthBaseUrl}>
                        <UIWindowProvider>
                            <StyledApp>
                                <Banner
                                    previewCode={guestPassword}
                                    isPrelaunchStore={isPrelaunchStore}
                                    isDownForMaintenance={isDownForMaintenance}
                                />
                                <HeaderMenu />
                                <Viewport>
                                    <SideMenu />
                                    <Routes />
                                </Viewport>
                            </StyledApp>
                        </UIWindowProvider>
                    </UserSessionActivity>
                </BrowserContext.Provider>
            </PatternLabThemeProvider>
        );
    }
}

const mapDispatchToProps = {
    fetchInitialState: loadTheme,
    setPreviewPaneData,
    setStoreData,
};

export default withRouter(connect(null, mapDispatchToProps)(App));
