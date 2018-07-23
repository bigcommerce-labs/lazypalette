import * as themeActions from './theme';

describe('theme actions', () => {
    it('should create a CurrentThemeResponse action', () => {
        const payload = {
            configurationId: '123',
            displayVersion: '2.1.0',
            themeId: '789',
            themeName: 'Cornerstone',
            variationId: '012',
            variationName: 'Bold',
            variations: [
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
            ],
            versionId: '456',
        };

        const expectedAction = {
            error: false,
            payload,
            type: themeActions.ThemeActionTypes.CURRENT_THEME_RESPONSE,
        };

        expect(themeActions.currentThemeResponse(payload)).toEqual(expectedAction);
    });

    it('should create a ThemeConfigResponse action', () => {
        const payload = {
            settings: {},
        };

        const expectedAction = {
            error: false,
            payload,
            type: themeActions.ThemeActionTypes.THEME_CONFIG_RESPONSE,
        };

        expect(themeActions.themeConfigResponse(payload)).toEqual(expectedAction);
    });

    it('should create a ThemeVersionResponse action', () => {
        const payload = {
            editorSchema: [
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
            ],
        };

        const expectedAction = {
            error: false,
            payload,
            type: themeActions.ThemeActionTypes.THEME_VERSION_RESPONSE,
        };

        expect(themeActions.themeVersionResponse(payload)).toEqual(expectedAction);
    });

});
