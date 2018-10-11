import * as themeActions from '../actions/theme';
import {ThemeConfigChange, ThemeConfigPostResponse, ThemeConfigPublishResponse} from '../actions/theme';

import theme, { ThemeState, ThemeVariations } from './theme';

const initialState: ThemeState = {
    configurationId: '',
    displayVersion: '',
    initialConfigurationId: '',
    initialSettings: {},
    isChanged: false,
    isPrivate: false,
    isPurchased: false,
    lastCommitId: '',
    price: 0,
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

describe('loadTheme test', () => {
    const themeVariations: ThemeVariations = [
        {
            configurationId: '123',
            defaultConfigurationId: '234',
            id: '567',
            isCurrent: true,
            screenshot: {
                largePreview: 'host://meows/123.jpg',
                largeThumb: 'host://meows/234.jpg',
                smallThumb: 'host://meows/345.jpg',
            },
            themeId: '8900',
            variationName: 'light',
        },
    ];

    const variationHistory = [{
        configurationId: '123',
        displayVersion: 'ver',
        themeId: '567',
        themeName: 'name',
        timestamp: '',
        type: 'blah',
        variationId: '234',
        variationName: 'variation',
        versionId: '345',
    }];

    const payload = {
        configurationId: '123',
        displayVersion: '2.1.0',
        editorSchema: [{ name: 'blah', settings: [] }],
        isPrivate: true,
        isPurchased: true,
        lastCommitId: '666',
        price: 0,
        settings: { color: 'red' },
        themeId: '789',
        themeName: 'Cornerstone',
        variationHistory,
        variationId: '012',
        variationName: 'light',
        variations: themeVariations,
        versionId: '456',
    };

    it('handles loadTheme response', () => {
        const action = themeActions.loadThemeResponse(payload);

        const expectedState: ThemeState = { ...initialState, ...{
            configurationId: '123',
            displayVersion: '2.1.0',
            initialConfigurationId: '123',
            initialSettings: { color: 'red' },
            isPrivate: true,
            isPurchased: true,
            lastCommitId: '666',
            schema: [{ name: 'blah', settings: [] }],
            settings: { color: 'red' },
            themeId: '789',
            themeName: 'Cornerstone',
            variationHistory,
            variationId: '012',
            variationName: 'light',
            variations: themeVariations,
            versionId: '456',
        }};

        expect(theme(initialState, action)).toEqual(expectedState);
    });

});

describe('when processing themeVariationHistoryResponse', () => {
    const variationHistory = [{
        configurationId: '123',
        displayVersion: 'ver',
        themeId: '567',
        themeName: 'name',
        timestamp: '',
        type: 'blah',
        variationId: '234',
        variationName: 'variation',
        versionId: '345',
    }];

    it('updates state correctly', () => {
        const action = themeActions.themeVariationHistoryResponse({ variationHistory });

        const expectedState: ThemeState = { ...initialState, ...{ variationHistory }};

        expect(theme(initialState, action)).toEqual(expectedState);
    });
});

describe('themeConfigPreviewResponse', () => {
    const payload: ThemeConfigPostResponse = {
        configurationId: '012',
        forceReload: false,
        settings: {},
    };

    it('handles theme config preview actions response', () => {
        const action = themeActions.themeConfigPreviewResponse(payload);

        const expectedState: ThemeState = { ...initialState, ...{
            configurationId: '012',
        }};

        expect(theme(initialState, action)).toEqual(expectedState);
    });
});

describe('themeConfigSaveResponse', () => {
    const payload: ThemeConfigPostResponse = {
        configurationId: '012',
        forceReload: false,
        settings: {},
    };

    it('handles theme config save actions response', () => {
        const action = themeActions.themeConfigSaveResponse(payload);

        const expectedState: ThemeState = { ...initialState, ...{
            configurationId: '012',
            initialConfigurationId: '012',
            initialSettings: {},
            isChanged: false,
        }};

        expect(theme(initialState, action)).toEqual(expectedState);
    });

    describe('when settings differ', () => {
        const payloadNew: ThemeConfigPostResponse = {
            configurationId: '012',
            forceReload: false,
            settings: {'primary-font': 'meow'},
        };
        it('isChanged changes to true', () => {
            const action = themeActions.themeConfigSaveResponse(payloadNew);

            const expectedState: ThemeState = { ...initialState, ...{
                configurationId: '012',
                initialConfigurationId: '012',
                initialSettings: {'primary-font': 'meow'},
                isChanged: false,
            }};

            expect(theme(initialState, action)).toEqual(expectedState);
        });
    });
});

describe('themeConfigPublishResponse', () => {
    const payload: ThemeConfigPublishResponse = {
        configurationId: '013',
        settings: {},
    };

    it('handles theme config publish actions response', () => {
        const action = themeActions.themeConfigPublishResponse(payload);

        const expectedState: ThemeState = { ...initialState, ...{
            configurationId: '013',
            initialConfigurationId: '013',
            initialSettings: {},
            isChanged: false,
        }};

        expect(theme(initialState, action)).toEqual(expectedState);
    });
});

describe('Action not in the ThemeActionTypes', () => {
    const payload = {
    };
    const type = 'SOME_RANDOM_ACTION';

    it('should return the initial state', () => {
        const action = {payload, type};

        const expectedState: ThemeState = { ...initialState};

        expect(theme(initialState, action)).toEqual(expectedState);
    });
});

describe('themeConfigChange', () => {
    const payload: ThemeConfigChange = {
        setting: {
            id: 'primary-font',
            type: 'font',
        },
        value: 'meow',
    };

    it('should add the value to settings', () => {
        const action = themeActions.themeConfigChange(payload);

        const expectedState: ThemeState = {
            ...initialState,
            isChanged: true,
            settings: {'primary-font': 'meow'},
        };

        expect(theme(initialState, action)).toEqual(expectedState);
    });

    describe('when no changes', () => {
        it('the isChanged remains false', () => {
            const firstState: ThemeState = { ...initialState, ...{
                initialSettings: {'primary-font': 'meow'},
                isChanged: false,
            }};
            const firstPayload: ThemeConfigChange = {
                setting: {
                    id: 'primary-font',
                    type: 'font',
                },
                value: 'woof',
            };
            const firstAction = themeActions.themeConfigChange(firstPayload);
            const secondAction = themeActions.themeConfigChange(payload);
            const secondState = theme(firstState, firstAction);

            expect(secondState).toEqual({
                ...firstState,
                isChanged: true,
                settings: { 'primary-font': 'woof' },
            });
            expect(theme(secondState, secondAction)).toEqual({
                ...firstState,
                isChanged: false,
                settings: { 'primary-font': 'meow' },
            });
        });
    });
});

describe('themeConfigReset', () => {
    it('should reset changes to original value', () => {
        const action = themeActions.themeConfigResetResponse();

        const changedState: ThemeState = {
            ...initialState,
            configurationId: '321',
            initialConfigurationId: '123',
            initialSettings: {'primary-font': 'meow'},
            isChanged: true,
            settings: {'primary-font': 'bark'},
        };

        const expectedState: ThemeState = {
            ...changedState,
            configurationId: '123',
            isChanged: false,
            settings: {'primary-font': 'meow'},
        };

        expect(theme(changedState, action)).toEqual(expectedState);
    });
});
