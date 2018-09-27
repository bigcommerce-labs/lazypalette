import { Action } from '../actions/action';
import {
    LoadThemeResponse,
    SettingsType,
    ThemeActionTypes,
} from '../actions/theme';

export interface ThemeState {
    configurationId: string;
    displayVersion: string;
    initialConfigurationId: string;
    initialSettings: SettingsType;
    isChanged: boolean;
    isPrivate: boolean;
    isPurchased: boolean;
    lastCommitId: string;
    price?: number;
    variationId: string;
    schema: ThemeSchema;
    themeName: string;
    variationHistory: ThemeVariationHistory;
    variations: ThemeVariations;
    variationName: string;
    versionId: string;
    settings: SettingsType;
    themeId: string;
}

export interface ThemeSchema extends Array<ThemeSchemaEntry> {}

export interface ThemeSchemaEntrySetting {
    content?: string;
    enable?: string;
    force_reload?: boolean;
    id?: string;
    label?: string;
    options?: Array<{
        group?: string;
        label: string;
        value: string | number;
    }>;
    reference?: string;
    reference_default?: boolean;
    type: string;
}

export interface ThemeSchemaEntry {
    enable?: string;
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

export interface ThemeVariationHistory extends Array<ThemeVariationHistoryEntry> {}

export interface ThemeVariationHistoryEntry {
    configurationId: string;
    variationId: string;
    variationName: string;
    versionId: string;
    themeName: string;
    displayVersion: string;
    themeId: string;
    type: string;
    timestamp: string;
}

const initialState: ThemeState = {
    configurationId: '',
    displayVersion: '',
    initialConfigurationId: '',
    initialSettings: {},
    isChanged: false,
    isPrivate: false,
    isPurchased: false,
    lastCommitId: '',
    price: undefined,
    schema: [],
    settings: {},
    themeId: '',
    themeName: '',
    variationHistory: [],
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
        case ThemeActionTypes.LOAD_THEME_RESPONSE: {
            const {
                configurationId,
                displayVersion,
                editorSchema,
                isPrivate,
                isPurchased,
                lastCommitId,
                settings,
                themeId,
                themeName,
                variationHistory,
                variationId,
                variationName,
                variations,
                versionId,
            } = action.payload as LoadThemeResponse;
            const price = isPurchased ? 0 : action.payload.price / 10;

            return {
                ...state,
                configurationId,
                displayVersion,
                initialConfigurationId: configurationId,
                initialSettings: settings,
                isChanged: false,
                isPrivate,
                isPurchased,
                lastCommitId,
                price,
                schema: [...editorSchema],
                settings,
                themeId,
                themeName,
                variationHistory,
                variationId,
                variationName,
                variations,
                versionId,
            };
        }
        case ThemeActionTypes.THEME_VARIATION_HISTORY_RESPONSE: {
            const { variationHistory } = action.payload;

            return {
                ...state,
                variationHistory,
            };
        }
        case ThemeActionTypes.THEME_CONFIG_CHANGE: {
            const themeConfigChange = { [`${action.payload.setting.id}`]: action.payload.value };

            return {
                ...state,
                isChanged: isNotEqual({
                    ...state.settings,
                    ...themeConfigChange,
                }, state.initialSettings),
                settings: {
                    ...state.settings,
                    ...themeConfigChange,
                },
            };
        }
        case ThemeActionTypes.THEME_CONFIG_RESET: {
            return {
                ...state,
                configurationId: state.initialConfigurationId,
                isChanged: false,
                settings: { ...state.initialSettings },
            };
        }
        case ThemeActionTypes.PREVIEW_THEME_CONFIG_RESPONSE: {
            return {
                ...state,
                configurationId: action.payload.configurationId,
            };
        }
        case ThemeActionTypes.SAVE_THEME_CONFIG_RESPONSE: {
            return {
                ...state,
                configurationId: action.payload.configurationId,
                initialConfigurationId: action.payload.configurationId,
                initialSettings: action.payload.settings,
                isChanged: isNotEqual(state.settings, action.payload.settings),
            };
        }
        default:
            return state;
    }
}

export default theme;
