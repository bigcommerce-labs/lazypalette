import React, { PureComponent } from 'react';
import { connect, Dispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

import { clearErrors } from '../../actions/error';
import {
    fetchPageUrl,
    previewPaneLoaded,
    previewPaneLoading,
    updatePreviewPaneConfig } from '../../actions/previewPane';
import { ThemePreviewConfig } from '../../reducers/previewPane';
import { State } from '../../reducers/reducers';
import { generateStylesheetUrl } from '../../services/previewPane';
import { StoreDesignSdk, StoreDesignSdkEvents } from '../../services/storeDesignSdk';
import { WindowService } from '../../services/window';

import { PreviewPaneContainer, PreviewPaneIframe } from './styles';
import { IndicatorBoundary } from './IndicatorBoundary';

interface Raven {
    isSetup(): boolean;
    captureException(e: Error): void;
}

declare global { interface Window { Raven: Raven; } }

export interface ViewportType {
    glyphName: string;
    viewportHeight: string;
    viewportWidth: string;
}

interface PreviewPaneProps {
    configurationId: string;
    errors: Error[];
    fontUrl: string | null;
    isFetching: boolean;
    isRotated: boolean;
    page: string;
    pageUrl: string;
    themePreviewConfig: ThemePreviewConfig;
    viewportType: ViewportType;
    loadPage(page: string): (dispatch: Dispatch, getState: () => State) => void;
    clearErrors(): void;
    previewPaneLoaded(): void;
    previewPaneLoading(): void;
    updatePreviewPaneConfig(): void;
}

class PreviewPane extends PureComponent<PreviewPaneProps> {
    private iframeRef: HTMLIFrameElement;

    handleMessage = (event: MessageEvent): void => {
        if (!event.data) {
            return;
        }

        let message;

        try {
            message = JSON.parse(event.data);
        } catch (e) {
            if (window.Raven && window.Raven.isSetup()) {
                window.Raven.captureException(e);
            }

            return;
        }

        if (message && message.type === StoreDesignSdkEvents.STORE_DESIGN_SDK_LOAD) {
            this.updateCookies();
        }
    };

    componentDidMount(): void {
        WindowService.getInstance().addEventListener('message', this.handleMessage);
        this.props.loadPage(this.props.page);
        this.updateStyles();

        if (this.props.fontUrl) {
            this.updateFonts();
        }
    }

    componentDidUpdate(prevProps: PreviewPaneProps): void {
        if (this.props.configurationId !== prevProps.configurationId) {
            this.props.updatePreviewPaneConfig();
        }

        if (this.props.themePreviewConfig !== prevProps.themePreviewConfig) {
            this.updateStyles();
        }

        if (this.props.fontUrl !== prevProps.fontUrl) {
            this.updateFonts();
        }
    }

    componentWillUnmount(): void {
        WindowService.getInstance().removeEventListener('message', this.handleMessage);
    }

    render(): JSX.Element {
        const {
            isFetching,
            isRotated,
            pageUrl,
            viewportType } = this.props;

        return (
            <PreviewPaneContainer>
                <IndicatorBoundary {...this.props}>
                    <PreviewPaneIframe
                        innerRef={(x: HTMLIFrameElement) => (this.iframeRef = x)}
                        isFetching={isFetching}
                        isRotated={isRotated}
                        onLoad={this.onLoad}
                        src={pageUrl}
                        viewportType={viewportType}
                    />
                </IndicatorBoundary>
            </PreviewPaneContainer>
        );
    }

    private onLoad = () => {
        if (!this.iframeRef || !this.iframeRef.contentDocument) {
            return;
        }

        const doc: HTMLDocument = this.iframeRef.contentDocument;
        const storeDesignSdkScripts = StoreDesignSdk.getScripts(doc);

        storeDesignSdkScripts.forEach(script => doc.body.appendChild(script));
    };

    private updateCookies() {
        const { configurationId, lastCommitId, versionId } = this.props.themePreviewConfig;
        const data = {
            payload: {
                configurationId,
                lastCommitId,
                versionId,
            },
            type: StoreDesignSdkEvents.STORE_DESIGN_UPDATE_COOKIES,
        };

        if (this.iframeRef && this.iframeRef.contentWindow) {
            this.iframeRef.contentWindow.postMessage(JSON.stringify(data), '*');
        }
    }

    private updateStyles() {
        const { configurationId, lastCommitId, versionId } = this.props.themePreviewConfig;

        if (!this.iframeRef || !this.iframeRef.contentDocument || configurationId === '') {
            return;
        }

        const doc: HTMLDocument = this.iframeRef.contentDocument;
        const linkNodes: NodeListOf<HTMLLinkElement> = doc.head.querySelectorAll('link[data-stencil-stylesheet]');
        const links: HTMLLinkElement[] = Array.prototype.slice.call(linkNodes);

        const styleUpdaters: Array<Promise<any>>
            = links.map((currentLink: HTMLLinkElement) => {
                const url = currentLink.getAttribute('href');

                return new Promise((resolve, reject) => {
                    let newLink: HTMLLinkElement;

                    // if condition is added because generateStylesheetUrl
                    // assumes url might be null and throws a error
                    if (!url) {
                        return resolve();
                    }

                    const stylesheetLoad = () => {
                        newLink.removeAttribute('data-is-loading');
                        // Destroy any existing handlers to save memory on subsequent stylesheet changes
                        newLink.removeEventListener('error', stylesheetError);
                        newLink.removeEventListener('load', stylesheetLoad);

                        // Remove the old stylesheet to allow the new one to take over
                        doc.head.removeChild(currentLink);

                        self.document.body.focus();

                        resolve();
                    };

                    const stylesheetError = () => {
                        // Something went wrong with our new stylesheet, so destroy it and keep the old one
                        newLink.removeEventListener('error', stylesheetError);
                        newLink.removeEventListener('load', stylesheetLoad);

                        doc.head.removeChild(newLink);

                        reject();
                    };

                    if (currentLink.hasAttribute('data-is-loading')) {
                        doc.head.removeChild(currentLink);

                        resolve();
                    } else {
                        newLink = (currentLink.cloneNode(false) as HTMLLinkElement);

                        newLink.setAttribute('href', generateStylesheetUrl(url, {
                            configurationId, lastCommitId, versionId,
                        }));
                        newLink.setAttribute('data-is-loading', 'true');

                        newLink.addEventListener('load', stylesheetLoad);
                        newLink.addEventListener('error', stylesheetError);

                        // Insert the new stylesheet before the old one to avoid any flash of un-styled content.
                        // The load and error events only work for the initial load,
                        // which is why we replace the link on each update.
                        doc.head.insertBefore(newLink, currentLink);
                    }
                });
            });

        Promise.all(styleUpdaters)
            .then(() => {
                this.props.previewPaneLoaded();
            })
            .catch(() => {
                this.props.previewPaneLoaded();
            });
    }

    private updateFonts() {
        if (!this.props.fontUrl || !this.iframeRef || !this.iframeRef.contentDocument) {
            return;
        }

        const doc: HTMLDocument = this.iframeRef.contentDocument;
        const link = doc.createElement('link');

        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('href', this.props.fontUrl);

        link.addEventListener('load', function linkLoadHandler() {
            link.removeEventListener('load', linkLoadHandler);

            doc.body.focus();
        });

        doc.head.appendChild(link);
    }
}

const mapStateToProps = (state: State): Partial<PreviewPaneProps> => {
    return {
        ...state.previewPane,
        ...{ errors: state.error.errors},
        ...{ configurationId: state.theme.configurationId},
    };
};

const mapDispatchToProps = (dispatch: Dispatch): Partial<PreviewPaneProps> => bindActionCreators({
    clearErrors,
    loadPage: (page: string) => fetchPageUrl({ page }),
    previewPaneLoaded,
    previewPaneLoading,
    updatePreviewPaneConfig,
}, dispatch);

export default connect<Partial<PreviewPaneProps>, Partial<PreviewPaneProps>, {}, State>(
    mapStateToProps, mapDispatchToProps
)(PreviewPane);
