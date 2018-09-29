import { isBelowInternetExplorer11 } from './internetExplorer';

declare let global: any;

describe('browserDetection.checks.internetExplorer', () => {
    describe('isBelowInternetExplorer11', () => {
        // See: http://www.useragentstring.com/pages/useragentstring.php?name=Internet+Explorer
        // tslint:disable:max-line-length
        const testMatrix = [
            {
                examples: [
                    'Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; AS; rv:11.0) like Gecko',
                    'Mozilla/5.0 (compatible, MSIE 11, Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko',
                ],
                expected: false,
                testName: 'Internet Explorer 11.0',
            },
            {
                examples: [
                    'Mozilla/5.0 (compatible; MSIE 10.6; Windows NT 6.1; Trident/5.0; InfoPath.2; SLCC1; .NET CLR 3.0.4506.2152; .NET CLR 3.5.30729; .NET CLR 2.0.50727) 3gpp-gba UNTRUSTED/1.0',
                ],
                expected: true,
                testName: 'Internet Explorer 10.6',
            },
            {
                examples: [
                    'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; Trident/4.0; InfoPath.2; SV1; .NET CLR 2.0.50727; WOW64)',
                    'Mozilla/5.0 (compatible; MSIE 10.0; Macintosh; Intel Mac OS X 10_7_3; Trident/6.0)',
                    'Mozilla/4.0 (Compatible; MSIE 8.0; Windows NT 5.2; Trident/6.0)',
                ],
                expected: true,
                testName: 'Internet Explorer 10.0',
            },
            {
                examples: [
                    'Mozilla/5.0 (Windows; U; MSIE 9.0; WIndows NT 9.0; en-US))',
                    'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Win64; x64; Trident/5.0; .NET CLR 2.0.50727; SLCC2; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; Zune 4.0; Tablet PC 2.0; InfoPath.3; .NET4.0C; .NET4.0E)',
                    'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0; yie8)',
                ],
                expected: true,
                testName: 'Internet Explorer 9.0',
            },
            {
                examples: [
                    'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; Trident/4.0; .NET CLR 1.1.4322; .NET CLR 2.0.50727; .NET CLR 3.0.04506.648; .NET CLR 3.5.21022; .NET CLR 3.0.4506.2152; .NET CLR 3.5.30729)',
                    'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0; WOW64; Trident/4.0; SLCC1; .NET CLR 2.0.50727; InfoPath.2; .NET CLR 3.5.21022; .NET CLR 3.5.30729; .NET CLR 3.0.30729; OfficeLiveConnector.1.4; OfficeLivePatch.1.3; .NET CLR 1.1.4322)',
                    'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 5.1; Trident/4.0; .NET CLR 1.1.4322; .NET CLR 2.0.50727; .NET CLR 3.0.04506.30; InfoPath.2; MS-RTC LM 8)',
                ],
                expected: true,
                testName: 'Internet Explorer 8.0',
            },
        ];
        // tslint:enable:max-line-length

        testMatrix.forEach(test => {
            describe(test.testName, () => {
                test.examples.forEach(example => {

                    describe(example, () => {
                        it(`below ie11: ${test.expected}`,  () => {
                            // https://karolgalanciak.com/blog/2017/02/26/javascript-tips-redefining-useragent-property
                            Object.defineProperty(global.navigator, 'userAgent', {
                                value: example,
                                writable: true,
                            });

                            expect(isBelowInternetExplorer11().detected).toBe(test.expected);
                        });
                    });
                });
            });
        });
    });
});
