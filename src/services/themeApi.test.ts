import Axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

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
                axiosMock.onGet('/internalapi/v1/sfm/currenttheme')
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
                axiosMock.onGet('/internalapi/v1/sfm/currenttheme')
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
                axiosMock.onGet('/internalapi/v1/themeeditor/configurations/12345')
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
                axiosMock.onGet('/internalapi/v1/themeeditor/configurations/12345')
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
                axiosMock.onGet('/admin/services/themes/stores/abcde/versions/12345')
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
                axiosMock.onGet('/admin/services/themes/stores/abcde/versions/12345')
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
                axiosMock.onGet('/admin/services/themes/stores/abcde/variations/12345')
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
                axiosMock.onGet('/admin/services/themes/stores/abcde/variations/12345')
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
                axiosMock.onPost('/internalapi/v1/themeeditor/configurations')
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
                axiosMock.onPost('/internalapi/v1/themeeditor/configurations')
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
