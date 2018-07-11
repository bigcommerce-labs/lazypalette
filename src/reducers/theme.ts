import { Action } from '../actions/action';
import {
    CurrentThemeResponse,
    SettingsType,
    ThemeActionTypes,
    ThemeConfigResponse,
    ThemeVariationResponse,
    ThemeVersionResponse
} from '../actions/theme';

export interface ThemeState {
    configurationId: string;
    variationId: string;
    schema: ThemeSchema;
    variations: ThemeVariations;
    versionId: string;
    settings: SettingsType;
    themeId: string;
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
        value: string | number;
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
    lastCommitId: string;
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
    settings: {},
    themeId: '',
    variationId: '',
    variations: [],
    versionId: '',
};

function theme(state: ThemeState = initialState, action: Action): ThemeState {
    if (action.error) {
        return state;
    }

    switch (action.type) {
        case ThemeActionTypes.CURRENT_THEME_RESPONSE:
            return { ...state, ...action.payload as CurrentThemeResponse };
        case ThemeActionTypes.THEME_VARIATION_RESPONSE:
            const {
                configurationId,
                variations,
                versionId,
                themeId,
                variationId,
            } = action.payload as ThemeVariationResponse;

            return { ...state, configurationId, variations, versionId, themeId, variationId };
        case ThemeActionTypes.THEME_CONFIG_RESPONSE:
            const { settings } = action.payload as ThemeConfigResponse;

            return { ...state, settings };
        case ThemeActionTypes.THEME_VERSION_RESPONSE:
            const { editorSchema } = action.payload as ThemeVersionResponse;

            return { ...state, schema: [...editorSchema] };
        case ThemeActionTypes.THEME_CONFIG_CHANGE:
            return { ...state, settings: { ...state.settings, ...action.payload } };
        case ThemeActionTypes.POST_THEME_CONFIG_RESPONSE:
            return { ...state };
        default:
            return state;
    }
}

export default theme;
