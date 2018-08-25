import Axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import createMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { themeAPI } from '../services/themeApi';

import { Action } from './action';
import * as themeActions from './theme';

describe('theme actions', () => {

    const axiosMock = new MockAdapter(Axios);

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

    it('should create a ThemeVariationResponseAction', () => {
        const payload = {
            configurationId: '012',
            displayVersion: '2.1.1',
            isPurchased: true,
            themeId: '234',
            themeName: 'Cornerstone',
            variationId: '123',
            variationName: 'Warm',
            variations: [],
            versionId: '234',
        };

        const expectedAction = {
            error: false,
            payload,
            type: themeActions.ThemeActionTypes.THEME_VARIATION_RESPONSE,
        };

        expect(themeActions.themeVariationResponse(payload)).toEqual(expectedAction);

    });

    it('should create a ThemeVariationHistoryResponseAction', () => {
        const payload = {
            variationHistory: [
                {
                    configurationId: '123',
                    displayVersion: 'ver',
                    themeId: '567',
                    themeName: 'name',
                    timestamp: '',
                    type: 'blah',
                    variationId: '234',
                    variationName: 'variation',
                    versionId: '345',
                },
            ],
        };

        const expectedAction = {
            error: false,
            payload,
            type: themeActions.ThemeActionTypes.THEME_VARIATION_HISTORY_RESPONSE,
        };

        expect(themeActions.themeVariationHistoryResponse(payload)).toEqual(expectedAction);

    });

    describe('loadTheme Action - Success', () => {
        const variationId = '222';
        const storeHash = '012';
        const configurationId = '012';
        const versionId = '123';
        const status = 200;

        const variationsArray = [
            {
                image: 'http://meow.wow.com/123.jpg',
                isActive: false,
                name: 'light',
                variationId: '123',
            },
            {
                image: 'http://meow.wow.com/123.jpg',
                isActive: true,
                name: 'dark',
                variationId: '234',
            },
        ];

        const variationHistory = [{
            configurationId: '123',
            displayVersion: 'ver',
            themeId: '567',
            themeName: 'name',
            timestamp: '',
            type: 'blah',
            variationId: '234',
            variationName: 'variation',
            versionId: '345',
        }];

        beforeEach(() => {
            axiosMock.reset();
            axiosMock.onGet(themeAPI.currentThemeAPI)
                .reply(status, {
                    data: {
                        configurationId: '012',
                        displayVersion: '2.1.1',
                        id: '111',
                        relatedVariations: variationsArray,
                        themeId: '234',
                        themeName: 'Cornerstone',
                        variationName: 'Warm',
                        versionId: '234',
                    }});

            axiosMock.onGet(themeAPI.variationAPI(storeHash, variationId))
                .reply(status, {
                    data: {
                        configurationId: '012',
                        displayVersion: '2.1.1',
                        id: '222',
                        isPurchased: true,
                        relatedVariations: variationsArray,
                        themeId: '234',
                        themeName: 'Cornerstone',
                        variationName: 'Warm',
                        versionId: '234',
                    }});

            axiosMock.onGet(themeAPI.configurationAPI(configurationId))
                .reply(status, {
                    data: {
                        settings: {},
                    }});

            axiosMock.onGet(themeAPI.themeVersionAPI(storeHash, versionId))
                .reply(200, {
                    data: {
                        editorSchema: {},
                    }});

            axiosMock.onGet(themeAPI.variationHistoryAPI(storeHash, variationId))
                .reply(200, {
                    data: variationHistory,
                });
        });

        it('should call fetchCurrentTheme when called without variationId', () => {

            const store = createMockStore([thunk])({
                error: {},
                merchant: {
                    storeHash,
                },
                previewPane: {},
                theme: {
                    configurationId: '',
                    variations: [],
                },
            });

            const getState = jest.fn()
                .mockReturnValue({
                    theme: {
                        configurationId,
                        variationId,
                        versionId,
                    },

                });

            const expectedActions = [
                {
                    error: false,
                    payload: {
                        configurationId: '012',
                        displayVersion: '2.1.1',
                        themeId: '234',
                        themeName: 'Cornerstone',
                        variationId: '111',
                        variationName: 'Warm',
                        variations: variationsArray,
                        versionId: '234',
                    },
                    type: themeActions.ThemeActionTypes.CURRENT_THEME_RESPONSE,
                },
                {
                    error: false,
                    payload: {
                        editorSchema: {},
                    },
                    type: themeActions.ThemeActionTypes.THEME_VERSION_RESPONSE,
                },
                {
                    error: false,
                    payload: {
                        settings: {},
                    },
                    type: themeActions.ThemeActionTypes.THEME_CONFIG_RESPONSE,
                },
                {
                    error: false,
                    payload: {
                        variationHistory,
                    },
                    type: themeActions.ThemeActionTypes.THEME_VARIATION_HISTORY_RESPONSE,
                },
            ];

            return themeActions.loadTheme('')(store.dispatch, getState)
                .then(() => {
                    expect(store.getActions()).toEqual(expect.arrayContaining(expectedActions));
                });
        });

        it('should call fetchVariation when called with variationId', () => {
            const store = createMockStore([thunk])({
                error: {},
                merchant: {
                    storeHash,
                },
                previewPane: {},
                theme: {
                    configurationId: '',
                    variations: [],
                },
            });

            const getState = jest.fn()
                .mockReturnValue({
                    theme: {
                        configurationId,
                        variationId,
                        versionId,
                    },

                });

            const expectedActions = [
                {
                    error: false,
                    payload: {
                        configurationId: '012',
                        displayVersion: '2.1.1',
                        isPurchased: true,
                        themeId: '234',
                        themeName: 'Cornerstone',
                        variationId: '222',
                        variationName: 'Warm',
                        variations: variationsArray,
                        versionId: '234',
                    },
                    type: themeActions.ThemeActionTypes.THEME_VARIATION_RESPONSE,
                },
                {
                    error: false,
                    payload: {
                        editorSchema: {},
                    },
                    type: themeActions.ThemeActionTypes.THEME_VERSION_RESPONSE,
                },
                {
                    error: false,
                    payload: {
                        settings: {},
                    },
                    type: themeActions.ThemeActionTypes.THEME_CONFIG_RESPONSE,
                },
                {
                    error: false,
                    payload: {
                        variationHistory,
                    },
                    type: themeActions.ThemeActionTypes.THEME_VARIATION_HISTORY_RESPONSE,
                },
            ];

            return themeActions.loadTheme(variationId)(store.dispatch, getState)
                .then(() => {
                    expect(store.getActions()).toEqual(expect.arrayContaining(expectedActions));
                });
        });

    });

    describe('loadTheme Action - Failure', () => {
        const variationId = '222';
        const storeHash = '012';
        const configurationId = '012';
        const versionId = '123';
        const status = 404;

        const store = createMockStore([thunk])({
            error: {},
            merchant: {
                storeHash,
            },
            previewPane: {},
            theme: {
                configurationId: '',
                variations: [],
            },
        });

        const getState = jest.fn()
            .mockReturnValue({
                theme: {
                    configurationId,
                    versionId,
                },

            });

        beforeEach(() => {
            axiosMock.reset();
            axiosMock.onGet(themeAPI.currentThemeAPI)
                .reply(status);

            axiosMock.onGet(themeAPI.variationAPI(storeHash, variationId))
                .reply(status);

            axiosMock.onGet(themeAPI.configurationAPI(configurationId))
                .reply(status);

            axiosMock.onGet(themeAPI.themeVersionAPI(storeHash, versionId))
                .reply(status);

            axiosMock.onGet(themeAPI.variationHistoryAPI(storeHash, variationId))
                .reply(status);
        });

        it('should call fetchCurrentTheme with error status', () => {

            const expectedActions: Action[] = [
                {
                    error: true,
                    payload: new Error('Request failed with status code 404'),
                    type: themeActions.ThemeActionTypes.THEME_VERSION_RESPONSE,
                },
                {
                    error: true,
                    payload: new Error('Request failed with status code 404'),
                    type: themeActions.ThemeActionTypes.THEME_CONFIG_RESPONSE,
                },
                {
                    error: true,
                    payload: new Error('Request failed with status code 404'),
                    type: themeActions.ThemeActionTypes.CURRENT_THEME_RESPONSE,
                },
                {
                    error: true,
                    payload: new Error('Request failed with status code 404'),
                    type: themeActions.ThemeActionTypes.THEME_VARIATION_HISTORY_RESPONSE,
                },
            ];

            return themeActions.loadTheme('')(store.dispatch, getState)
                .then(() => {
                    expect(store.getActions()).toEqual(expect.arrayContaining(expectedActions));
                });
        });

        it('should call fetchVariation with error status', () => {
            store.clearActions();

            const expectedActions = [
                {
                    error: true,
                    payload: new Error('Request failed with status code 404'),
                    type: themeActions.ThemeActionTypes.THEME_VARIATION_RESPONSE,
                },
                {
                    error: true,
                    payload: new Error('Request failed with status code 404'),
                    type: themeActions.ThemeActionTypes.THEME_VERSION_RESPONSE,
                },
                {
                    error: true,
                    payload: new Error('Request failed with status code 404'),
                    type: themeActions.ThemeActionTypes.THEME_CONFIG_RESPONSE,
                },
                {
                    error: true,
                    payload: new Error('Request failed with status code 404'),
                    type: themeActions.ThemeActionTypes.THEME_VARIATION_HISTORY_RESPONSE,
                },
            ];

            return themeActions.loadTheme('222')(store.dispatch, getState)
                .then(() => {
                    expect(store.getActions()).toEqual(expect.arrayContaining(expectedActions));
                });
        });

    });

});
