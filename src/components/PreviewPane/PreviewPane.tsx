import React, { Component } from 'react';
import { connect, Dispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
    buildIframeUrl,
    previewPaneLoaded,
    previewPanePageReloaded,
    updatePage,
    UpdatePagePayload
} from '../../actions/previewPane';
import { State } from '../../reducers/reducers';
import ChannelService from '../../services/previewPane/channelService/channelService';

import { VIEWPORT_TYPES } from './constants';
import {
    PreviewPaneContainer,
    PreviewPaneIframe,
    PreviewPaneLoading,
} from './styles';

export interface ViewportType {
    glyphName: string;
    viewportHeight: string;
    viewportWidth: string;
}

interface SetCookiesParams {
    variationId: string;
    versionId: string;
    lastCommitId: string;
    configurationId: string;
}

interface PreviewPaneProps {
    versionId: string;
    variationId: string;
    configurationId: string;
    lastCommitId: string;
    fontUrl: string | null;
    isFetching: boolean;
    isRotated: boolean;
    needsForceReload: boolean;
    page: string;
    iframeUrl: string;
    viewportType: ViewportType;
    buildIframeUrl(page: string): void;
    previewPaneLoaded(): void;
    previewPanePageReloaded(): void;
    updatePage(payload: UpdatePagePayload): void;
}

export class PreviewPane extends Component<PreviewPaneProps> {
    channelService: ChannelService;
    private iframeRef: HTMLIFrameElement;

    componentDidUpdate(prevProps: PreviewPaneProps) {
        const { configurationId, fontUrl, lastCommitId, needsForceReload, variationId, versionId } = this.props;

        /**
         * Structural updates can occur when the user makes a settings change which would modify the DOM of the page.
         * If the variation changes, this will set the needsForceReload to true which
         * should be considered a structural update.
         * Example:
         *          User changes the number of featured products on the homepage.
         *          User choosing a different variation from the Styles menu.
         */
        if (needsForceReload) {
            this.broadcastForceReload({
                configurationId,
                lastCommitId,
                variationId,
                versionId,
            });

            return;
        }

        // Attempt to progressively update the stylesheets on the page.
        const previousConfigurationId = prevProps.configurationId;
        if (previousConfigurationId && previousConfigurationId !== configurationId) {
            this.broadcastReloadStylesheets(configurationId);
        }

        // Update the fonts on the page.
        if (fontUrl && fontUrl !== prevProps.fontUrl) {
            this.broadcastFontChange(fontUrl);
        }

        return;
    }

    render(): JSX.Element {
        const { isFetching, isRotated, iframeUrl, viewportType } = this.props;

        return (
            <PreviewPaneContainer showBorder={viewportType === VIEWPORT_TYPES.DESKTOP}>
                {iframeUrl &&
                    <PreviewPaneIframe
                        innerRef={(iframeRef: HTMLIFrameElement) => (this.iframeRef = iframeRef)}
                        isFetching={isFetching}
                        isRotated={isRotated}
                        onLoad={this.onLoad}
                        src={iframeUrl}
                        viewportType={viewportType}
                    />}

                {isFetching &&
                    <PreviewPaneLoading />}
            </PreviewPaneContainer>
        );
    }

    private get ensureChannelAvailable() {
        // If the channel service is not available, force reload preview pane
        if (!this.channelService) {
            this.raceConditionHandler();

            return false;
        }

        return true;
    }

    private broadcastFontChange = (fontUrl: string) => {
        if (this.ensureChannelAvailable) {
            this.channelService.safeBroadcast({
                error: (error: any) => this.raceConditionHandler(),
                method: 'add-font',
                params: { fontUrl },
                success: (data: any) => this.props.previewPaneLoaded(),
            }, this.raceConditionHandler);
        }
    };

    private broadcastReloadStylesheets = (configurationId: string) => {
        if (this.ensureChannelAvailable) {
            this.channelService.safeBroadcast({
                error: (error: any) => this.raceConditionHandler(),
                method: 'reload-stylesheets',
                params: { configurationId },
                success: (data: any) => this.props.previewPaneLoaded(),
            }, this.raceConditionHandler);
        }
    };

    private broadcastForceReload = ({ variationId, versionId, configurationId, lastCommitId }: SetCookiesParams) => {
        if (this.ensureChannelAvailable) {
            this.channelService.safeBroadcast({
                error: (error: any) => this.raceConditionHandler(),
                method: 'set-cookie',
                params: {
                    configurationId,
                    reloadPage: true,
                    // sessionId === lastCommitId
                    // https://github.com/bigcommerce-labs/stencil-preview-sdk/blob/master/src/app/iframe-sdk.js#L99
                    sessionId: lastCommitId,
                    variationId,
                    versionId,
                },
                success: (data: any) => this.props.previewPanePageReloaded(),
            }, this.raceConditionHandler);
        }
    };

    private broadcastUpdateUrls = () => {
        // TODO: this call can technically fail, look into graceful error handling
        this.channelService.safeBroadcast({
            error: (error: any) => '',
            method: 'update-external-urls',
            params: { targetValue: '_blank' },
            success: (data: any) => '',
        }, this.raceConditionHandler);
    };

    private raceConditionHandler = () => {
        this.props.buildIframeUrl(this.props.page);
        this.props.previewPanePageReloaded();
    };

    private onLoad = () => {
        // TODO: We know the iframe has loaded but we dont know if the page which was loaded supports store design. If
        // there is a link to an external page or we load an error page, we will see the onLoad handler is called, but
        // the stencilPreviewSdk will not be available.

        // Dismiss the overlay when the content of the preview pane loads
        this.props.previewPaneLoaded();

        const iframeWindow = this.iframeRef.contentWindow;
        if (!iframeWindow) {
            throw new Error('iframe contentWindow unavailable');
        }

        // Keep the Redux Store in sync with the users page navigation.
        const page = iframeWindow.location.pathname;
        if (page !== this.props.page) {
            this.props.updatePage({ page });
        }

        // Ensure we have a channelService set up when the iframe loads. Since we need to have the iframe reference
        // available to stand up the channel, we need to make sure this is done once the iframe loads.
        // TODO: Look into other places for this to live. We only need to instantiate the ChannelService once, since
        // onLoad is called each time the user navigates, we need to make sure the ChannelService client is a singleton
        // instance. We can definitely improve this.
        // TODO: Handle SdkReady / SdkNotReady signals
        this.channelService = new ChannelService({
            sdkNotReady: () => { return; },
            sdkReady: () => { this.broadcastUpdateUrls(); },
            window: iframeWindow,
        });
    };
}

const mapStateToProps = (state: State): Partial<PreviewPaneProps> => {
    const { configurationId, lastCommitId, variationId, versionId } = state.theme;

    return {
        ...state.previewPane,
        ...{ configurationId, lastCommitId, variationId, versionId },
    };
};

const mapDispatchToProps = (dispatch: Dispatch): Partial<PreviewPaneProps> => bindActionCreators({
    buildIframeUrl,
    previewPaneLoaded,
    previewPanePageReloaded,
    updatePage,
}, dispatch);

export default connect<Partial<PreviewPaneProps>, Partial<PreviewPaneProps>, {}, State>(
    mapStateToProps, mapDispatchToProps
)(PreviewPane);
