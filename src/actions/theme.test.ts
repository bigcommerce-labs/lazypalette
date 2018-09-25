import Axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import createMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { themeAPI } from '../services/themeApi';

import * as themeActions from './theme';

describe('theme actions', () => {

    const axiosMock = new MockAdapter(Axios);

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

            axiosMock.onGet(themeAPI.variationAPI(variationId))
                .reply(status, {
                    data: {
                        configurationId,
                        currentVersionVariationId: '222',
                        displayVersion: '2.1.1',
                        id: '222',
                        isPurchased: true,
                        relatedVariations: variationsArray,
                        themeId: '234',
                        themeName: 'Cornerstone',
                        variationName: 'Warm',
                        versionId,
                    }});

            axiosMock.onGet(themeAPI.variationUpgradeAPI(variationId))
                .reply(status, {
                    data: {
                        configurationId: '012',
                        currentVersionVariationId: '222',
                        displayVersion: '2.1.1',
                        id: '222',
                        isPurchased: true,
                        relatedVariations: variationsArray,
                        themeId: '234',
                        themeName: 'Cornerstone',
                        variationName: 'Warm',
                        versionId,
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
                    merchant: {
                        storeHash,
                    },
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
                        editorSchema: {},
                        isPurchased: true,
                        price: 0,
                        settings: {},
                        themeId: '234',
                        themeName: 'Cornerstone',
                        variationHistory,
                        variationId: '222',
                        variationName: 'Warm',
                        variations: variationsArray,
                        versionId,
                    },
                    type: themeActions.ThemeActionTypes.LOAD_THEME_RESPONSE,
                },
            ];

            return themeActions.loadTheme(variationId)(store.dispatch, getState)
                .then(() => {
                    expect(store.getActions()).toEqual(expect.arrayContaining(expectedActions));
                });
        });

        it('should make appropriate calls when called with upgrade = true', () => {
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
                    merchant: {
                        storeHash,
                    },
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
                        editorSchema: {},
                        isPurchased: true,
                        price: 0,
                        settings: {},
                        themeId: '234',
                        themeName: 'Cornerstone',
                        variationHistory,
                        variationId: '222',
                        variationName: 'Warm',
                        variations: variationsArray,
                        versionId,
                    },
                    type: themeActions.ThemeActionTypes.LOAD_THEME_RESPONSE,
                },
            ];

            return themeActions.loadTheme('222', undefined, true)(store.dispatch, getState)
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
                merchant: {
                    storeHash,
                },
                theme: {
                    configurationId,
                    versionId,
                },

            });

        beforeEach(() => {
            axiosMock.reset();

            axiosMock.onGet(themeAPI.variationAPI(variationId))
                .reply(status);

            axiosMock.onGet(themeAPI.configurationAPI(configurationId))
                .reply(status);

            axiosMock.onGet(themeAPI.themeVersionAPI(storeHash, versionId))
                .reply(status);

            axiosMock.onGet(themeAPI.variationHistoryAPI(storeHash, variationId))
                .reply(status);
        });

        it('should call loadTheme with error status', () => {
            store.clearActions();

            const expectedActions = [
                {
                    error: true,
                    payload: new Error('Request failed with status code 404'),
                    type: themeActions.ThemeActionTypes.LOAD_THEME_RESPONSE,
                },
            ];

            return themeActions.loadTheme('222')(store.dispatch, getState)
                .then(() => {
                    expect(store.getActions()).toEqual(expect.arrayContaining(expectedActions));
                });
        });

    });

});
