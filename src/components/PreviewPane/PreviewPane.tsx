import React, { PureComponent } from 'react';
import { connect, Dispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { State } from '../../reducers/reducers';
import { fetchPageSource } from '../../actions/previewPane';
import { PreviewPaneContainer, PreviewPaneIframe } from './styles';
import { IndicatorBoundary } from './IndicatorBoundary';
import { WindowService } from '../../services/window';

interface PreviewPaneProps {
  isError: boolean;
  isFetching: boolean;
  page: string;
  pageSource: string;
  loadPage(page: string): void;
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
          <PreviewPaneIframe srcDoc={pageSource} />
        </IndicatorBoundary>
      </PreviewPaneContainer>
    );
  }
}

const mapStateToProps = (state: State): Partial<PreviewPaneProps> => state.previewPane;

const mapDispatchToProps = (dispatch: Dispatch): Partial<PreviewPaneProps> => bindActionCreators({
  loadPage: fetchPageSource,
}, dispatch);

export default connect<Partial<PreviewPaneProps>, Partial<PreviewPaneProps>, {}, State>(
  mapStateToProps, mapDispatchToProps
)(PreviewPane);
