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
        seedActiveTheme: { themeId: string, id: string },
        storeHash: string;
        timezoneName: string;
        timezoneOffset: number;
    };
    setPreviewPaneData(previewPaneData: PreviewPaneDefaultData): Dispatch<State>;
    fetchInitialState(variationID: string, configurationId?: string, upgrade?: boolean): Dispatch<State>;
    setStoreData(storeData: StoreDefaultData): Dispatch<State>;
}

export class App extends Component<AppProps, {}> {
    componentDidMount() {
        const queryParams = queryString.parse(this.props.location.search);
        const page = queryParams.redirectIframeUrl ? `/${queryParams.redirectIframeUrl}` : '/';
        const isUpdate = queryParams.appMode === 'preview';
        const {
            guestPassword,
            isDownForMaintenance,
            isPrelaunchStore,
            seedActiveTheme,
            storeHash,
            timezoneName,
            timezoneOffset,
        } = this.props.config;

        this.props.setStoreData({
            activeThemeId: seedActiveTheme.themeId,
            activeVariationId: seedActiveTheme.id,
            isDownForMaintenance,
            isPrelaunchStore,
            previewCode: guestPassword,
            storeHash,
            timezoneName,
            timezoneOffset,
        });

        this.props.setPreviewPaneData({page});

        const variationId = queryParams.variationId ? queryParams.variationId : seedActiveTheme.id;

        this.props.fetchInitialState(variationId, undefined, isUpdate);
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
