import React, { PureComponent } from 'react';
import { connect, Dispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
    fetchPageUrl,
    previewPaneLoaded,
    previewPaneLoading,
    previewPanePageReloaded,
    previewPaneRaceConditionDetected,
    previewPaneRaceConditionResolved,
    updatePage,
    updatePreviewPaneConfig,
    UpdatePageAction,
    UpdatePagePayload
} from '../../actions/previewPane';
import { ThemePreviewConfig } from '../../reducers/previewPane';
import { State } from '../../reducers/reducers';
import ChannelService from '../../services/previewPane/channelService/channelService';

import { VIEWPORT_TYPES } from './constants';
import { PreviewPaneContainer, PreviewPaneIframe } from './styles';

export interface ViewportType {
    glyphName: string;
    viewportHeight: string;
    viewportWidth: string;
}

interface PreviewPaneProps {
    configurationId: string;
    fontUrl: string | null;
    isFetching: boolean;
    isRotated: boolean;
    needsForceReload: boolean;
    page: string;
    pageUrl: string;
    raceConditionDetected: boolean;
    themePreviewConfig: ThemePreviewConfig;
    viewportType: ViewportType;
    loadPage(page: string): (dispatch: Dispatch, getState: () => State) => void;
    previewPaneLoaded(): void;
    previewPaneLoading(): void;
    previewPanePageReloaded(): void;
    previewPaneRaceConditionDetected(): void;
    previewPaneRaceConditionResolved(): void;
    updatePage(payload: UpdatePagePayload): UpdatePageAction;
    updatePreviewPaneConfig(): void;
}

class PreviewPane extends PureComponent<PreviewPaneProps> {
    private iframeRef: HTMLIFrameElement;
    private channelService: ChannelService;

    componentWillReceiveProps(nextProps: PreviewPaneProps): void {
        const { page, raceConditionDetected, themePreviewConfig } = this.props;

        // Race condition detected. This happens when the user interacts with store design while the sdk is not ready.
        if (!raceConditionDetected && nextProps.raceConditionDetected) {
            // Force reload the page
            this.props.loadPage(page);

            // Signal that the race condition has been resolved
            this.props.previewPaneRaceConditionResolved();

            return;
        }

        const currentVariation = themePreviewConfig.variationId;
        const nextVariation = nextProps.themePreviewConfig.variationId;

        // When the variationId changes, we will assume there are structural changes in the configuration which will
        // require use to do a full reload of the preview pane when the user changes variation.
        if (currentVariation !== nextVariation) {
            this.props.loadPage(this.props.page);
        }
    }

    componentDidUpdate(prevProps: PreviewPaneProps) {
        const { configurationId, fontUrl, needsForceReload, themePreviewConfig } = this.props;

        // TODO -- we should eliminate the themePreviewConfig and instead flatten the structure in the previewPane
        // state. Right now, when the configurationId changes, we will need to make an update on the themePreviewConfig
        // which is slow and makes it more difficult to understand.
        if (configurationId !== prevProps.configurationId) {
            this.props.updatePreviewPaneConfig();
        }

        // Structural updates can occur when the user makes changes which would modify the DOM of the page. An example
        // would be when the user changes the number of featured products on the homepage.
        if (needsForceReload) {
            this.broadcastForceReload();
        }

        const previousVariation = prevProps.themePreviewConfig.variationId;
        const currentVariation = themePreviewConfig.variationId;

        // If the variation changes, this should be considered a structural update. We can skip broadcasting events
        // since we are going to need to forcibly reload the preview pane.
        if (previousVariation !== currentVariation) {
            return;
        }

        const previousConfiguration = prevProps.themePreviewConfig.configurationId;
        const currentConfiguration = themePreviewConfig.configurationId;

        // We have a new configuration to display into the preview pane.
        if (previousConfiguration && previousConfiguration !== currentConfiguration) {
            this.broadcastReloadStylesheets(themePreviewConfig.configurationId);

            if (fontUrl && fontUrl !== prevProps.fontUrl) {
                this.broadcastFontChange(fontUrl);
            }
        }
    }

    render(): JSX.Element {
        const { isFetching, isRotated, pageUrl, viewportType } = this.props;

        // TODO show loading indicator until preview pane is ready
        return (
            <PreviewPaneContainer showBorder={viewportType === VIEWPORT_TYPES.DESKTOP}>
                {pageUrl &&
                    <PreviewPaneIframe
                        innerRef={(x: HTMLIFrameElement) => (this.iframeRef = x)}
                        isFetching={isFetching}
                        isRotated={isRotated}
                        onLoad={this.onLoad}
                        src={pageUrl}
                        viewportType={viewportType}
                    />
                }
            </PreviewPaneContainer>
        );
    }

    private broadcastFontChange = (fontUrl: string) => {
        this.channelService.safeBroadcast({
            error: (error: any) => { return; }, // TODO
            method: 'add-font',
            params: { fontUrl },
            success: (data: any) => this.props.previewPaneLoaded(),
        }, this.props.previewPaneRaceConditionDetected);
    };

    private broadcastForceReload = () => {
        this.channelService.safeBroadcast({
            error: (error: any) => { return; }, // TODO
            method: 'reload-page',
            params: {},
            success: (data: any) => {
                this.props.previewPanePageReloaded();
                this.props.previewPaneLoaded();
            },
        }, this.props.previewPaneRaceConditionDetected);
    };

    private broadcastReloadStylesheets = (configurationId: string) => {
        this.channelService.safeBroadcast({
            error: (error: any) => { return; }, // TODO
            method: 'reload-stylesheets',
            params: { configurationId },
            success: (data: any) => this.props.previewPaneLoaded(),
        }, this.props.previewPaneRaceConditionDetected);
    };

    private onLoad = () => {
        const iframeWindow = this.iframeRef.contentWindow;
        if (!iframeWindow) {
            return;
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
        this.channelService = new ChannelService({
            sdkNotReady: this.props.previewPaneLoading,
            sdkReady: this.props.previewPaneLoaded,
            window: iframeWindow,
        });
    };
}

const mapStateToProps = (state: State): Partial<PreviewPaneProps> => {
    return {
        ...state.previewPane,
        ...{ configurationId: state.theme.configurationId},
    };
};

const mapDispatchToProps = (dispatch: Dispatch): Partial<PreviewPaneProps> => bindActionCreators({
    loadPage: (page: string) => fetchPageUrl({ page }),
    previewPaneLoaded,
    previewPaneLoading,
    previewPanePageReloaded,
    previewPaneRaceConditionDetected,
    previewPaneRaceConditionResolved,
    updatePage,
    updatePreviewPaneConfig,
}, dispatch);

export default connect<Partial<PreviewPaneProps>, Partial<PreviewPaneProps>, {}, State>(
    mapStateToProps, mapDispatchToProps
)(PreviewPane);
