import Axios from 'axios';

import { ThemeConfigPostData } from '../actions/theme';

const API_GATEWAY_BASE = '/admin/services/public';

export const themeAPI = {
    configurationAPI: (configId: string) => `/internalapi/v1/themeeditor/configurations/${configId}`,
    configurationPostAPI: '/internalapi/v1/themeeditor/configurations',
    designPolicyAckAPI: '/internalapi/v1/themeeditor/designpolicyack/',
    storeDesignSettings: (storeHash: string) => `${API_GATEWAY_BASE}/stores/${storeHash}/v0/store-design/settings`,
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
        const { configurationId: activeConfigurationId, id: fetchedVariationId, isPurchased, versionId } = response;

        response.configurationId = configurationId || activeConfigurationId;

        const apiCalls = [
            fetchThemeConfig(response.configurationId),
            fetchThemeVersion(storeHash, versionId),
        ];

        if (isPurchased) {
            apiCalls.push(fetchVariationHistory(storeHash, fetchedVariationId));
        }

        return Axios.all(apiCalls)
            .then(Axios.spread(({ configurationId: id, settings }, { editorSchema }, variationHistory = undefined) => {
                response.variationHistory = variationHistory;
                response.id = fetchedVariationId;
                response.settings = settings;
                response.editorSchema = editorSchema;

                return response;
            }));
    });
}

export function fetchDesignPolicyAck() {
    return Axios.get(themeAPI.designPolicyAckAPI)
        .then(({ data: { data } }) => data);
}

export function postDesignPolicyAck(designPolicyAck: boolean) {
    return Axios.post(themeAPI.designPolicyAckAPI, { designPolicyAck })
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

export function disableStoreDesign(storeHash: string) {
    const putData = {
        enabled: false,
    };

    return Axios.put(themeAPI.storeDesignSettings(storeHash), putData);
}
