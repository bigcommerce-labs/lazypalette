import React, { PureComponent } from 'react';
import { connect, Dispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

import { clearErrors } from '../../actions/error';
import { fetchPageSource } from '../../actions/previewPane';
import { ThemePreviewConfig } from '../../reducers/previewPane';
import { State } from '../../reducers/reducers';
import { generateStylesheetUrl } from '../../services/previewPane';
import { WindowService } from '../../services/window';

import { PreviewPaneContainer, PreviewPaneIframe } from './styles';
import { IndicatorBoundary } from './IndicatorBoundary';

interface PreviewPaneProps {
    errors: Error[];
    isFetching: boolean;
    page: string;
    pageSource: string;
    themePreviewConfig: ThemePreviewConfig;
    loadPage(page: string): void;
    clearErrors(): void;
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
    }

    componentDidUpdate(): void {
        if (this.iframeRef && this.iframeRef.contentDocument) {
            const { configurationId, lastCommitId, versionId } = this.props.themePreviewConfig;
            const doc: HTMLDocument = this.iframeRef.contentDocument;
            const linkNodes: NodeListOf<HTMLLinkElement> = doc.head.querySelectorAll('link[data-stencil-stylesheet]');
            const links: HTMLLinkElement[] = Array.from(linkNodes);

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

                    newLink.setAttribute('href', generateStylesheetUrl(url,
                        { configurationId, lastCommitId, versionId,
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

    componentWillUnmount(): void {
        WindowService.getInstance().removeEventListener('message', this.handleMessage);
    }

    render(): JSX.Element {
        const { pageSource } = this.props;

        return (
            <PreviewPaneContainer>
                <IndicatorBoundary {...this.props}>
                    <PreviewPaneIframe innerRef={x => (this.iframeRef = x)} srcDoc={pageSource}/>
                </IndicatorBoundary>
            </PreviewPaneContainer>
        );
    }
}

const mapStateToProps = (state: State): Partial<PreviewPaneProps> => {
    return { ...state.previewPane, ...{ errors: state.error.errors } };
};

const mapDispatchToProps = (dispatch: Dispatch): Partial<PreviewPaneProps> => bindActionCreators({
    clearErrors,
    loadPage: fetchPageSource,
}, dispatch);

export default connect<Partial<PreviewPaneProps>, Partial<PreviewPaneProps>, {}, State>(
    mapStateToProps, mapDispatchToProps
)(PreviewPane);
