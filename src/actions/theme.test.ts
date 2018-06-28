import * as themeActions from './theme';

describe('theme actions', () => {
  it('should create a CurrentThemeResponse action', () => {
    const data: themeActions.CurrentThemeResponse = {
      configurationId: '123',
      variations: [
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
      ],
      versionId: '456',
    };

    const expectedAction: themeActions.CurrentThemeResponseAction = {
      data,
      type: themeActions.ThemeActionTypes.CURRENT_THEME_RESPONSE,
    };

    expect(themeActions.currentThemeResponse(data)).toEqual(expectedAction);
  });

  it('should create a CurrentThemeError action', () => {
    const expectedAction: themeActions.CurrentThemeErrorAction = {
      type: themeActions.ThemeActionTypes.CURRENT_THEME_ERROR,
    };

    expect(themeActions.currentThemeError()).toEqual(expectedAction);
  });

  it('should create a ThemeConfigResponse action', () => {
    const data: themeActions.ThemeConfigResponse = {
      settings: {},
      storeHash: '123',
    };

    const expectedAction: themeActions.ThemeConfigResponseAction = {
      data,
      type: themeActions.ThemeActionTypes.THEME_CONFIG_RESPONSE,
    };

    expect(themeActions.themeConfigResponse(data)).toEqual(expectedAction);
  });

  it('should create a ThemeConfigError action', () => {
    const expectedAction: themeActions.ThemeConfigErrorAction = {
      type: themeActions.ThemeActionTypes.THEME_CONFIG_ERROR,
    };

    expect(themeActions.themeConfigError()).toEqual(expectedAction);
  });

  it('should create a ThemeVersionResponse action', () => {
    const data: themeActions.ThemeVersionResponse = {
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

    const expectedAction: themeActions.ThemeVersionResponseAction = {
      data,
      type: themeActions.ThemeActionTypes.THEME_VERSION_RESPONSE,
    };

    expect(themeActions.themeVersionResponse(data)).toEqual(expectedAction);
  });

  it('should create a ThemeVersionError action', () => {
    const expectedAction: themeActions.ThemeVersionErrorAction = {
      type: themeActions.ThemeActionTypes.THEME_VERSION_ERROR,
    };

    expect(themeActions.themeVersionError()).toEqual(expectedAction);
  });

});
