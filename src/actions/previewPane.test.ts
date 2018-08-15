import Axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import createMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { State } from '../reducers/reducers';

import * as previewPane from './previewPane';

describe ('previewPane actions', () => {
    describe('PAGE_SOURCE_REQUEST', () => {
        describe('when we make a page source request', () => {
            it('responds with the expected action', () => {
                const expectedAction = {
                    payload: {page: 'doge'},
                    type: 'PAGE_SOURCE_REQUEST',
                };

                expect(previewPane.pageSourceRequest({page: 'doge'}
                )).toEqual(expectedAction);
            });
        });
    });

    describe('PAGE_SOURCE_RESPONSE', () => {
        describe('when we get a successful response', () => {
            it('responds with the expected action', () => {
                const expectedAction = {
                    error: false,
                    payload: {page: 'doge', pageSource: 'cat'},
                    type: 'PAGE_SOURCE_RESPONSE',
                };

                expect(previewPane.pageSourceResponse(
                    {page: 'doge', pageSource: 'cat'})
                ).toEqual(expectedAction);
            });
        });

        describe('when we get an unsuccessful response', () => {
            it('responds with the expected action', () => {
                const expectedAction = {
                    error: true,
                    payload: new Error('doge cat'),
                    type: 'PAGE_SOURCE_RESPONSE',
                };

                expect(previewPane.pageSourceResponse(
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
                        versionId: 'birdo',
                    },
                    type: 'THEME_PREVIEW_CONFIG_REQUEST',
                };

                expect(previewPane.receiveThemePreviewConfig({
                    configurationId: 'doge',
                    lastCommitId: 'cat',
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
                        variations: [
                            {isCurrent: false, lastCommitId: '0'},
                            {isCurrent: true, lastCommitId: 'cat'},
                            {isCurrent: false, lastCommitId: '2'},
                        ],
                        versionId: 'birdo',
                    },
                });

                const expectedActions = [
                    {
                        payload: {
                            configurationId: 'doge',
                            lastCommitId: 'cat',
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

    describe('fetchPageSource', () => {
        describe('when api call is successful', () => {
            it('creates with the expected actions', done => {
                const store = createMockStore([thunk])({
                    previewPane: {
                        themePreviewConfig: {
                            configurationId: '1',
                            lastCommitId: '2',
                            versionId: '3',
                        },
                    },
                });

                const axiosMock = new MockAdapter(Axios);
                const page = 'doge';

                const mockXMLSerializer = jest.fn(() => ({
                    serializeToString: () => 'hello',
                }));

                global['XMLSerializer'] = mockXMLSerializer; // tslint:disable-line
                axiosMock.onGet(`${page}?stencilEditor=3@1@2`).reply(200, {
                    data: {
                        pageSource: 'hello',
                    },
                });
                const expectedActions = [
                    {
                        payload: {page: 'doge'},
                        type: 'PAGE_SOURCE_REQUEST',
                    },
                    {
                        error: false,
                        payload: {page: 'doge', pageSource: 'hello'},
                        type: 'PAGE_SOURCE_RESPONSE',
                    },
                ];

                previewPane.fetchPageSource({page})(store.dispatch, store.getState as () => State).then(() => {
                    expect(store.getActions()).toEqual(expect.arrayContaining(expectedActions));
                    done();
                });
            });

            describe('when api call is unsuccessful', () => {
                it('should call fetchPageSource with error status', done => {
                    const store = createMockStore([thunk])({
                        previewPane: {
                            themePreviewConfig: {
                                configurationId: '1',
                                lastCommitId: '2',
                                versionId: '3',
                            },
                        },
                    });
                    const axiosMock = new MockAdapter(Axios);
                    const page = 'doge';
                    axiosMock.onGet(`${page}?stencilEditor=3@1@2`).reply(500);
                    const expectedActions = [
                        {
                            payload: {page: 'doge'},
                            type: 'PAGE_SOURCE_REQUEST',
                        },
                        {
                            error: true,
                            payload: new Error('Request failed with status code 500'),
                            type: 'PAGE_SOURCE_RESPONSE',
                        },
                    ];
                    previewPane.fetchPageSource({page})(store.dispatch, store.getState as () => State).then(() => {
                        expect(store.getActions()).toEqual(expect.arrayContaining(expectedActions));
                        done();
                    });
                });
            });
        });
    });
});
