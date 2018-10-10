import { createBrowserHistory, LocationDescriptor } from 'history';
import * as queryString from 'querystring';

const validQueryParams = [ 'variationId', 'optIn' ];

export interface AppQueryParams {
    [paramName: string]: string[] | string | null;
}

export function updateQueryParamsService(newQueryParams: AppQueryParams): string {
    const history = createBrowserHistory();
    const originalQueryParams = queryString.parse(history.location.search.replace('?', ''));

    validQueryParams.forEach((param: string) => {
        const originalParam = originalQueryParams[param];

        if (!(param in newQueryParams)) {
            if (originalParam !== undefined) {
                newQueryParams[param] = originalParam;
            }
        } else if (newQueryParams[param] === null) {
            delete newQueryParams[param];
        }
    });

    const updatedQueryParams = queryString.stringify(newQueryParams);
    const locationDescriptor: LocationDescriptor = {
        pathname: history.location.pathname,
        search: updatedQueryParams,
    };

    history.replace(locationDescriptor);

    return updatedQueryParams;
}
