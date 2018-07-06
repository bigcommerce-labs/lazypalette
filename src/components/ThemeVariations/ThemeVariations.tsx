import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, RouteComponentProps } from 'react-router-dom';

import { State } from '../../reducers/reducers';
import ExpandableMenu from '../ExpandableMenu/ExpandableMenu';

import ThemeModule from './ThemeModule';

interface ThemeVariationsProps extends RouteComponentProps<{}> {
  themeVariants: ThemePropsList;
}

export interface ThemePropsList extends Array<StateProps> {}

interface StateProps {
  image: string;
  name: string;
  isActive: boolean;
}

const ThemeVariations = ({match, themeVariants}: ThemeVariationsProps) => (
    <Route
        path="/design/theme"
        exact
        render={() => (
            <ExpandableMenu title="Store theme" back={match.url}>
                <ThemeModule variants={themeVariants} />
            </ExpandableMenu>
        )}
    />
);

const mapStateToProps = (state: State) => ({
    themeVariants: state.theme.variations.map(({ screenshot, variationName, id }): StateProps => ({
        image: screenshot.smallThumb,
        isActive: state.theme.variationId === id,
        name: variationName,
    })),
});

export default withRouter(connect(mapStateToProps)(ThemeVariations));
