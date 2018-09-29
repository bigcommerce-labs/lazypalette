import browserDetection, { BrowserDetectionOptions, BrowserVersion } from './browserDetection';

declare let global: any;

describe('browserDetection', () => {
    describe('when we detect the user is running an unsupported browser', () => {
        it('returns a rejected promise with an unsupported browser error', () => {
            Object.defineProperty(global.navigator, 'userAgent', {
                value: 'MSIE 10.0',
                writable: true,
            });

            const options: BrowserDetectionOptions = {
                unsupportedBrowsers: [BrowserVersion.InternetExplorer10],
            };

            expect(browserDetection(options)).rejects.toThrowErrorMatchingSnapshot();
        });
    });

    describe('when we we have many checks which are detected', () => {
        it('returns a rejected promise with an unsupported browser error', () => {
            Object.defineProperty(global.navigator, 'userAgent', {
                value: 'MSIE 10.0; MSIE 9.0;',
                writable: true,
            });

            const options: BrowserDetectionOptions = {
                unsupportedBrowsers: [
                    BrowserVersion.InternetExplorer10,
                    BrowserVersion.InternetExplorer10,
                ],
            };

            expect(browserDetection(options)).rejects.toThrowErrorMatchingSnapshot();
        });
    });

    describe('when we have no unsupported browsers', () => {
        it('returns a list of successful browser checks', () => {
            Object.defineProperty(global.navigator, 'userAgent', {
                value: 'MSIE 10.0',
                writable: true,
            });

            const options: BrowserDetectionOptions = {
                unsupportedBrowsers: [],
            };

            expect(browserDetection(options)).resolves.toEqual([]);
        });
    });

    describe('when we detect the user is running a supported browser', () => {
        it('returns a list of successful browser checks', () => {
            Object.defineProperty(global.navigator, 'userAgent', {
                value: 'Google Chrome :)',
                writable: true,
            });

            const options: BrowserDetectionOptions = {
                unsupportedBrowsers: [BrowserVersion.InternetExplorer10],
            };

            expect(browserDetection(options)).resolves.toEqual([{
                browser: BrowserVersion.InternetExplorer10,
                detected: false,
            }]);
        });
    });

    describe('when we detect the user is running a supported browser and we have many checks', () => {
        it('returns a list of successful browser checks', () => {
            Object.defineProperty(global.navigator, 'userAgent', {
                value: 'Google Chrome :)',
                writable: true,
            });

            const options: BrowserDetectionOptions = {
                unsupportedBrowsers: [
                    BrowserVersion.InternetExplorer10,
                    BrowserVersion.InternetExplorer10,
                    BrowserVersion.InternetExplorer10,
                ],
            };

            expect(browserDetection(options)).resolves.toEqual([
                {
                    browser: BrowserVersion.InternetExplorer10,
                    detected: false,
                },
                {
                    browser: BrowserVersion.InternetExplorer10,
                    detected: false,
                },
                {
                    browser: BrowserVersion.InternetExplorer10,
                    detected: false,
                },
            ]);
        });
    });
});
