import createMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { State } from '../reducers/reducers';

import * as previewPane from './previewPane';

describe ('previewPane actions', () => {

    describe('PREVIEW_PANE_DEFAULTS', () => {
        describe('when we set it with a page value', () => {
            it('responds with the expected action', () => {
                const expectedAction = {
                    payload: {page: 'doge'},
                    type: 'PREVIEW_PANE_DEFAULTS',
                };

                expect(previewPane.setPreviewPaneDefault({page: 'doge'}
                )).toEqual(expectedAction);
            });
        });
    });

    describe('PAGE_URL_REQUEST', () => {
        describe('when we make a page source request', () => {
            it('responds with the expected action', () => {
                const expectedAction = {
                    payload: {page: 'doge'},
                    type: 'PAGE_URL_REQUEST',
                };

                expect(previewPane.pageUrlRequest({page: 'doge'}
                )).toEqual(expectedAction);
            });
        });
    });

    describe('PAGE_URL_RESPONSE', () => {
        describe('when we get a successful response', () => {
            it('responds with the expected action', () => {
                const expectedAction = {
                    error: false,
                    payload: {page: 'doge', pageUrl: 'cat'},
                    type: 'PAGE_URL_RESPONSE',
                };

                expect(previewPane.pageUrlResponse(
                    {page: 'doge', pageUrl: 'cat'})
                ).toEqual(expectedAction);
            });
        });

        describe('when we get an unsuccessful response', () => {
            it('responds with the expected action', () => {
                const expectedAction = {
                    error: true,
                    payload: new Error('doge cat'),
                    type: 'PAGE_URL_RESPONSE',
                };

                expect(previewPane.pageUrlResponse(
                    new Error('doge cat'), true
                )).toEqual(expectedAction);
            });
        });
    });

    describe('PREVIEW_PANE_LOADED', () => {
        describe('when preview pane has loaded', () => {
            it('responds with the expected action', () => {
                const expectedAction = {
                    type: 'PREVIEW_PANE_LOADED',
                };

                expect(previewPane.previewPaneLoaded()).toEqual(expectedAction);
            });
        });
    });

    describe('PREVIEW_PANE_LOADING', () => {
        describe('when preview pane is loading', () => {
            it('responds with the expected action', () => {
                const expectedAction = {
                    type: 'PREVIEW_PANE_LOADING',
                };

                expect(previewPane.previewPaneLoading()).toEqual(expectedAction);
            });
        });
    });

    describe('THEME_FONT_CHANGE', () => {
        describe('when theme font changes', () => {
            it('responds with the expected action', () => {
                const expectedAction = {
                    payload: {
                        setting: {type: 'color'},
                        value: 'doge',
                    },
                    type: 'THEME_FONT_CHANGE',
                };

                expect(previewPane.updateFonts({setting: {type: 'color'}, value: 'doge'})).toEqual(expectedAction);
            });
        });
    });

    describe('THEME_PREVIEW_CONFIG_REQUEST', () => {
        describe('when theme preview config request is made', () => {
            it('responds with the expected action', () => {
                const expectedAction = {
                    payload: {
                        configurationId: 'doge',
                        lastCommitId: 'cat',
                        variationId: 'whoa',
                        versionId: 'birdo',
                    },
                    type: 'THEME_PREVIEW_CONFIG_REQUEST',
                };

                expect(previewPane.receiveThemePreviewConfig({
                    configurationId: 'doge',
                    lastCommitId: 'cat',
                    variationId: 'whoa',
                    versionId: 'birdo',
                })).toEqual(expectedAction);
            });
        });
    });

    describe('VIEWPORT_CHANGE', () => {
        describe('when viewport is changed', () => {
            it('responds with the expected action', () => {
                const expectedAction = {
                    payload: {
                        isRotated: true,
                        viewportType: {
                            glyphName: 'doge',
                            viewportHeight: 'cat',
                            viewportWidth: 'bird',
                        },
                    },
                    type: 'VIEWPORT_CHANGE',
                };

                expect(previewPane.viewportChange({
                    isRotated: true,
                    viewportType: {
                        glyphName: 'doge',
                        viewportHeight: 'cat',
                        viewportWidth: 'bird',
                    },
                })).toEqual(expectedAction);
            });
        });
    });

    describe('updatePreviewPaneConfig', () => {
        describe('when preview pane is updated', () => {
            it('responds with the expected actions', () => {
                const store = createMockStore([thunk])({
                    error: {},
                    merchant: {
                    },
                    previewPane: {},
                    theme: {
                        configurationId: 'doge',
                        lastCommitId: 'cat',
                        variationId: 'whoa',
                        variations: [
                            {id: '0', isCurrent: false},
                            {id: 'whoa', isCurrent: true},
                            {id: '2', isCurrent: false},
                        ],
                        versionId: 'birdo',
                    },
                });

                const expectedActions = [
                    {
                        payload: {
                            configurationId: 'doge',
                            lastCommitId: 'cat',
                            variationId: 'whoa',
                            versionId: 'birdo',
                        },
                        type: 'THEME_PREVIEW_CONFIG_REQUEST',
                    },
                    {
                        type: 'PREVIEW_PANE_LOADING',
                    },
                ];

                previewPane.updatePreviewPaneConfig()(store.dispatch, store.getState as () => State);
                expect(store.getActions()).toEqual(expect.arrayContaining(expectedActions));
            });
        });
    });

    describe('fetchPageUrl', () => {
        describe('when requesting a page src', () => {
            it('creates with the expected actions', () => {
                const store = createMockStore([thunk])({
                    previewPane: {
                        themePreviewConfig: {
                            configurationId: '1',
                            lastCommitId: '2',
                            variationId: 'whoa',
                            versionId: '3',
                        },
                    },
                });
                const page = 'doge';
                const expectedActions = [
                    {
                        payload: {page: 'doge'},
                        type: 'PAGE_URL_REQUEST',
                    },
                    {
                        error: false,
                        payload: {page: 'doge', pageUrl: 'doge?stencilEditor=3@1@2'},
                        type: 'PAGE_URL_RESPONSE',
                    },
                ];

                previewPane.fetchPageUrl({page})(store.dispatch, store.getState as () => State);
                expect(store.getActions()).toEqual(expect.arrayContaining(expectedActions));
            });
        });
    });
});
