import * as themeActions from '../actions/theme';
import { ThemeConfigChange, ThemeConfigPostResponse } from '../actions/theme';

import theme, { ThemeSchema, ThemeState, ThemeVariations } from './theme';

const initialState: ThemeState = {
    configurationId: '',
    displayVersion: '',
    initialConfigurationId: '',
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

describe('currentThemeResponse', () => {
    const themeVariations: ThemeVariations = [
        {
            configurationId: '123',
            defaultConfigurationId: '234',
            id: '567',
            isCurrent: true,
            lastCommitId: '',
            screenshot: {
                largePreview: 'host://meows/123.jpg',
                largeThumb: 'host://meows/234.jpg',
                smallThumb: 'host://meows/345.jpg',
            },
            themeId: '8900',
            variationName: 'light',
        },
    ];

    const payload = {
        configurationId: '123',
        displayVersion: '2.1.0',
        themeId: '789',
        themeName: 'Cornerstone',
        variationId: '012',
        variationName: 'light',
        variations: themeVariations,
        versionId: '456',
    };

    it('handles current theme response', () => {
        const action = themeActions.currentThemeResponse(payload);

        const expectedState: ThemeState = { ...initialState, ...{
            configurationId: '123',
            displayVersion: '2.1.0',
            initialConfigurationId: '123',
            themeId: '789',
            themeName: 'Cornerstone',
            variationId: '012',
            variationName: 'light',
            variations: themeVariations,
            versionId: '456',
        } };

        expect(theme(initialState, action)).toEqual(expectedState);
    });

    it('does not modify state when an error occurred', () => {
        const action = themeActions.currentThemeResponse(payload, true);

        expect(theme(initialState, action)).toEqual(initialState);
    });
});

describe('themeConfigResponse', () => {
    it('handles theme config response', () => {
        const action = themeActions.themeConfigResponse({
            settings: { blah: 'blah' },
        });
        const expectedState: ThemeState = { ...initialState, ...{
            initialSettings: { blah: 'blah' },
            settings: { blah: 'blah' },
        } };

        expect(theme(initialState, action)).toEqual(expectedState);
    });

    it('does not modify state when an error occurred', () => {
        const action = themeActions.themeConfigResponse({ settings: { blah: 'blah' } }, true);

        expect(theme(initialState, action)).toEqual(initialState);
    });
});

describe('themeVersionResponse', () => {
    const themeSchema: ThemeSchema = [
        {
            name: 'forms',
            settings: [
                {
                    content: 'Labels',
                    type: 'heading',
                },
                {
                    id: 'form-label-font-color',
                    label: 'Text color',
                    type: 'color',
                },
            ],
        },
    ];

    const payload = { editorSchema: themeSchema };

    it('handles theme version response', () => {
        const action = themeActions.themeVersionResponse(payload);
        const expectedState: ThemeState = { ...initialState, ...{ schema: themeSchema } };

        expect(theme(initialState, action)).toEqual(expectedState);
    });

    it('does not modify state when an error occurred', () => {
        const action = themeActions.themeVersionResponse(payload, true);

        expect(theme(initialState, action)).toEqual(initialState);
    });
});

describe('themeVariationResponse test', () => {
    const themeVariations: ThemeVariations = [
        {
            configurationId: '123',
            defaultConfigurationId: '234',
            id: '567',
            isCurrent: true,
            lastCommitId: '',
            screenshot: {
                largePreview: 'host://meows/123.jpg',
                largeThumb: 'host://meows/234.jpg',
                smallThumb: 'host://meows/345.jpg',
            },
            themeId: '8900',
            variationName: 'light',
        },
    ];

    const payload = {
        configurationId: '123',
        displayVersion: '2.1.0',
        isPurchased: true,
        themeId: '789',
        themeName: 'Cornerstone',
        variationId: '012',
        variationName: 'light',
        variations: themeVariations,
        versionId: '456',
    };

    it('handles variation response', () => {
        const action = themeActions.themeVariationResponse(payload);

        const expectedState: ThemeState = { ...initialState, ...{
            configurationId: '123',
            displayVersion: '2.1.0',
            initialConfigurationId: '123',
            themeId: '789',
            themeName: 'Cornerstone',
            variationId: '012',
            variationName: 'light',
            variations: themeVariations,
            versionId: '456',
        }};

        expect(theme(initialState, action)).toEqual(expectedState);
    });

});

describe('themeConfigPreviewResponse', () => {
    const payload: ThemeConfigPostResponse = {
        configurationId: '012',
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
        settings: {},
    };

    it('handles theme config save actions response', () => {
        const action = themeActions.themeConfigSaveResponse(payload);

        const expectedState: ThemeState = { ...initialState, ...{
            configurationId: '012',
            initialSettings: {},
            isChanged: false,
        }};

        expect(theme(initialState, action)).toEqual(expectedState);
    });

    describe('when settings differ', () => {
        const payloadNew: ThemeConfigPostResponse = {
            configurationId: '012',
            settings: {'primary-font': 'meow'},
        };
        it('isChanged changes to true', () => {
            const action = themeActions.themeConfigSaveResponse(payloadNew);

            const expectedState: ThemeState = { ...initialState, ...{
                configurationId: '012',
                initialSettings: {'primary-font': 'meow'},
                isChanged: false,
            }};

            expect(theme(initialState, action)).toEqual(expectedState);
        });
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
        const action = themeActions.themeConfigReset();

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
