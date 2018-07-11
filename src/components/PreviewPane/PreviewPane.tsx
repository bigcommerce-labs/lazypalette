import React, { PureComponent } from 'react';
import { connect, Dispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

import { clearErrors } from '../../actions/error';
import { fetchPageSource } from '../../actions/previewPane';
import { State } from '../../reducers/reducers';
import { WindowService } from '../../services/window';

import { PreviewPaneContainer, PreviewPaneIframe } from './styles';
import { IndicatorBoundary } from './IndicatorBoundary';

interface PreviewPaneProps {
    errors: Error[];
    isFetching: boolean;
    page: string;
    pageSource: string;
    loadPage(page: string): void;
    clearErrors(): void;
}

class PreviewPane extends PureComponent<PreviewPaneProps> {
    handleMessage = (event: MessageEvent) => {
        if (event.data === 'ping') {
            console.log('pong'); // tslint:disable-line
        }
    };

    componentDidMount(): void {
        WindowService.getInstance().addEventListener('message', this.handleMessage);
        this.props.loadPage(this.props.page);
    }

    componentWillUnmount(): void {
        WindowService.getInstance().removeEventListener('message', this.handleMessage);
    }

    render(): JSX.Element {
        const { pageSource } = this.props;

        return (
            <PreviewPaneContainer>
                <IndicatorBoundary {...this.props}>
                    <PreviewPaneIframe srcDoc={pageSource}/>
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
