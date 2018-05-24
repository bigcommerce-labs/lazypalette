import { Dispatch } from 'redux';

import { State } from '../reducers/reducers';
import { ThemeSchema, ThemeVariations } from '../reducers/theme';
import * as api from '../services/themeApi';

export enum ThemeActionTypes {
  CURRENT_THEME_ERROR = 'CURRENT_THEME_ERROR',
  CURRENT_THEME_RESPONSE = 'CURRENT_THEME_RESPONSE',
  THEME_CONFIG_ERROR = 'THEME_CONFIG_ERROR',
  THEME_CONFIG_RESPONSE = 'THEME_CONFIG_RESPONSE',
  THEME_VERSION_ERROR = 'THEME_VERSION_ERROR',
  THEME_VERSION_RESPONSE = 'THEME_VERSION_RESPONSE',
}

export type ThemeAction =
  | CurrentThemeResponseAction
  | CurrentThemeErrorAction
  | ThemeVersionResponseAction
  | ThemeVersionErrorAction
  | ThemeConfigResponseAction
  | ThemeConfigErrorAction;

export interface CurrentThemeErrorAction {
  type: ThemeActionTypes.CURRENT_THEME_ERROR;
}

export interface CurrentThemeResponseAction {
  data: CurrentThemeResponse;
  type: ThemeActionTypes.CURRENT_THEME_RESPONSE;
}

export interface ThemeConfigErrorAction {
  type: ThemeActionTypes.THEME_CONFIG_ERROR;
}

export interface ThemeConfigResponseAction {
  data: ThemeConfigResponse;
  type: ThemeActionTypes.THEME_CONFIG_RESPONSE;
}

export interface ThemeVersionErrorAction {
  type: ThemeActionTypes.THEME_VERSION_ERROR;
}

export interface ThemeVersionResponseAction {
  data: ThemeVersionResponse;
  type: ThemeActionTypes.THEME_VERSION_RESPONSE;
}

export interface CurrentThemeResponse {
  configurationId: string;
  relatedVariations: ThemeVariations;
  versionId: string;
}

export interface ThemeConfigResponse {
  storeHash: string;
}

export interface ThemeVersionResponse {
  editorSchema: ThemeSchema;
}

export function currentThemeResponse(data: CurrentThemeResponse): CurrentThemeResponseAction {
  return {
    data,
    type: ThemeActionTypes.CURRENT_THEME_RESPONSE,
  };
}

export function currentThemeError(): CurrentThemeErrorAction {
  return {
    type: ThemeActionTypes.CURRENT_THEME_ERROR,
  };
}

export function themeConfigResponse(data: ThemeConfigResponse): ThemeConfigResponseAction {
  return {
    data,
    type: ThemeActionTypes.THEME_CONFIG_RESPONSE,
  };
}

export function themeConfigError(): ThemeConfigErrorAction {
  return {
    type: ThemeActionTypes.THEME_CONFIG_ERROR,
  };
}

export function themeVersionResponse(data: ThemeVersionResponse): ThemeVersionResponseAction {
  return {
    data,
    type: ThemeActionTypes.THEME_VERSION_RESPONSE,
  };
}

export function themeVersionError(): ThemeVersionErrorAction {
  return {
    type: ThemeActionTypes.THEME_VERSION_ERROR,
  };
}

export function fetchCurrentTheme() {
  return (dispatch: Dispatch<State>) => {
    return api.fetchCurrentTheme()
      .then(({ configurationId, versionId, relatedVariations }) => {
        return dispatch(currentThemeResponse({ configurationId, versionId, relatedVariations }));
      })
      .catch(() => dispatch(currentThemeError()));
  };
}

export function fetchThemeConfig(configurationId: string) {
  return (dispatch: Dispatch<State>) => {
    return api.fetchThemeConfig(configurationId)
      .then(({ storeHash }) => dispatch(themeConfigResponse({ storeHash })))
      .catch(() => dispatch(themeConfigError()));
  };
}

export function fetchThemeVersion(storeHash: string, versionId: string) {
  return (dispatch: Dispatch<State>) => {
    return api.fetchThemeVersion(storeHash, versionId)
      .then(({ editorSchema }) => dispatch(themeVersionResponse({ editorSchema })))
      .catch(() => dispatch(themeVersionError()));
  };
}

export function fetchInitialState() {
  return (dispatch: Dispatch<State>, getState: () => State) => {
    return dispatch(fetchCurrentTheme())
      .then(() => dispatch(fetchThemeConfig(getState().theme.configurationId)))
      .then(() => dispatch(fetchThemeVersion(getState().theme.storeHash, getState().theme.versionId)));
  };
}
