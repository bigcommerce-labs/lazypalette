import { createBrowserHistory, LocationDescriptor } from 'history';
import * as queryString from 'querystring';

export function updateQueryParamsService(variationId: string): string {
    const history = createBrowserHistory();
    const queryParams = queryString.parse(history.location.search.replace('?', ''));

    queryParams.variationId = variationId;

    const updatedQueryParams = queryString.stringify(queryParams);
    const locationDescriptor: LocationDescriptor = {
        pathname: history.location.pathname,
        search: updatedQueryParams,
    };

    history.replace(locationDescriptor);

    return updatedQueryParams;
}
