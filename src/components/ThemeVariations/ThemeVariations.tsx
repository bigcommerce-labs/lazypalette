import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, RouteComponentProps } from 'react-router-dom';
import { Dispatch } from 'redux';

import { loadTheme } from '../../actions/theme';
import { State } from '../../reducers/reducers';
import ExpandableMenu from '../ExpandableMenu/ExpandableMenu';

import { Messages } from '../Modal/constants';
import ConfirmModal from '../Modal/ConfirmModal';
import { appRoutes } from '../Routes/Routes';

import ThemeModule from './ThemeModule';

interface ThemeVariationsProps extends RouteComponentProps<{}> {
    isChanged: boolean;
    themeVariants: ThemePropsList;
    loadTheme(variationID: string): Dispatch<State>;
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
            this.props.loadTheme(variationId);
        });
    };

    handleVariationChange = (variationId: string): void => {
        const { isChanged } = this.props;

        isChanged ? this.open(variationId) : this.props.loadTheme(variationId);
    };

    render() {
        const { styles } = appRoutes;
        const { match, themeVariants} = this.props;
        const { isConfirmOpen } = this.state;

        return (
            <Route
                path={styles.path}
                exact
                render={() => (
                    <>
                        <ExpandableMenu title="Store theme" back={match.url}>
                            <ThemeModule
                                variants={themeVariants}
                                handleVariationChange={this.handleVariationChange}
                            />
                        </ExpandableMenu>
                        {isConfirmOpen &&
                            <ConfirmModal
                                body={Messages.Variation}
                                primaryAction={this.close}
                                secondaryAction={this.handleChange}
                                title="Theme Change Warning"
                            />
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
        image: screenshot.smallThumb,
        isActive: state.theme.variationId === id,
        name: variationName,
        variationId: id,
    })),
});

const mapDispatchToProps = {
    loadTheme,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ThemeVariations));
