import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { entries } from 'lodash';

import { StoreDesignSdk } from './storeDesignSdk';

interface Parser {
    parseFromString(data: any, mimeType: string): HTMLDocument;
}

interface Serializer {
    serializeToString(doc: HTMLDocument): string;
}

export function requestPageSource(
    page: string,
    queryParams: object,
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
    const queryString = entries(queryParams).map(keyValuePair => keyValuePair.join('=')).join('&');

    return Axios.get(`${page}?${queryString}`, requestConfig)
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

export function parseFont(font: string) {
    const provider = font.split('_')[0];
    switch (provider) {
        case 'Google':
            return parseGoogleFont(font);
        default:
            return null;
    }
}

function parseGoogleFont(font: string) {
    const split = font.split('_');
    const family = split[1];
    let formattedFont = '';
    let weight = split[2];

    if (split.length === 2) {
        formattedFont += `${family}|`;
    } else if (split.length > 2) {
        weight = weight.split(',')[0];
        formattedFont += `${family}:${weight}|`;
    }

    return `//fonts.googleapis.com/css?family=${formattedFont}`;
}
