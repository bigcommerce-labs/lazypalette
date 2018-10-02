import { BrowserCheck } from '../../browserDetection';

/*
 * User agent detection for Internet Explorer.
 * For a list of possible user agents, refer to:
 *   - http://www.useragentstring.com/pages/useragentstring.php?name=Internet+Explorer
 */

const MSIE = 'MSIE';
const MSIE_LT_11 = 'MSIE [1-9][0]?[.][0-9]+[a-zA-Z]?';

export function isBelowInternetExplorer11(): BrowserCheck {
    const { userAgent } = navigator;
    const isInternetExplorer = !!userAgent.match(MSIE);

    // This is a validator for Internet Explorer
    if (!isInternetExplorer) {
        return { detected: false };
    }

    return { detected: !!userAgent.match(MSIE_LT_11) };
}
