import { CurrentThemeResponse, ThemeAction, ThemeActionTypes } from '../actions/theme';

export interface ThemeState {
  configurationId: string;
  schema: ThemeSchema;
  storeHash: string;
  themeVariations: ThemeVariations;
  versionId: string;
}

export interface ThemeSchema extends Array<ThemeSchemaEntry> {}

export interface ThemeSchemaEntry {
  name: string;
  settings: Array<{
    content?: string;
    force_reload?: boolean;
    id?: string;
    label?: string;
    options?: Array<{
      group?: string;
      label: string;
      value: string|number;
    }>;
    type: string;
  }>;
}

export interface ThemeVariations extends Array<ThemeVariationsEntry> {}

export interface ThemeVariationsEntry {
  configurationId: string;
  defaultConfigurationId: string;
  id: string;
  isCurrent: boolean;
  screenshot: {
    largePreview: string;
    largeThumb: string;
    smallThumb: string;
  };
  themeId: string;
  variationName: string;
}

const initialState: ThemeState = {
  configurationId: '',
  schema: [],
  storeHash: '',
  themeVariations: [],
  versionId: '',
};

const updateState = (oldState: ThemeState, newState: object) => ({ ...oldState, ...newState });

const setThemeResp = (state: ThemeState, data: CurrentThemeResponse) => {
  return updateState(state, {
    configurationId: data.configurationId,
    themeVariations: data.relatedVariations,
    versionId: data.versionId,
  });
};

function theme(state: ThemeState = initialState, action: ThemeAction): ThemeState {
  switch (action.type) {
    case ThemeActionTypes.CURRENT_THEME_RESPONSE:
      return setThemeResp(state, action.data);
    case ThemeActionTypes.THEME_CONFIG_RESPONSE:
      return updateState(state, { storeHash: action.data.storeHash });
    case ThemeActionTypes.THEME_VERSION_RESPONSE:
      return updateState(state, { schema: action.data.editorSchema });
    default:
      return state;
  }
}

export default theme;
