import { LocationDescriptor } from 'history';
import React, { PureComponent, SFC } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, RouteComponentProps } from 'react-router-dom';
import { Dispatch } from 'redux';

import { ToastMessages, ToastType } from '../../actions/constants';
import { createNotification } from '../../actions/notifications';
import { loadTheme, LoadThemeResponseAction } from '../../actions/theme';
import { State } from '../../reducers/reducers';
import { ThemeVariationHistory, ThemeVariationHistoryEntry } from '../../reducers/theme';
import { trackHistoryChange } from '../../services/analytics';
import Draggable from '../Draggable/Draggable';
import ExpandableMenu from '../ExpandableMenu/ExpandableMenu';
import ConfirmModal from '../Modal/ConfirmModal/ConfirmModal';
import { appRoutes } from '../Routes/Routes';

import { Messages, PostLaunchTypeLabels, PreLaunchTypeLabels } from './constants';
import { EntryActive, EntryDescription, EntryVersion, HistoryEntry, List } from './styles';

interface ThemeHistoryProps extends RouteComponentProps<{}> {
    configurationId: string;
    isChanged: boolean;
    isPrelaunchStore: boolean;
    position: { x: number, y: number };
    timeZone?: string; // for testing to ensure consistent snapshots
    variationHistory: ThemeVariationHistory;
    createNotification(autoDismiss: boolean, message: string, type: string): Dispatch<State>;
    loadTheme(configurationId: string, variationId: string): any;
}

interface ThemeHistoryState {
    confirmData: {
        entry?: ThemeVariationHistoryEntry,
    };
    isConfirmOpen: boolean;
}

export class ThemeHistory extends PureComponent<ThemeHistoryProps, ThemeHistoryState> {
    readonly state: ThemeHistoryState = {
        confirmData: {
        },
        isConfirmOpen: false,
    };

    openModal = (entry: ThemeVariationHistoryEntry) => this.setState({
        confirmData: {
            entry,
        },
        isConfirmOpen: true,
    });

    handleModalCancel = () => this.setState({
        isConfirmOpen: false,
    });

    handleModalConfirm = () => {
        this.setState({
            isConfirmOpen: false,
        }, () => {
            this.loadHistoryEntry(this.state.confirmData.entry);
        });
    };

    handleEntrySelect = (entry: ThemeVariationHistoryEntry) => {
        if (this.props.isChanged) {
            this.openModal(entry);
        } else {
            this.loadHistoryEntry(entry);
        }
    };

    loadHistoryEntry = (entry?: ThemeVariationHistoryEntry) => {
        if (entry) {
            const { configurationId, variationId } = entry;
            const text = this.getEntryDescription(entry);
            trackHistoryChange(variationId, configurationId, text);
            this.props.loadTheme(variationId, configurationId)
                .then((result: LoadThemeResponseAction) => {
                    if (result.error) {
                        this.props.createNotification(true, ToastMessages.ErrorHistory, ToastType.Error);
                    }
                });
        }
    };

    getEntryDescription(entry: ThemeVariationHistoryEntry) {
        const date = new Date(entry.timestamp);
        const localeOptions = {
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            month: 'long',
            timeZone: this.props.timeZone,
            year: 'numeric',
        };

        const dateString = date.toLocaleDateString('en', localeOptions);

        const typeLabels = this.props.isPrelaunchStore ? PreLaunchTypeLabels : PostLaunchTypeLabels;
        const typeString = typeLabels[entry.type] || entry.type;

        return this.showDate(entry.type) ? `${typeString} ${dateString}` : typeString;
    }

    showDate = (type: string) => {
        return type === 'installed' || type === 'saved';
    };

    render() {
        const { match, position, variationHistory, location} = this.props;
        const { isConfirmOpen } = this.state;

        const locationDescriptor: LocationDescriptor = {
            pathname: match.url,
            search: location.search,
        };

        return (
            <>
                <Draggable position={position}>
                    <ExpandableMenu title="History" back={locationDescriptor}>
                        <List>
                            {variationHistory.map(entry => (
                                <HistoryEntry
                                    onClick={() =>
                                        this.handleEntrySelect(entry)}
                                    key={entry.configurationId}>
                                    <EntryDescription>
                                        {this.getEntryDescription(entry)}
                                        {entry.configurationId === this.props.configurationId &&
                                            <EntryActive/>}
                                    </EntryDescription>
                                    <EntryVersion>
                                        Version {entry.displayVersion}
                                    </EntryVersion>
                                </HistoryEntry>
                            ))}
                        </List>
                    </ExpandableMenu>
                </Draggable>
                {isConfirmOpen &&
                    <ConfirmModal
                        primaryAction={this.handleModalConfirm}
                        secondaryAction={this.handleModalCancel}
                        title="Theme Change Warning"
                    >
                        {Messages.Reset}
                    </ConfirmModal>
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
    createNotification,
    loadTheme,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RoutedThemeHistory));
