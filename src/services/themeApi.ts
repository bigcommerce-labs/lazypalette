import Axios from 'axios';

import { ThemeConfigPostData } from '../actions/theme';

export const themeAPI = {
    configurationAPI: (configId: string) => `/internalapi/v1/themeeditor/configurations/${configId}`,
    configurationPostAPI: '/internalapi/v1/themeeditor/configurations',
    currentThemeAPI: '/internalapi/v1/sfm/currenttheme',
    themeVersionAPI: (storeHash: string, versionId: string) =>
        `/admin/services/themes/stores/${storeHash}/versions/${versionId}`,
    variationAPI: (storeHash: string, variationId: string) =>
        `/admin/services/themes/stores/${storeHash}/variations/${variationId}`,
    variationHistoryAPI: (storeHash: string, variationId: string) =>
        `/admin/services/themes/stores/${storeHash}/variations/${variationId}/history`,
};

export function fetchCurrentTheme() {
    return Axios.get(themeAPI.currentThemeAPI)
        .then(({ data: { data } }) => data);
}

export function fetchThemeConfig(configurationId: string) {
    return Axios.get(themeAPI.configurationAPI(configurationId))
        .then(({ data: { data } }) => data);
}

export function fetchThemeVersion(storeHash: string, versionId: string) {
    return Axios.get(themeAPI.themeVersionAPI(storeHash, versionId))
        .then(({ data: { data } }) => data);
}

export function fetchVariation(storeHash: string, variationId: string) {
    return Axios.get(themeAPI.variationAPI(storeHash, variationId))
        .then(({ data: { data } }) => data);
}

export function fetchVariationHistory(storeHash: string, variationId: string) {
    return Axios.get(themeAPI.variationHistoryAPI(storeHash, variationId))
        .then(({ data: { data } }) => data);
}

export function postThemeConfig( configData: ThemeConfigPostData) {
    return Axios.post(themeAPI.configurationPostAPI, configData)
        .then(({data: { data }}) => data);
}
