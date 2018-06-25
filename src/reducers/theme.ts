import { ThemeAction, ThemeActionTypes } from '../actions/theme';

export interface ThemeState {
  configurationId: string;
  schema: ThemeSchema;
  variations: ThemeVariations;
  versionId: string;
}

export interface ThemeSchema extends Array<ThemeSchemaEntry> {}

export interface ThemeSchemaEntrySetting {
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
}

export interface ThemeSchemaEntry {
  name: string;
  settings: ThemeSchemaEntrySetting[];
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
  variations: [],
  versionId: '',
};

function theme(state: ThemeState = initialState, action: ThemeAction): ThemeState {
  switch (action.type) {
    case ThemeActionTypes.CURRENT_THEME_RESPONSE:
      return { ...state, ...action.data };
    case ThemeActionTypes.THEME_VARIATION_RESPONSE:
      const { configurationId, variations, versionId } = action.data;

      return { ...state, configurationId, variations, versionId };
    case ThemeActionTypes.THEME_CONFIG_RESPONSE:
      return { ...state };
    case ThemeActionTypes.THEME_VERSION_RESPONSE:
      return { ...state, schema: action.data.editorSchema };
    default:
      return state;
  }
}

export default theme;
