import { Dispatch } from 'redux';

import { State } from '../reducers/reducers';
import { ThemeSchema, ThemeVariations } from '../reducers/theme';
import * as api from '../services/themeApi';

export enum ThemeActionTypes {
  CURRENT_THEME_ERROR = 'CURRENT_THEME_ERROR',
  CURRENT_THEME_RESPONSE = 'CURRENT_THEME_RESPONSE',
  THEME_CONFIG_ERROR = 'THEME_CONFIG_ERROR',
  THEME_CONFIG_RESPONSE = 'THEME_CONFIG_RESPONSE',
  THEME_CONFIG_CHANGE = 'THEME_CONFIG_CHANGE',
  THEME_VERSION_ERROR = 'THEME_VERSION_ERROR',
  THEME_VERSION_RESPONSE = 'THEME_VERSION_RESPONSE',
  THEME_VARIATION_RESPONSE = 'THEME_VARIATION_RESPONSE',
  THEME_VARIATION_ERROR = 'THEME_VARIATION_ERROR',
}

export type ThemeAction =
  | CurrentThemeResponseAction
  | CurrentThemeErrorAction
  | ThemeVersionResponseAction
  | ThemeVersionErrorAction
  | ThemeConfigResponseAction
  | ThemeConfigErrorAction
  | ThemeConfigChangeAction
  | ThemeVariationResponseAction
  | ThemeVariationErrorAction;

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

export interface ThemeConfigChangeAction {
  data: ThemeConfigChange;
  type: ThemeActionTypes.THEME_CONFIG_CHANGE;
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
  variations: ThemeVariations;
  versionId: string;
}

export interface ThemeVariationResponseAction {
  data: ThemeVariationResponse;
  type: ThemeActionTypes.THEME_VARIATION_RESPONSE;
}

export interface ThemeVariationErrorAction {
  type: ThemeActionTypes.THEME_VARIATION_ERROR;
}

export interface ThemeConfigResponse {
  settings: {[key: string]: string | boolean | number};
  storeHash: string;
}

export interface ThemeConfigChange {
  [key: string]: string | boolean | number;
}

export interface ThemeVersionResponse {
  editorSchema: ThemeSchema;
}

export interface ThemeVariationResponse {
  configurationId: string;
  variations: ThemeVariations;
  versionId: string;
  isPurchased: boolean;
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

export function themeConfigChange(data: ThemeConfigChange): ThemeConfigChangeAction {
  return {
    data,
    type: ThemeActionTypes.THEME_CONFIG_CHANGE,
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

export function themeVariationResponse(data: ThemeVariationResponse): ThemeVariationResponseAction {
  return {
    data,
    type: ThemeActionTypes.THEME_VARIATION_RESPONSE,
  };
}

export function themeVariationError(): ThemeVariationErrorAction {
  return {
    type: ThemeActionTypes.THEME_VARIATION_ERROR,
  };
}

export function fetchCurrentTheme() {
  return (dispatch: Dispatch<State>) => {
    return api.fetchCurrentTheme()
      .then(({ configurationId, versionId, relatedVariations: variations }) => {
         dispatch(currentThemeResponse({ configurationId, versionId, variations }));
         dispatch(fetchThemeConfig(configurationId));
      })
      .catch(() => dispatch(currentThemeError()));
  };
}

export function fetchThemeConfig(configurationId: string) {
  return (dispatch: Dispatch<State>) => {
    return api.fetchThemeConfig(configurationId)
      .then(({ storeHash, settings }) => dispatch(themeConfigResponse({ storeHash, settings })))
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

export function fetchInitialState(storeHash: string, variationId: string) {
  return (dispatch: Dispatch<State>, getState: () => State) => {
    if (variationId !== '') {
      return dispatch(fetchVariation(storeHash, variationId))
        .then(() => dispatch(fetchThemeVersion(storeHash, getState().theme.versionId)));
    } else {
      return dispatch(fetchCurrentTheme())
        .then(() => dispatch(fetchThemeVersion(storeHash, getState().theme.versionId)));
    }
  };
}

export function fetchVariation(storeHash: string, variationId: string) {
  return (dispatch: Dispatch<State>) => {
    return api.fetchVariation(storeHash, variationId)
      .then(({ configurationId, versionId, relatedVariations: variations, isPurchased }) => {
          dispatch(fetchThemeConfig(configurationId));
          dispatch(themeVariationResponse({ configurationId, versionId, variations, isPurchased }));
        })
      .catch( () => dispatch(themeVariationError())
    );
  };
}

export function updateThemeConfigChange(configChange: ThemeConfigChange) {
  return (dispatch: Dispatch<State>) => {
    return dispatch(themeConfigChange(configChange));
  };

}
