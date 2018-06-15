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
    variations: themeVariations,
    versionId: '456',
  });

  const expectedState: ThemeState = {
    configurationId: '123',
    schema: [],
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
  const action = themeActions.themeConfigResponse({ storeHash: '123' });
  const expectedState: ThemeState = {
    configurationId: '',
    schema: [],
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
    variations: [],
    versionId: '',
  };

  expect(theme(undefined, action)).toEqual(expectedState);
});
