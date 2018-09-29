import { LocationDescriptor } from 'history';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, RouteComponentProps } from 'react-router-dom';
import { Dispatch } from 'redux';

import { ToastMessages, ToastType } from '../../actions/constants';
import { createNotification } from '../../actions/notifications';
import { loadTheme, LoadThemeResponseAction } from '../../actions/theme';
import { State } from '../../reducers/reducers';
import Draggable from '../Draggable/Draggable';
import ExpandableMenu from '../ExpandableMenu/ExpandableMenu';
import ConfirmModal from '../Modal/ConfirmModal/ConfirmModal';
import { appRoutes } from '../Routes/Routes';

import { Messages } from './constants';
import ThemeModule from './ThemeModule';

interface ThemeVariationsProps extends RouteComponentProps<{}> {
    isChanged: boolean;
    position: { x: number, y: number };
    themeVariants: ThemePropsList;
    createNotification(autoDismiss: boolean, message: string, type: string): Dispatch<State>;
    loadTheme(variationID: string): any;
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

export class ThemeVariations extends PureComponent <ThemeVariationsProps, ThemeVariationsState> {
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
        this.props.loadTheme(variationId)
            .then((result: LoadThemeResponseAction) => {
                if (result.error) {
                    this.props.createNotification(true, ToastMessages.ErrorVariation, ToastType.Error);
                }
            });
    };

    render() {
        const { styles } = appRoutes;
        const { position, match, themeVariants} = this.props;
        const { isConfirmOpen } = this.state;
        const locationDescriptor: LocationDescriptor = {
            pathname: match.url,
            search: this.props.location.search,
        };

        return (
            <Route
                path={styles.path}
                exact
                render={() => (
                    <>
                        <Draggable position={position}>
                            <ExpandableMenu
                                back={locationDescriptor}
                                minHeight="20rem"
                                title="Styles"
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
                )}
            />
        );
    }
}

const mapStateToProps = (state: State) => ({
    isChanged: state.theme.isChanged,
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
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ThemeVariations));
