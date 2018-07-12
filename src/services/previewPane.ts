import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import { StoreDesignSdk } from './storeDesignSdk';

interface Parser {
    parseFromString(data: any, mimeType: string): HTMLDocument;
}

interface Serializer {
    serializeToString(doc: HTMLDocument): string;
}

export function requestPageSource(
    page: string,
    parser: Parser = new DOMParser(),
    serializer: Serializer = new XMLSerializer()
) {
    const requestConfig: AxiosRequestConfig = {
        transformResponse: [data => {
            const doc: HTMLDocument = parser.parseFromString(data, 'text/html');
            const storeDesignSdkScript = StoreDesignSdk.getScript(doc);

            doc.body.appendChild(storeDesignSdkScript);

            return serializer.serializeToString(doc);
        }],
    };

    return Axios.get(page, requestConfig)
        .then(({ data }: AxiosResponse) => data);
}

const rewriteStylesheetUrl = (url: string) => {
    const queryIndex = url.indexOf('?');
    let cleanUrl = queryIndex !== -1 ? url.substring(0, queryIndex) : url;
    const cdnUrlRegex = /[-|\/](\w+)\/stencil\/(.*)/i;
    const match = cleanUrl.match(cdnUrlRegex);

    if (match) {
        const storeHash = match[1];
        const cssPath = match[2];

        cleanUrl = `/stencil/s-${storeHash}/${cssPath}`;
    }

    if (cleanUrl.indexOf('/stencil') !== 0) {
        throw new Error('Invalid stylesheet url');
    }

    return cleanUrl;
};

const getStylesheetBaseUrl = (url: string) => {
    const match = url.match(/(^\/stencil\/s-.*?)\//i);

    return match ? match[1] : '/stencil';
};

const getStylesheetRelativePath = (url: string, configurationId: string) => {
    const configIdRegex = '(?:[a-f0-9]{8}-(?:[a-f0-9]{4}-){3}[a-f0-9]{12})';
    const regex = new RegExp(`/(css/.*)-${configIdRegex}\\.css`, 'i');
    const match = url.match(regex);

    if (!match) {
        throw new Error('Invalid stylesheet url');
    }

    return `${match[1]}-${configurationId}.css?preview=${Date.now()}`;
};

interface StylesheetUrlOptions { configurationId: string; lastCommitId: string; versionId: string; }
export function generateStylesheetUrl(url: string, { configurationId, lastCommitId, versionId }: StylesheetUrlOptions) {
    const cleanUrl = rewriteStylesheetUrl(url);
    const baseUrl = getStylesheetBaseUrl(cleanUrl);
    const relativePath = getStylesheetRelativePath(cleanUrl, configurationId);

    return (lastCommitId)
        ? `${baseUrl}/${versionId}/e/${lastCommitId}/${relativePath}`
        : `${baseUrl}/${versionId}/${relativePath}`;
}
