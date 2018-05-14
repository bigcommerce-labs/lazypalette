import * as themeActions from '../actions/theme';

import theme, {ThemeSchema, ThemeState} from './theme';

it('handles current theme response', () => {
  const action = themeActions.currentThemeResponse({ configurationId: '123', versionId: '456' });
  const expectedState: ThemeState = {
    configurationId: '123',
    schema: [],
    storeHash: '',
    versionId: '456',
  };

  expect(theme(undefined, action)).toEqual(expectedState);
});

it('handles theme config response', () => {
  const action = themeActions.themeConfigResponse({ storeHash: '123' });
  const expectedState: ThemeState = {
    configurationId: '',
    schema: [],
    storeHash: '123',
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
    storeHash: '',
    versionId: '',
  };

  expect(theme(undefined, action)).toEqual(expectedState);
});
