import * as themeActions from '../actions/theme';

import theme, {ThemeSchema, ThemeState, ThemeVariations} from './theme';

it('handles current theme response', () => {
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

    const action = themeActions.currentThemeResponse({
        configurationId: '123',
        themeId: '789',
        variationId: '012',
        variations: themeVariations,
        versionId: '456',
    });

    const expectedState: ThemeState = {
        configurationId: '123',
        schema: [],
        settings: {},
        themeId: '789',
        variationId: '012',
        variations: [{
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
        }],
        versionId: '456',
    };

    expect(theme(undefined, action)).toEqual(expectedState);
});

it('handles theme config response', () => {
    const action = themeActions.themeConfigResponse({ settings: {}, storeHash: '123' });
    const expectedState: ThemeState = {
        configurationId: '',
        schema: [],
        settings: {},
        themeId: '',
        variationId: '',
        variations: [],
        versionId: '',
    };

    expect(theme(undefined, action)).toEqual(expectedState);
});

it('handles theme version response', () => {
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

    const action = themeActions.themeVersionResponse({ editorSchema: themeSchema });
    const expectedState: ThemeState = {
        configurationId: '',
        schema: themeSchema,
        settings: {},
        themeId: '',
        variationId: '',
        variations: [],
        versionId: '',
    };

    expect(theme(undefined, action)).toEqual(expectedState);
});
