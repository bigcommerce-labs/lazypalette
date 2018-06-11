import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, RouteComponentProps } from 'react-router-dom';

import ThemeModule from './ThemeModule';
import ExpandableMenu from '../ExpandableMenu/ExpandableMenu';
import { State } from '../../reducers/reducers';

interface ThemeVariationsProps extends RouteComponentProps<{}> {
  themeVariants: ThemePropsList;
}

export interface ThemePropsList extends Array<StateProps> {}

interface StateProps {
  image: string;
  name: string;
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
  themeVariants: state.theme.variations.map(({ screenshot, variationName }): StateProps => ({
    image: screenshot.smallThumb,
    name: variationName,
  })),
});

export default withRouter(connect(mapStateToProps)(ThemeVariations));
