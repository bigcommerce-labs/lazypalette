import { Action } from '../actions/action';
import {
    CurrentThemeResponse,
    SettingsType,
    ThemeActionTypes,
    ThemeConfigPostResponse,
    ThemeConfigResponse,
    ThemeVariationResponse,
    ThemeVersionResponse
} from '../actions/theme';

export interface ThemeState {
    configurationId: string;
    displayVersion: string;
    initialSettings: SettingsType;
    isChanged: boolean;
    variationId: string;
    schema: ThemeSchema;
    themeName: string;
    variations: ThemeVariations;
    variationName: string;
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
    displayVersion: '',
    initialSettings: {},
    isChanged: false,
    schema: [],
    settings: {},
    themeId: '',
    themeName: '',
    variationId: '',
    variationName: '',
    variations: [],
    versionId: '',
};

function isNotEqual(currentObj: {}, initialObj: {}) {
    const objectKeys = Object.keys(currentObj);

    return objectKeys.some(key => currentObj[key] !== initialObj[key]);
}

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
                displayVersion,
                themeId,
                themeName,
                variationId,
                variationName,
                variations,
                versionId,
            } = action.payload as ThemeVariationResponse;

            return {
                ...state,
                configurationId,
                displayVersion,
                themeId,
                themeName,
                variationId,
                variationName,
                variations,
                versionId,
            };
        case ThemeActionTypes.THEME_CONFIG_RESPONSE:
            const { settings } = action.payload as ThemeConfigResponse;

            return { ...state, initialSettings: settings, settings, isChanged: false };
        case ThemeActionTypes.THEME_VERSION_RESPONSE:
            const { editorSchema } = action.payload as ThemeVersionResponse;

            return { ...state, schema: [...editorSchema] };
        case ThemeActionTypes.THEME_CONFIG_CHANGE:
            const themeConfigChange = { [`${action.payload.setting.id}`]: action.payload.value };

            return {
                ...state,
                isChanged: isNotEqual(themeConfigChange, state.settings),
                settings: {
                    ...state.settings,
                    ...themeConfigChange,
                },
            };
        case ThemeActionTypes.THEME_CONFIG_RESET:
            return { ...state, settings: { ...state.initialSettings }, isChanged: false };
        case ThemeActionTypes.PUBLISH_THEME_CONFIG_RESPONSE:
            const { settings: initialSettings } = action.payload as ThemeConfigPostResponse;

            return {
                ...state,
                configurationId: action.payload.configurationId,
                initialSettings,
                isChanged: isNotEqual(state.settings, initialSettings),
            };
        case ThemeActionTypes.PREVIEW_THEME_CONFIG_RESPONSE:

            return {
                ...state,
                configurationId: action.payload.configurationId,
            };
        case ThemeActionTypes.SAVE_THEME_CONFIG_RESPONSE:

            return {
                ...state,
                configurationId: action.payload.configurationId,
                initialSettings: action.payload.settings,
                isChanged: isNotEqual(state.settings, action.payload.settings),
            };
        default:
            return state;
    }
}

export default theme;
