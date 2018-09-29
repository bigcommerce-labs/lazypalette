import { ThemeProvider as PatternLabThemeProvider } from 'pattern-lab';
import * as queryString from 'query-string';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Dispatch } from 'redux';

import { setStoreData, StoreDefaultData, StoreFeatures } from '../../actions/merchant';
import { createNotification } from '../../actions/notifications';
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

export interface AppConfig {
    assetPath: string;
    features: StoreFeatures;
    guestPassword: string;
    isDownForMaintenance: boolean;
    isPrelaunchStore: boolean;
    oauthBaseUrl: string;
    seedActiveTheme: { themeId: string, id: string };
    shopPath: string;
    storeHash: string;
}

interface AppProps extends RouteComponentProps<{}> {
    config: AppConfig;
    createNotification(autoDismiss: boolean, message: string, type: string): Dispatch<State>;
    fetchInitialState(variationID: string, configurationId?: string, upgrade?: boolean): Dispatch<State>;
    setPreviewPaneData(previewPaneData: PreviewPaneDefaultData): Dispatch<State>;
    setStoreData(storeData: StoreDefaultData): Dispatch<State>;
}

export class App extends Component<AppProps, {}> {
    componentDidMount() {
        const queryParams = queryString.parse(this.props.location.search);
        const page = queryParams.redirectIframeUrl ? `/${queryParams.redirectIframeUrl}` : '/';
        const isUpdate = queryParams.appMode === 'preview';
        const {
            features = {},
            guestPassword,
            isDownForMaintenance,
            isPrelaunchStore,
            seedActiveTheme,
            storeHash,
        } = this.props.config;

        this.props.setStoreData({
            activeThemeId: seedActiveTheme.themeId,
            activeVariationId: seedActiveTheme.id,
            features,
            isDownForMaintenance,
            isPrelaunchStore,
            previewCode: guestPassword,
            storeHash,
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
            shopPath,
        } = this.props.config;

        return (
            <PatternLabThemeProvider>
                <BrowserContext.Provider value={{ _window: window }}>
                    <UserSessionActivity oauthBaseUrl={this.props.config.oauthBaseUrl}>
                        <UIWindowProvider>
                            <StyledApp>
                                <Banner
                                    createNotification={this.props.createNotification}
                                    previewCode={guestPassword}
                                    isPrelaunchStore={isPrelaunchStore}
                                    isDownForMaintenance={isDownForMaintenance}
                                    shopPath={shopPath}
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
    createNotification,
    fetchInitialState: loadTheme,
    setPreviewPaneData,
    setStoreData,
};

export default withRouter(connect(null, mapDispatchToProps)(App));
