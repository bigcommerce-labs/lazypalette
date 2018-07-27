import React, { PureComponent } from 'react';
import { connect, Dispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

import { clearErrors } from '../../actions/error';
import { fetchPageSource, receiveThemeConfigChange } from '../../actions/previewPane';
import { ThemePreviewConfig } from '../../reducers/previewPane';
import { State } from '../../reducers/reducers';
import { generateStylesheetUrl } from '../../services/previewPane';
import { WindowService } from '../../services/window';

import { PreviewPaneContainer, PreviewPaneIframe } from './styles';
import { IndicatorBoundary } from './IndicatorBoundary';

export interface ViewportType {
    glyphName: string;
    viewportHeight: string;
    viewportWidth: string;
}

interface PreviewPaneProps {
    configurationId: string;
    errors: Error[];
    isFetching: boolean;
    isRotated: boolean;
    page: string;
    pageSource: string;
    themePreviewConfig: ThemePreviewConfig;
    viewportType: ViewportType;
    loadPage(page: string): void;
    clearErrors(): void;
    receiveThemeConfigChange(): void;
}

class PreviewPane extends PureComponent<PreviewPaneProps> {
    private iframeRef: HTMLIFrameElement;

    handleMessage = (event: MessageEvent) => {
        if (event.data === 'ping') {
            console.log('pong'); // tslint:disable-line
        }
    };

    componentDidMount(): void {
        WindowService.getInstance().addEventListener('message', this.handleMessage);
        this.props.loadPage(this.props.page);
        this.updateStyles();
    }

    componentDidUpdate(prevProps: PreviewPaneProps): void {
        if (this.props.configurationId !== prevProps.configurationId) {
            this.props.receiveThemeConfigChange();
        }
        this.updateStyles();
    }

    componentWillUnmount(): void {
        WindowService.getInstance().removeEventListener('message', this.handleMessage);
    }

    render(): JSX.Element {
        const { isRotated, pageSource, viewportType } = this.props;

        return (
            <PreviewPaneContainer>
                <IndicatorBoundary {...this.props}>
                    <PreviewPaneIframe
                        innerRef={(x: HTMLIFrameElement) => (this.iframeRef = x)}
                        isRotated={isRotated}
                        srcDoc={pageSource}
                        viewportType={viewportType}
                    />
                </IndicatorBoundary>
            </PreviewPaneContainer>
        );
    }

    private updateStyles() {
        const { configurationId, lastCommitId, versionId } = this.props.themePreviewConfig;

        if (this.iframeRef && this.iframeRef.contentDocument && configurationId !== '') {
            const doc: HTMLDocument = this.iframeRef.contentDocument;
            const linkNodes: NodeListOf<HTMLLinkElement> = doc.head.querySelectorAll('link[data-stencil-stylesheet]');
            const links: HTMLLinkElement[] = Array.prototype.slice.call(linkNodes);

            links.forEach((currentLink: HTMLLinkElement) => {
                const url = currentLink.getAttribute('href');
                let newLink: HTMLLinkElement;

                if (!url) {
                    return;
                }

                if (currentLink.hasAttribute('data-is-loading')) {
                    doc.head.removeChild(currentLink);
                } else {
                    newLink = (currentLink.cloneNode(false) as HTMLLinkElement);

                    newLink.setAttribute('href', generateStylesheetUrl(url, {
                        configurationId, lastCommitId, versionId,
                    }));
                    newLink.setAttribute('data-is-loading', 'true');

                    newLink.addEventListener('load', stylesheetLoad);
                    newLink.addEventListener('error', stylesheetError);

                    // Insert the new stylesheet before the old one to avoid any flash of un-styled content. The load
                    // and error events only work for the initial load, which is why we replace the link on each update.
                    doc.head.insertBefore(newLink, currentLink);
                }

                function stylesheetLoad() {
                    newLink.removeAttribute('data-is-loading');

                    // Destroy any existing handlers to save memory on subsequent stylesheet changes
                    newLink.removeEventListener('error', stylesheetError);
                    newLink.removeEventListener('load', stylesheetLoad);

                    // Remove the old stylesheet to allow the new one to take over
                    doc.head.removeChild(currentLink);

                    self.document.body.focus();
                }

                function stylesheetError() {
                    // Something went wrong with our new stylesheet, so destroy it and keep the old one
                    newLink.removeEventListener('error', stylesheetError);
                    newLink.removeEventListener('load', stylesheetLoad);

                    doc.head.removeChild(newLink);
                }
            });
        }
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
    loadPage: fetchPageSource,
    receiveThemeConfigChange,
}, dispatch);

export default connect<Partial<PreviewPaneProps>, Partial<PreviewPaneProps>, {}, State>(
    mapStateToProps, mapDispatchToProps
)(PreviewPane);
