import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, RouteComponentProps } from 'react-router-dom';

import { State } from '../../reducers/reducers';

import ThemeModule from './ThemeModule';

interface ThemeVersionsProps extends RouteComponentProps<{}> {
  themeVariants: ThemePropsList;
}

export interface ThemePropsList extends Array<StateProps> {}

interface StateProps {
  image: string;
  name: string;
}

const ThemeVersions = (props: ThemeVersionsProps) => (
  <Route
    path="/design/theme"
    exact
    render={() => <ThemeModule variants={props.themeVariants} />}
  />
);

const mapStateToProps = (state: State) => ({
  themeVariants: state.theme.themeVariations.map(({ screenshot, variationName }): StateProps => ({
    image: screenshot.smallThumb,
    name: variationName,
  })),
});

export default withRouter(connect(mapStateToProps)(ThemeVersions));
