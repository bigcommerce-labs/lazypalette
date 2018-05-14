import { combineReducers } from 'redux';

import theme, { ThemeState } from './theme';

export interface State {
  theme: ThemeState;
}

const reducers = combineReducers({
  theme,
});

export default reducers;
