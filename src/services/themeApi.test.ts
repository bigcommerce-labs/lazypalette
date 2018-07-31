import Axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { themeAPI } from '../services/themeApi';

import {
    fetchCurrentTheme,
    fetchThemeConfig,
    fetchThemeVersion,
    fetchVariation,
    postThemeConfig
} from './themeApi';

describe('themeApi service', () => {
    const axiosMock = new MockAdapter(Axios);

    beforeEach(() => {
        axiosMock.reset();
    });

    describe('fetchCurrentTheme', () => {
        describe('when we get a successful response', () => {
            const status = 200;
            const response = {
                data: {
                    mockResults: true,
                },
            };

            it('returns the proper data', done => {
                axiosMock.onGet(themeAPI.currentThemeAPI)
                    .reply(status, response);

                fetchCurrentTheme().then(result => {
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
                axiosMock.onGet(themeAPI.currentThemeAPI)
                    .reply(status, response);

                fetchCurrentTheme().catch(error => {
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
                axiosMock.onGet(themeAPI.variationAPI(storeHash, variationId))
                    .reply(status, response);

                fetchVariation(storeHash, variationId).then(result => {
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
                axiosMock.onGet(themeAPI.variationAPI(storeHash, variationId))
                    .reply(status, response);

                fetchVariation(storeHash, variationId).catch(error => {
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
