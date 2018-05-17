import Axios from 'axios';

const configurationAPI = (configId: string) => `/internalapi/v1/themeeditor/configurations/${configId}`;
const currentThemeAPI = '/internalapi/v1/sfm/currenttheme';
const themeVersionAPI = (storeHash: string, versionId: string) =>
  `/admin/services/themes/stores/${storeHash}/versions/${versionId}`;

export function fetchCurrentTheme() {
  return Axios.get(currentThemeAPI)
    .then(({ data: { data }}) => data)
    .catch(error => error);
}

export function fetchThemeConfig(configurationId: string) {
  return Axios.get(configurationAPI(configurationId))
    .then(({data: { data }}) => data)
    .catch(error => error);
}

export function fetchThemeVersion(storeHash: string, versionId: string) {
  return Axios.get(themeVersionAPI(storeHash, versionId))
    .then(({data: { data }}) => data)
    .catch(error => error);
}
