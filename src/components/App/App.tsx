import { ThemeProvider as PatternLabThemeProvider } from 'pattern-lab';
import * as queryString from 'query-string';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Dispatch } from 'redux';

import {
    setQueryParams,
    setStoreData,
    QueryParamsData,
    StoreDefaultData,
    StoreFeatures,
    UpdateQueryParamsAction
} from '../../actions/merchant';
import { createNotification } from '../../actions/notifications';
import {
    setPreviewPaneData,
    PreviewPaneDefaultData
} from '../../actions/previewPane';
import { loadTheme } from '../../actions/theme';
import { State } from '../../reducers/reducers';

import Banner from '../Banner/Banner';
import HeaderMenu from '../HeaderMenu/HeaderMenu';
import Onboarding from '../Onboarding/Onboarding';
import Routes from '../Routes/Routes';
import SideMenu from '../SideMenu/SideMenu';
import UserSessionActivity from '../UserSessionActivity/UserSessionActivity';
import UIWindowProvider from '../UIWindowProvider/UIWindowProvider';

import { StyledApp, Viewport } from './styles';

export interface AppConfig {
    assetPath: string;
    canOptOut: boolean;
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
    setQueryParams(queryData: QueryParamsData): UpdateQueryParamsAction;
    setStoreData(storeData: StoreDefaultData): Dispatch<State>;
}

export class App extends Component<AppProps, {}> {
    componentDidMount() {
        const queryParams = queryString.parse(this.props.location.search);
        const page = queryParams.redirectIframeUrl ? `/${queryParams.redirectIframeUrl}` : '/';
        const appMode = queryParams.appMode;
        const isUpdate = appMode === 'preview';

        const {
            features = {},
            canOptOut,
            guestPassword,
            isDownForMaintenance,
            isPrelaunchStore,
            seedActiveTheme,
            storeHash,
        } = this.props.config;

        this.props.setStoreData({
            activeThemeId: seedActiveTheme ? seedActiveTheme.themeId : null,
            activeVariationId: seedActiveTheme ? seedActiveTheme.id : null,
            appMode,
            canOptOut,
            features,
            isDownForMaintenance,
            isPrelaunchStore,
            previewCode: guestPassword,
            storeHash,
        });

        this.props.setQueryParams({queryParams: this.props.location.search});

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
                <UserSessionActivity
                    queryParams={this.props.location.search}
                    oauthBaseUrl={this.props.config.oauthBaseUrl}
                >
                    <UIWindowProvider>
                        <StyledApp>
                            <Onboarding/>
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
            </PatternLabThemeProvider>
        );
    }
}

const mapDispatchToProps = {
    createNotification,
    fetchInitialState: loadTheme,
    setPreviewPaneData,
    setQueryParams,
    setStoreData,
};

export default withRouter(connect(null, mapDispatchToProps)(App));
