import * as themeActions from '../actions/theme';

import theme, {ThemeSchema, ThemeState, ThemeVariations} from './theme';

const initialState: ThemeState = {
    configurationId: '',
    initialSettings: {},
    isChanged: false,
    schema: [],
    settings: {},
    themeId: '',
    variationId: '',
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
        themeId: '789',
        variationId: '012',
        variations: themeVariations,
        versionId: '456',
    };

    it('handles current theme response', () => {
        const action = themeActions.currentThemeResponse(payload);

        const expectedState: ThemeState = { ...initialState, ...{
            configurationId: '123',
            themeId: '789',
            variationId: '012',
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
            storeHash: '123',
        });
        const expectedState: ThemeState = { ...initialState, ...{
            initialSettings: { blah: 'blah' },
            settings: { blah: 'blah' },
        } };

        expect(theme(initialState, action)).toEqual(expectedState);
    });

    it('does not modify state when an error occurred', () => {
        const action = themeActions.themeConfigResponse({ settings: { blah: 'blah' }, storeHash: '123' }, true);

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
