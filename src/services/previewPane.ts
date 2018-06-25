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
