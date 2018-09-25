import Axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { themeAPI } from '../services/themeApi';

import {
    fetchAllThemeData,
    fetchThemeConfig,
    fetchThemeVersion,
    fetchVariation,
    fetchVariationHistory,
    postThemeConfig
} from './themeApi';

describe('themeApi service', () => {
    const axiosMock = new MockAdapter(Axios);

    beforeEach(() => {
        axiosMock.reset();
    });

    describe('fetchAllThemeData', () => {
        const configurationId = 'configurationId';
        const activeConfigurationId = 'activeConfigurationId';
        const fetchedVariationId = 'fetchedVariationId';
        const upgradeVariationId = 'upgradeVariationId';
        const variationId = 'variationId';
        const versionId = 'versionId';
        const storeHash = 'storeHash';
        const activeSettings = { color: 'red' };
        const settings = { color: 'blue' };

        describe('when we get a successful response', () => {
            const status = 200;

            beforeEach(() => {
                axiosMock.onGet(themeAPI.variationAPI(variationId))
                    .reply(status, {
                        data: {
                            configurationId: activeConfigurationId,
                            id: fetchedVariationId,
                            versionId,
                        },
                    });

                axiosMock.onGet(themeAPI.variationUpgradeAPI(variationId))
                    .reply(status, {
                        data: {
                            configurationId: activeConfigurationId,
                            id: upgradeVariationId,
                            versionId,
                        },
                    });

                axiosMock.onGet(themeAPI.variationHistoryAPI(storeHash, fetchedVariationId))
                    .reply(status, { data: [] });

                axiosMock.onGet(themeAPI.variationHistoryAPI(storeHash, upgradeVariationId))
                    .reply(status, { data: [] });

                axiosMock.onGet(themeAPI.configurationAPI(activeConfigurationId))
                    .reply(status, { data: { settings: activeSettings } });

                axiosMock.onGet(themeAPI.configurationAPI(configurationId))
                    .reply(status, { data: { settings } });

                axiosMock.onGet(themeAPI.themeVersionAPI(storeHash, versionId))
                    .reply(status, { data: { editorSchema: [] } });
            });

            describe('when a configurationId is provided', () => {
                it('returns the proper data', done => {
                    fetchAllThemeData({ storeHash, variationId, configurationId }).then(result => {
                        expect(result).toEqual({
                            configurationId,
                            editorSchema: [],
                            id: fetchedVariationId,
                            settings,
                            variationHistory: [],
                            versionId,
                        });
                        done();
                    });
                });
            });

            describe('when a configurationId is not provided', () => {
                it('returns the proper data', done => {
                    fetchAllThemeData({ storeHash, variationId }).then(result => {
                        expect(result).toEqual({
                            configurationId: activeConfigurationId,
                            editorSchema: [],
                            id: fetchedVariationId,
                            settings: activeSettings,
                            variationHistory: [],
                            versionId,
                        });
                        done();
                    });
                });
            });

            describe('when loading an upgrade configuration', () => {
                it('returns the proper data', done => {
                    fetchAllThemeData({ storeHash, variationId, upgrade: true }).then(result => {
                        expect(result).toEqual({
                            configurationId: activeConfigurationId,
                            editorSchema: [],
                            id: upgradeVariationId,
                            settings: activeSettings,
                            variationHistory: [],
                            versionId,
                        });
                        done();
                    });
                });
            });
        });

        describe('when we get an error', () => {
            const status = 404;
            const response = {
                data: {
                    mockResults: true,
                },
            };

            it('returns the proper error', done => {
                axiosMock.onGet(themeAPI.configurationAPI(configurationId))
                    .reply(status, response);

                fetchThemeConfig(configurationId).catch(error => {
                    expect(error.response.status).toEqual(404);
                    expect(error.response.data).toEqual(response);
                    done();
                });
            });
        });
    });

    describe('fetchThemeConfig', () => {
        const configurationId = '12345';

        describe('when we get a successful response', () => {
            const status = 200;
            const response = {
                data: {
                    mockResults: true,
                },
            };

            it('returns the proper data', done => {
                axiosMock.onGet(themeAPI.configurationAPI(configurationId))
                    .reply(status, response);

                fetchThemeConfig(configurationId).then(result => {
                    expect(result).toEqual({ mockResults: true });
                    done();
                });
            });
        });

        describe('when we get an error', () => {
            const status = 404;
            const response = {
                data: {
                    mockResults: true,
                },
            };

            it('returns the proper error', done => {
                axiosMock.onGet(themeAPI.configurationAPI(configurationId))
                    .reply(status, response);

                fetchThemeConfig(configurationId).catch(error => {
                    expect(error.response.status).toEqual(404);
                    expect(error.response.data).toEqual(response);
                    done();
                });
            });
        });
    });

    describe('fetchThemeVersion', () => {
        const storeHash = 'abcde';
        const versionId = '12345';

        describe('when we get a successful response', () => {
            const status = 200;
            const response = {
                data: {
                    mockResults: true,
                },
            };

            it('returns the proper data', done => {
                axiosMock.onGet(themeAPI.themeVersionAPI(storeHash, versionId))
                    .reply(status, response);

                fetchThemeVersion(storeHash, versionId).then(result => {
                    expect(result).toEqual({ mockResults: true });
                    done();
                });
            });
        });

        describe('when we get an error', () => {
            const status = 404;
            const response = {
                data: {
                    mockResults: true,
                },
            };

            it('returns the proper error', done => {
                axiosMock.onGet(themeAPI.themeVersionAPI(storeHash, versionId))
                    .reply(status, response);

                fetchThemeVersion(storeHash, versionId).catch(error => {
                    expect(error.response.status).toEqual(404);
                    expect(error.response.data).toEqual(response);
                    done();
                });
            });
        });
    });

    describe('fetchVariation', () => {
        const variationId = '12345';

        describe('when we get a successful response', () => {
            const status = 200;
            const response = {
                data: {
                    mockResults: true,
                },
            };

            it('returns the proper data', done => {
                axiosMock.onGet(themeAPI.variationAPI(variationId))
                    .reply(status, response);

                fetchVariation(variationId).then(result => {
                    expect(result).toEqual({ mockResults: true });
                    done();
                });
            });
        });

        describe('when we get an error', () => {
            const status = 404;
            const response = {
                data: {
                    mockResults: true,
                },
            };

            it('returns the proper error', done => {
                axiosMock.onGet(themeAPI.variationAPI(variationId))
                    .reply(status, response);

                fetchVariation(variationId).catch(error => {
                    expect(error.response.status).toEqual(404);
                    expect(error.response.data).toEqual(response);
                    done();
                });
            });
        });
    });

    describe('fetchVariationHistory', () => {
        const storeHash = 'abcde';
        const variationId = '12345';

        describe('when we get a successful response', () => {
            const status = 200;
            const response = {
                data: {
                    mockResults: true,
                },
            };

            it('returns the proper data', done => {
                axiosMock.onGet(themeAPI.variationHistoryAPI(storeHash, variationId))
                    .reply(status, response);

                fetchVariationHistory(storeHash, variationId).then(result => {
                    expect(result).toEqual({ mockResults: true });
                    done();
                });
            });
        });

        describe('when we get an error', () => {
            const status = 404;
            const response = {
                data: {
                    mockResults: true,
                },
            };

            it('returns the proper error', done => {
                axiosMock.onGet(themeAPI.variationHistoryAPI(storeHash, variationId))
                    .reply(status, response);

                fetchVariationHistory(storeHash, variationId).catch(error => {
                    expect(error.response.status).toEqual(404);
                    expect(error.response.data).toEqual(response);
                    done();
                });
            });
        });
    });

    describe('postThemeConfig', () => {
        const themeConfigData = {
            configurationId: '12345',
            preview: false,
            publish: false,
            reset: false,
            settings: {},
            themeId: '123',
            variationId: '234',
            versionId: '345',
        };

        describe('when we get a successful response', () => {
            const status = 200;
            const response = {
                data: {
                    mockResults: true,
                },
            };

            it('returns the proper data', done => {
                axiosMock.onPost(themeAPI.configurationPostAPI)
                    .reply(status, response);

                postThemeConfig(themeConfigData).then(result => {
                    expect(result).toEqual({ mockResults: true });
                    done();
                });
            });
        });

        describe('when we get an error', () => {
            const status = 404;
            const response = {
                data: {
                    mockResults: true,
                },
            };

            it('returns the proper error', done => {
                axiosMock.onPost(themeAPI.configurationPostAPI)
                    .reply(status, response);

                postThemeConfig(themeConfigData).catch(error => {
                    expect(error.response.status).toEqual(404);
                    expect(error.response.data).toEqual(response);
                    done();
                });
            });
        });
    });
});
