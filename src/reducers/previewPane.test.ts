import * as previewPaneActions from '../actions/previewPane';
import { VIEWPORT_TYPES } from '../components/PreviewPane/constants';
import { parseFont } from '../services/previewPane';

import previewPane, { PreviewPaneState } from './previewPane';

describe('Preview Pane reducer', () => {
    const initialState: PreviewPaneState = {
        fontUrl: 'hello',
        isFetching: true,
        isRotated: false,
        needsForceReload: false,
        page: '/',
        pageUrl: '',
        themePreviewConfig: {
            configurationId: '',
            lastCommitId: '',
            versionId: '',
        },
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
                fontUrl: 'hello',
                isFetching: true,
                isRotated: false,
                page: '/',
                pageUrl: 'hi',
                themePreviewConfig: {
                    configurationId: '123',
                    lastCommitId: '234',
                    versionId: '345',
                },
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
            const expectedState = { ...initialState, ...payload, isFetching: false };

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
                versionId: '4321',
            };
            const action = previewPaneActions.receiveThemePreviewConfig(payload);
            const expectedState = {
                ...initialState,
                isFetching: true,
                themePreviewConfig: { ...initialState.themePreviewConfig, ...payload },
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
});
