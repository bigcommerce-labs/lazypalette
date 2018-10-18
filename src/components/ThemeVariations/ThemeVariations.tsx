import { LocationDescriptor } from 'history';
import React, {PureComponent, SFC} from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, RouteComponentProps } from 'react-router-dom';
import { Dispatch } from 'redux';

import { ToastMessages, ToastType } from '../../actions/constants';
import { setQueryParams, QueryParamsData, UpdateQueryParamsAction } from '../../actions/merchant';
import { createNotification } from '../../actions/notifications';
import { updateExpandableMenuPosition, Position, UpdateExpandableMenuPositionAction } from '../../actions/sideMenu';
import { loadTheme, LoadThemeResponseAction } from '../../actions/theme';
import { State } from '../../reducers/reducers';
import { trackVariationChange } from '../../services/analytics';
import { updateQueryParamsService } from '../../services/queryParam';
import Draggable from '../Draggable/Draggable';
import ExpandableMenu from '../ExpandableMenu/ExpandableMenu';
import ConfirmModal from '../Modal/ConfirmModal/ConfirmModal';
import { appRoutes } from '../Routes/Routes';

import { Messages } from './constants';
import ThemeModule from './ThemeModule';

interface ThemeVariationsProps extends RouteComponentProps<{}> {
    isChanged: boolean;
    position: Position;
    queryParams: string;
    themeVariants: ThemePropsList;
    createNotification(autoDismiss: boolean, message: string, type: string): Dispatch<State>;
    loadTheme(variationID: string): any;
    setQueryParams(queryData: QueryParamsData): UpdateQueryParamsAction;
    updateExpandableMenuPosition(expandableMenuPosition: Position): UpdateExpandableMenuPositionAction;
}

export interface ThemePropsList extends Array<StateProps> {}

interface StateProps {
    isActive: boolean;
    image: string;
    name: string;
    variationId: string;
}

interface ThemeVariationsState {
    isConfirmOpen: boolean;
    variationId: string;
}

export class ThemeVariations extends PureComponent<ThemeVariationsProps, ThemeVariationsState> {
    readonly state: ThemeVariationsState = {
        isConfirmOpen: false,
        variationId: '',
    };

    open = (variationId: string) => this.setState({
        isConfirmOpen: true,
        variationId,
    });

    close = () => this.setState({
        isConfirmOpen: false,
        variationId: '',
    });

    handleChange = () => {
        const { variationId } = this.state;

        this.setState({
            isConfirmOpen: false,
            variationId: '',
        }, () => {
            this.switchVariations(variationId);
        });
    };

    handleVariationChange = (variationId: string): void => {
        const { isChanged } = this.props;

        isChanged ? this.open(variationId) : this.switchVariations(variationId);
    };

    switchVariations = (variationId: string) => {
        // TODO: Polyfill Array.prototype.find or use lodash, ie11 doesnt support .find method
        const variation = this.props.themeVariants.filter(v => v.variationId === variationId)[0];

        if (variation === undefined) {
            throw new Error(`Unable to find variation with variationId ${variationId}`);
        }

        const { name } = variation;
        trackVariationChange(variationId, name);
        this.props.loadTheme(variationId)
            .then((result: LoadThemeResponseAction) => {
                if (result.error) {
                    this.props.createNotification(true, ToastMessages.ErrorVariation, ToastType.Error);
                } else {
                    const queryParams: string = updateQueryParamsService({ variationId });
                    this.props.setQueryParams({queryParams});
                }
            });
    };

    render() {
        const {  match, position, themeVariants } = this.props;
        const { isConfirmOpen } = this.state;
        const locationDescriptor: LocationDescriptor = {
            pathname: match.url,
            search: this.props.queryParams,
        };

        return (
                <>
                    <Draggable position={position}>
                        <ExpandableMenu
                            back={locationDescriptor}
                            minHeight="20rem"
                            title="Styles"
                            updatePosition={this.props.updateExpandableMenuPosition}
                        >
                            <ThemeModule
                                variants={themeVariants}
                                handleVariationChange={this.handleVariationChange}
                            />

                        </ExpandableMenu>
                    </Draggable>
                    {isConfirmOpen &&
                        <ConfirmModal
                            primaryAction={this.handleChange}
                            secondaryAction={this.close}
                            title="Theme Change Warning"
                        >
                            {Messages.Variation}
                        </ConfirmModal>
                    }
                </>
        );
    }
}

const RoutedThemeVariations: SFC<ThemeVariationsProps> = props => (
    <Route
        path={appRoutes.styles.path}
        exact
        render={() => <ThemeVariations {...props}/>}
    />
);

const mapStateToProps = (state: State) => ({
    isChanged: state.theme.isChanged,
    position: state.sideMenu.expandableMenuPosition,
    queryParams: state.merchant.queryParams,
    themeVariants: state.theme.variations.map(({ screenshot, variationName, id }): StateProps => ({
        image: screenshot.largeThumb,
        isActive: state.theme.variationId === id,
        name: variationName,
        variationId: id,
    })),
});

const mapDispatchToProps = {
    createNotification,
    loadTheme,
    setQueryParams,
    updateExpandableMenuPosition,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RoutedThemeVariations));
