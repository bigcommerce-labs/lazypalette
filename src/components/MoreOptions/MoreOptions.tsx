import React, { PureComponent, SFC } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, RouteComponentProps } from 'react-router-dom';
import { Dispatch } from 'redux';

import { loadTheme } from '../../actions/theme';
import { State } from '../../reducers/reducers';
import { ThemeVariationsEntry } from '../../reducers/theme';

import Draggable from '../Draggable/Draggable';
import ExpandableMenu from '../ExpandableMenu/ExpandableMenu';
import ConfirmModal from '../Modal/ConfirmModal/ConfirmModal';
import { appRoutes } from '../Routes/Routes';

import {RestoreOriginalText} from './constants';
import { Item, List } from './styles';

interface MoreOptionsProps extends RouteComponentProps<{}> {
    currentVariationEntry: ThemeVariationsEntry;
    isChanged: boolean;
    position: { x: number, y: number };
    variationId: string;
    loadTheme(configurationId: string, variationId: string): Dispatch<State>;
}

interface MoreOptionsState {
    isResetOpen: boolean;
}

export class MoreOptions extends PureComponent<MoreOptionsProps, MoreOptionsState> {
    readonly state: MoreOptionsState = {
        isResetOpen: false,
    };

    overlayClose = () => {
        this.setState({ isResetOpen: false });
    };

    handleModalCancel = () => {
        this.setState({ isResetOpen: false });
    };

    handleModalOpen = () => {
        if (this.props.isChanged) {
            this.setState({ isResetOpen: true });
        } else {
            this.handleReset();
        }
    };

    handleReset = () => {
        const { currentVariationEntry, variationId } = this.props;
        const defaultConfigurationId = currentVariationEntry ? currentVariationEntry.defaultConfigurationId : '';
        this.setState({ isResetOpen: false }, () => {
            this.props.loadTheme(variationId, defaultConfigurationId);
        });
    };

    render() {
        const { match, position } = this.props;
        const { isResetOpen } = this.state;

        return (
            <>
                <Draggable position={position}>
                    <ExpandableMenu title="More Options" back={match.url}>
                        <List>
                            <Item data-test-id="go-to-te">Go to old Theme Editor</Item>
                            <Item data-test-id="edit-theme-files">Edit Theme Files</Item>
                            <Item
                                data-test-id="restore-original"
                                onClick={this.handleModalOpen}
                            >
                                Restore original theme styles
                            </Item>
                        </List>
                    </ExpandableMenu>
                </Draggable>
                {isResetOpen &&
                <ConfirmModal
                    body={RestoreOriginalText.body}
                    primaryAction={this.handleReset}
                    primaryActionText={RestoreOriginalText.action}
                    secondaryAction={this.handleModalCancel}
                    overlayClose={this.overlayClose}
                    title={RestoreOriginalText.title}
                />
                }
            </>
        );
    }
}

const RoutedMoreOptions: SFC<MoreOptionsProps> = props => (
    <Route
        path={appRoutes.options.path}
        exact
        render={() => <MoreOptions {...props}/>}
    />
);

const mapStateToProps = (state: State) => ({
    currentVariationEntry: state.theme.variations
        .filter(variationEntry => variationEntry.id === state.theme.variationId)[0],
    isChanged: state.theme.isChanged,
    variationId: state.theme.variationId,
});

const mapDispatchToProps = {
    loadTheme,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RoutedMoreOptions));
