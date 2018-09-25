import Axios from 'axios';

import { ThemeConfigPostData } from '../actions/theme';

export const themeAPI = {
    configurationAPI: (configId: string) => `/internalapi/v1/themeeditor/configurations/${configId}`,
    configurationPostAPI: '/internalapi/v1/themeeditor/configurations',
    themeVersionAPI: (storeHash: string, versionId: string) =>
        `/admin/services/themes/stores/${storeHash}/versions/${versionId}`,
    variationAPI: (variationId: string) =>
        `/internalapi/v1/themeeditor/variations/${variationId}`,
    variationHistoryAPI: (storeHash: string, variationId: string) =>
        `/admin/services/themes/stores/${storeHash}/variations/${variationId}/history`,
    variationUpgradeAPI: (variationId: string) =>
        `/internalapi/v1/marketplace/upgrade/variation/${variationId}`,
};

interface FetchAllThemeDataConfig {
    configurationId?: string;
    storeHash: string;
    upgrade?: boolean;
    variationId: string;
}

export function fetchAllThemeData(config: FetchAllThemeDataConfig) {
    const { configurationId, storeHash, upgrade, variationId } = config;
    let variationPromise;

    if (upgrade) {
        variationPromise = fetchVariationUpgrade(variationId);
    } else {
        variationPromise = fetchVariation(variationId);
    }

    return variationPromise.then(response => {
        const { configurationId: activeConfigurationId, id: fetchedVariationId, versionId } = response;

        response.configurationId = configurationId || activeConfigurationId;

        return Axios.all([
            fetchVariationHistory(storeHash, fetchedVariationId),
            fetchThemeConfig(response.configurationId),
            fetchThemeVersion(storeHash, versionId),
        ])
            .then(Axios.spread((variationHistory, { configurationId: id, settings }, { editorSchema }) => {
                response.variationHistory = variationHistory;
                response.id = fetchedVariationId;
                response.settings = settings;
                response.editorSchema = editorSchema;

                return response;
            }));
    });
}

export function fetchThemeConfig(configurationId: string) {
    return Axios.get(themeAPI.configurationAPI(configurationId))
        .then(({ data: { data } }) => data);
}

export function fetchThemeVersion(storeHash: string, versionId: string) {
    return Axios.get(themeAPI.themeVersionAPI(storeHash, versionId))
        .then(({ data: { data } }) => data);
}

export function fetchVariation(variationId: string) {
    return Axios.get(themeAPI.variationAPI(variationId))
        .then(({ data: { data } }) => data);
}

export function fetchVariationUpgrade(variationId: string) {
    return Axios.get(themeAPI.variationUpgradeAPI(variationId))
        .then(({ data: { data } }) => data);
}

export function fetchVariationHistory(storeHash: string, variationId: string) {
    return Axios.get(themeAPI.variationHistoryAPI(storeHash, variationId))
        .then(({ data: { data } }) => data);
}

export function postThemeConfig(configData: ThemeConfigPostData) {
    return Axios.post(themeAPI.configurationPostAPI, configData)
        .then(({data: { data }}) => data);
}

export function postThemeUpgrade(configData: ThemeConfigPostData) {
    return Axios.post(themeAPI.variationUpgradeAPI(configData.variationId), configData)
        .then(({data: { data }}) => data);
}
