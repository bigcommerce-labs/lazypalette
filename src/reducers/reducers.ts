import { combineReducers } from 'redux';
import previewPane, { PreviewPaneState } from './previewPane';
import theme, { ThemeState } from './theme';

export interface State {
  previewPane: PreviewPaneState;
  theme: ThemeState;
}

const reducers = combineReducers({ previewPane, theme });

export const updateState = <StateType>(
  oldState: StateType,
  newState: object
): StateType => (Object.assign({}, oldState, newState));

export default reducers;
