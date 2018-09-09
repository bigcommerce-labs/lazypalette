import React, { PureComponent, SFC } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, RouteComponentProps } from 'react-router-dom';
import { Dispatch } from 'redux';

import { loadTheme } from '../../actions/theme';
import { State } from '../../reducers/reducers';
import { ThemeVariationHistory, ThemeVariationHistoryEntry } from '../../reducers/theme';
import Draggable from '../Draggable/Draggable';
import ExpandableMenu from '../ExpandableMenu/ExpandableMenu';
import ConfirmModal from '../Modal/ConfirmModal/ConfirmModal';
import { appRoutes } from '../Routes/Routes';

import { Messages, PostLaunchTypeLabels, PreLaunchTypeLabels } from './constants';
import { EntryActive, EntryDate, EntryTitle, HistoryEntry, List } from './styles';

interface ThemeHistoryProps extends RouteComponentProps<{}> {
    configurationId: string;
    isChanged: boolean;
    isPrelaunchStore: boolean;
    position: { x: number, y: number };
    variationHistory: ThemeVariationHistory;
    loadTheme(configurationId: string, variationId: string): Dispatch<State>;
}

interface ThemeHistoryState {
    confirmData: {
        configurationId: string;
        variationId: string;
    };
    isConfirmOpen: boolean;
}

export class ThemeHistory extends PureComponent<ThemeHistoryProps, ThemeHistoryState> {
    readonly state: ThemeHistoryState = {
        confirmData: {
            configurationId: '',
            variationId: '',
        },
        isConfirmOpen: false,
    };

    openModal = (variationId: string, configurationId: string) => this.setState({
        confirmData: {
            configurationId,
            variationId,
        },
        isConfirmOpen: true,
    });

    handleModalCancel = () => this.setState({
        isConfirmOpen: false,
    });

    handleModalConfirm = () => {
        const { configurationId, variationId } = this.state.confirmData;

        this.setState({
            isConfirmOpen: false,
        }, () => {
            this.props.loadTheme(variationId, configurationId);
        });
    };

    handleEntrySelect = (variationId: string, configurationId: string) => {
        if (this.props.isChanged) {
            this.openModal(variationId, configurationId);
        } else {
            this.props.loadTheme(variationId, configurationId);
        }
    };

    getEntryDateString(entry: ThemeVariationHistoryEntry) {
        const dateString = new Date(entry.timestamp).toLocaleDateString('en', {
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            month: 'long',
            timeZone: 'UTC',
            year: 'numeric',
        });

        const typeLabels = this.props.isPrelaunchStore ? PreLaunchTypeLabels : PostLaunchTypeLabels;
        const typeString = typeLabels[entry.type] || entry.type;

        return entry.type === 'default' ? typeString : `${typeString} ${dateString}`;
    }

    render() {
        const { match, position, variationHistory} = this.props;
        const { isConfirmOpen } = this.state;

        return (
            <>
                <Draggable position={position}>
                    <ExpandableMenu title="History" back={match.url}>
                        <List>
                            {variationHistory.map(entry => (
                                <HistoryEntry
                                    onClick={() =>
                                        this.handleEntrySelect(entry.variationId, entry.configurationId)}
                                    key={entry.configurationId}>
                                    <EntryDate>
                                        {this.getEntryDateString(entry)}
                                        {entry.configurationId === this.props.configurationId &&
                                            <EntryActive/>}
                                    </EntryDate>
                                    <EntryTitle>
                                        Version {entry.displayVersion}
                                    </EntryTitle>
                                </HistoryEntry>
                            ))}
                        </List>
                    </ExpandableMenu>
                </Draggable>
                {isConfirmOpen &&
                    <ConfirmModal
                        body={Messages.Reset}
                        primaryAction={this.handleModalConfirm}
                        secondaryAction={this.handleModalCancel}
                        title="Theme Change Warning"
                    />
                }
            </>
        );
    }
}

const RoutedThemeHistory: SFC<ThemeHistoryProps> = props => (
    <Route
        path={appRoutes.history.path}
        exact
        render={() => <ThemeHistory {...props}/>}
    />
);

const mapStateToProps = (state: State) => ({
    configurationId: state.theme.initialConfigurationId,
    isChanged: state.theme.isChanged,
    isPrelaunchStore: state.merchant.isPrelaunchStore,
    variationHistory: state.theme.variationHistory,
});

const mapDispatchToProps = {
    loadTheme,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RoutedThemeHistory));
