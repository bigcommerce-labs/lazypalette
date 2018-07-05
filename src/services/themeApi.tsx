import Axios from 'axios';

import { ThemeConfigPostData } from '../actions/theme';

const configurationAPI = (configId: string) => `/internalapi/v1/themeeditor/configurations/${configId}`;
const configurationPostAPI = '/internalapi/v1/themeeditor/configurations';
const currentThemeAPI = '/internalapi/v1/sfm/currenttheme';
const themeVersionAPI = (storeHash: string, versionId: string) =>
    `/admin/services/themes/stores/${storeHash}/versions/${versionId}`;
const variationAPI = (storeHash: string, variationId: string) =>
    `/admin/services/themes/stores/${storeHash}/variations/${variationId}`;

export function fetchCurrentTheme() {
    return Axios.get(currentThemeAPI)
        .then(({ data: { data } }) => data);
}

export function fetchThemeConfig(configurationId: string) {
    return Axios.get(configurationAPI(configurationId))
        .then(({ data: { data } }) => data);
}

export function fetchThemeVersion(storeHash: string, versionId: string) {
    return Axios.get(themeVersionAPI(storeHash, versionId))
        .then(({ data: { data } }) => data);
}

export function fetchVariation(storeHash: string, variationId: string) {
    return Axios.get(variationAPI(storeHash, variationId))
        .then(({ data: { data } }) => data);
}

export function postThemeConfig( configData: ThemeConfigPostData) {
    return Axios.post(configurationPostAPI, configData)
        .then(({data: { data }}) => data);
}
