import Channel, { MessagingChannel } from 'jschannel';
import React, { PureComponent } from 'react';
import { connect, Dispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
    fetchPageUrl,
    previewPaneLoaded,
    previewPaneLoading,
    previewPanePageReloaded,
    updatePage,
    updatePreviewPaneConfig,
    UpdatePageAction,
    UpdatePagePayload
} from '../../actions/previewPane';
import { ThemePreviewConfig } from '../../reducers/previewPane';
import { State } from '../../reducers/reducers';

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
    themePreviewConfig: ThemePreviewConfig;
    viewportType: ViewportType;
    loadPage(page: string): (dispatch: Dispatch, getState: () => State) => void;
    previewPaneLoaded(): void;
    previewPaneLoading(): void;
    previewPanePageReloaded(): void;
    updatePage(payload: UpdatePagePayload): UpdatePageAction;
    updatePreviewPaneConfig(): void;
}

class PreviewPane extends PureComponent<PreviewPaneProps> {
    private iframeRef: HTMLIFrameElement;
    private jsChannel: MessagingChannel;

    componentWillReceiveProps(nextProps: PreviewPaneProps): void {
        // When we receive a new versionId, we need to make sure we force reload the page. Each theme version can have
        // different files, so we need to make sure we hit the storefront service for the full page render
        if (this.props.themePreviewConfig.versionId !== nextProps.themePreviewConfig.versionId) {
            this.props.loadPage(this.props.page);
        }
    }

    componentDidUpdate(prevProps: PreviewPaneProps): void {
        const props = this.props;

        if (props.configurationId !== prevProps.configurationId) {
            props.updatePreviewPaneConfig();
        }

        // When this component first renders, the theme preview config is empty. In order to prevent a flash of styling
        // and to protect from needless re-rendering of stylesheets, we will only re-render if the previous config was
        // not empty and the current config is present.
        if (prevProps.themePreviewConfig.configurationId !== '' &&
            props.themePreviewConfig !== prevProps.themePreviewConfig) {

            this.jsChannel.call({
                // TODO handle error callbacks
                method: 'reload-stylesheets',
                params: JSON.stringify({
                    configurationId: props.themePreviewConfig.configurationId,
                }),
                success: (v: any) => props.previewPaneLoaded(),
            });
        }

        if (props.needsForceReload) {
            this.jsChannel.call({
                // TODO handle error callbacks
                method: 'reload-page',
                params: JSON.stringify({}),
                success: (v: any) => {
                    this.props.previewPanePageReloaded();
                    props.previewPaneLoaded();
                },
            });
        }

        if (props.fontUrl !== prevProps.fontUrl) {
            this.jsChannel.call({
                // TODO handle error callbacks
                method: 'add-font',
                params: JSON.stringify({
                    fontUrl: props.fontUrl,
                }),
                success: (v: any) => props.previewPaneLoaded(),
            });
        }
    }

    render(): JSX.Element {
        const { isFetching, isRotated, pageUrl, viewportType } = this.props;

        // TODO show loading indicator until preview pane is ready
        return (
            <PreviewPaneContainer showBorder={viewportType === VIEWPORT_TYPES.DESKTOP}>
                {this.iframeReady() &&
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

    private iframeReady = () => {
        const {
            pageUrl,
            themePreviewConfig,
        } = this.props;

        return pageUrl && themePreviewConfig.versionId;
    };

    private onLoad = () => {
        if (!this.iframeRef || !this.iframeRef.contentDocument || !this.iframeRef.contentWindow) {
            return;
        }

        // Make sure the preview sdk channel is ready
        this.setupChannel(this.iframeRef);

        const href = this.iframeRef.contentWindow.location.href;
        const page = href.split(/https?:\/\/[^\/]+/)[1];

        if (page !== this.props.page) {
            this.props.updatePage({ page });
        }
    };

    private setupChannel = (iframe: HTMLIFrameElement) => {
        // The channel should only be set up once.
        if (this.jsChannel) {
            return;
        }

        // Stand up the channel for bi-directional communication with the preview pane.
        // See: https://github.com/bigcommerce-labs/stencil-preview-sdk
        this.jsChannel = Channel.build({
            // debugOutput: true,
            // onReady: () => console.log('channel ready'),
            origin: '*',
            publish: true,
            reconnect: true,
            scope: 'stencilEditor',
            window: iframe.contentWindow,
        });

        // Bind this channel to specific event types. Events which are bound are fired from the Stencil Preview Sdk.
        this.jsChannel.bind('sdk-ready', (v: any) => {
            // TODO
        });

        this.jsChannel.bind('sdk-not-ready', (v: any) => {
            // TODO
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
    updatePage,
    updatePreviewPaneConfig,
}, dispatch);

export default connect<Partial<PreviewPaneProps>, Partial<PreviewPaneProps>, {}, State>(
    mapStateToProps, mapDispatchToProps
)(PreviewPane);
