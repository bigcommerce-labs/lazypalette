import { isBelowInternetExplorer11 } from './checks/internetExplorer/internetExplorer';
import { UnsupportedBrowser } from './errors/unsupportedBrowser';

export enum BrowserVersion {
    InternetExplorer10 = 'InternetExplorer10',
}

export interface BrowserCheck {
    detected: boolean;
}

export interface BrowserCheckResult {
    browser: BrowserVersion;
    detected: boolean;
}

export interface BrowserDetectionOptions {
    unsupportedBrowsers: BrowserVersion[];
}

const BROWSER_CHECKS = {
    [BrowserVersion.InternetExplorer10]: isBelowInternetExplorer11,
};

const browserDetection = (options: BrowserDetectionOptions) => {
    const { unsupportedBrowsers } = options;

    const browserDetectionChecks = unsupportedBrowsers.map((unsupportedBrowser: BrowserVersion) => {
        return new Promise((resolve, reject) => {
            const check: BrowserCheck = BROWSER_CHECKS[unsupportedBrowser]();

            // Detection works by marking the promise as a failure.
            if (check.detected) {
                const error = `UnsupportedBrowser detected. Detected user is running ${unsupportedBrowser}`;

                return reject(new UnsupportedBrowser(error));
            }

            return resolve({ ...check, browser: unsupportedBrowser });
        });
    });

    // Promise.all returns once all promises are complete or the first promise fails
    return Promise.all(browserDetectionChecks);
};

export default browserDetection;
