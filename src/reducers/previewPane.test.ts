import * as previewPaneActions from '../actions/previewPane';
import * as themeActions from '../actions/theme';
import { LoadThemeResponse, ThemeConfigPostResponse } from '../actions/theme';
import { VIEWPORT_TYPES } from '../components/PreviewPane/constants';
import { parseFont } from '../utils/fontUtil';

import previewPane, { PreviewPaneState } from './previewPane';

describe('Preview Pane reducer', () => {
    const initialState: PreviewPaneState = {
        fontUrl: 'hello',
        iframeUrl: 'hi',
        isFetching: true,
        isRotated: false,
        needsForceReload: false,
        page: '/',
        viewportType: VIEWPORT_TYPES.DESKTOP,
    };

    describe('when an error is received', () => {
        it('should not modify the state', () => {

            const errorPayload = new Error('dog');
            const error = true;
            const action = previewPaneActions.pageUrlResponse(errorPayload, error);

            expect(previewPane(initialState, action)).toEqual(initialState);
        });
    });

    describe('when action is not in PreviewPaneActionTypes', () => {
        it('should not modify the state', () => {
            const payload = {
                configurationId: '123',
                fontUrl: 'hello',
                iframeUrl: 'bye',
                isFetching: true,
                isRotated: false,
                lastCommitId: '234',
                page: '/',
                themeId: '000',
                variationId: '999',
                versionId: '345',
            };

            const error = false;
            const type = 'RANDOM_ACTION_TYPE';
            const action = { error, payload, type };

            expect(previewPane(initialState, action)).toEqual(initialState);
        });
    });

    describe('when PREVIEW_PANE_DEFAULTS action is received', () => {
        it('should update the state', () => {
            const payload = { page: 'hello'};
            const action = previewPaneActions.setPreviewPaneDefault(payload);
            const expectedState = { ...initialState, ...payload };

            expect(previewPane(initialState, action)).toEqual(expectedState);
        });
    });

    describe('when PAGE_URL_REQUEST action is received', () => {
        it('should update the state', () => {
            const payload = { page: 'hello'};
            const action = previewPaneActions.pageUrlRequest(payload);
            const expectedState = { ...initialState, ...payload, isFetching: true };

            expect(previewPane(initialState, action)).toEqual(expectedState);
        });
    });

    describe('when PAGE_URL_RESPONSE action is received', () => {
        it('should update the state', () => {
            const payload = { page: 'hello', pageUrl: 'bye'};
            const action = previewPaneActions.pageUrlResponse(payload);
            const expectedState = {
                ...initialState,
                ...{
                    iframeUrl: payload.pageUrl,
                    page: 'hello',
                },
                isFetching: false,
            };

            expect(previewPane(initialState, action)).toEqual(expectedState);
        });
    });

    describe('when PREVIEW_PANE_LOADING action is received', () => {
        it('should update the state', () => {
            const action = previewPaneActions.previewPaneLoading();
            const expectedState = { ...initialState, isFetching: true };

            expect(previewPane(initialState, action)).toEqual(expectedState);
        });
    });

    describe('when PREVIEW_PANE_LOADED action is received', () => {
        it('should update the state', () => {
            const action = previewPaneActions.previewPaneLoaded();
            const expectedState = { ...initialState, isFetching: false };

            expect(previewPane(initialState, action)).toEqual(expectedState);
        });
    });

    describe('when VIEWPORT_CHANGE action is received', () => {
        it('should update the state with viewportChange', () => {
            const payload = {
                isRotated: false,
                viewportType: {
                    glyphName: 'hello',
                    viewportHeight: 'bye',
                    viewportWidth: 'yes',
                },
            };
            const action = previewPaneActions.viewportChange(payload);
            const expectedState = { ...initialState, ...payload };

            expect(previewPane(initialState, action)).toEqual(expectedState);
        });
    });

    describe('when THEME_PREVIEW_CONFIG_REQUEST action is received', () => {
        it('should update the state with themePreviewConfig', () => {
            const payload = {
                configurationId: '1234',
                lastCommitId: '2345',
                variationId: '012',
                versionId: '4321',
            };
            const action = previewPaneActions.receiveThemePreviewConfig(payload);
            const expectedState = {
                ...initialState,
                isFetching: true,
            };

            expect(previewPane(initialState, action)).toEqual(expectedState);
        });
    });

    describe('when THEME_FONT_CHANGE action is received', () => {
        it('should update the state with the fontURL', () => {
            const payload = {
                setting: {
                    content: 'hello',
                    force_reload: false,
                    id: '123',
                    label: 'label',
                    type: 'THEME_CONFIG_CHANGE',
                },
                value: 'Google_test',
            };

            const action = previewPaneActions.updateFonts(payload);
            const expectedState = { ...initialState, ...{ fontUrl: parseFont(payload.value) } };

            expect(previewPane(initialState, action)).toEqual(expectedState);
        });
    });

    describe('when SAVE_THEME_CONFIG_RESPONSE is received', () => {
        describe('when forceReload is false', () => {
            const payload: ThemeConfigPostResponse = {
                configurationId: '012',
                forceReload: false,
                settings: {},
            };

            it('should set needsForceReload to false', () => {
                const action = themeActions.themeConfigSaveResponse(payload);
                const expectedState = { ...initialState, ...{ needsForceReload: false } };
                expect(previewPane(initialState, action)).toEqual(expectedState);
            });
        });

        describe('when forceReload is true', () => {
            const payload: ThemeConfigPostResponse = {
                configurationId: '012',
                forceReload: true,
                settings: {},
            };

            it('should set needsForceReload to true', () => {
                const action = themeActions.themeConfigSaveResponse(payload);
                const expectedState = { ...initialState, ...{ needsForceReload: true } };
                expect(previewPane(initialState, action)).toEqual(expectedState);
            });
        });
    });

    describe('when PREVIEW_THEME_CONFIG_RESPONSE is received', () => {
        describe('when forceReload is false', () => {
            const payload: ThemeConfigPostResponse = {
                configurationId: '012',
                forceReload: false,
                settings: {},
            };

            it('should set needsForceReload to false', () => {
                const action = themeActions.themeConfigPreviewResponse(payload);
                const expectedState = { ...initialState, ...{ needsForceReload: false } };
                expect(previewPane(initialState, action)).toEqual(expectedState);
            });
        });

        describe('when forceReload is true', () => {
            const payload: ThemeConfigPostResponse = {
                configurationId: '012',
                forceReload: true,
                settings: {},
            };

            it('should set needsForceReload to true', () => {
                const action = themeActions.themeConfigPreviewResponse(payload);
                const expectedState = { ...initialState, ...{ needsForceReload: true } };
                expect(previewPane(initialState, action)).toEqual(expectedState);
            });
        });
    });

    describe('when LOAD_THEME_RESPONSE is received', () => {
        it('should set needsForceReload to true', () => {
            const payload: LoadThemeResponse = {
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
                variationHistory: [],
                variationId: '012',
                variationName: 'light',
                variations: [],
                versionId: '456',
            };
            const action = themeActions.loadThemeResponse(payload);
            const expectedState = { ...initialState, ...{ needsForceReload: true } };

            expect(previewPane(initialState, action)).toEqual(expectedState);
        });
    });
});
