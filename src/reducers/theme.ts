import { ThemeAction, ThemeActionTypes } from '../actions/theme';

export interface ThemeState {
  configurationId: string;
  schema: ThemeSchema;
  storeHash: string;
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

const initialState: ThemeState = {
  configurationId: '',
  schema: [],
  storeHash: '',
  versionId: '',
};

function theme(state: ThemeState = initialState, action: ThemeAction): ThemeState {
  switch (action.type) {
    case ThemeActionTypes.CURRENT_THEME_RESPONSE:
      return { ...state, configurationId: action.data.configurationId, versionId: action.data.versionId };
    case ThemeActionTypes.THEME_CONFIG_RESPONSE:
      return { ...state, storeHash: action.data.storeHash };
    case ThemeActionTypes.THEME_VERSION_RESPONSE:
      return { ...state, schema: action.data.editorSchema };
  }

  return state;
}

export default theme;
