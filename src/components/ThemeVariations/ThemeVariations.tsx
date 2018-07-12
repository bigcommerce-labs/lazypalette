import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, RouteComponentProps } from 'react-router-dom';
import { Dispatch } from 'redux';

import { changeThemeVariation } from '../../actions/theme';
import { State } from '../../reducers/reducers';
import ExpandableMenu from '../ExpandableMenu/ExpandableMenu';

import ThemeModule from './ThemeModule';

interface ThemeVariationsProps extends RouteComponentProps<{}> {
    isChanged: boolean;
    themeVariants: ThemePropsList;
    changeThemeVariation(variationID: string): Dispatch<State>;
}

export interface ThemePropsList extends Array<StateProps> {}

interface StateProps {
    isActive: boolean;
    image: string;
    name: string;
    variationId: string;
}

class ThemeVariations extends PureComponent <ThemeVariationsProps> {
    alertAndChange = (variationId: string) => {
        const status = confirm('This variation has unpublished changes. Do you want to proceed?');
        if (status) {
            this.props.changeThemeVariation(variationId);
        }
    };

    handleVariationChange = (variationId: string): void => {
        const { isChanged } = this.props;

        isChanged ? this.alertAndChange(variationId) : this.props.changeThemeVariation(variationId);
    };

    render() {
        const { match, themeVariants} = this.props;

        return (
            <Route
                path="/design/theme"
                exact
                render={() => (
                    <ExpandableMenu title="Store theme" back={match.url}>
                        <ThemeModule
                            variants={themeVariants}
                            handleVariationChange={this.handleVariationChange}
                        />
                    </ExpandableMenu>
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
    changeThemeVariation,
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ThemeVariations));
