import createMockStore from 'redux-mock-store';

import {
    init,
    trackPublish,
} from './analytics';

declare const global: any;

describe('analytics service', () => {
    const storeCreator = createMockStore<any>([]);

    beforeEach(() => {
        global.analytics = undefined;
        init();
    });

    describe('when we have segment and the redux store initialized', () => {
        beforeEach(() => {
            global.analytics = {
                track: jest.fn(),
            };

            init(storeCreator({
                theme: {
                    configurationId: '1234',
                    displayVersion: '2345',
                    initialSettings: {},
                    isChanged: false,
                    schema: [],
                    settings: {},
                    themeId: '7890',
                    themeName: '4567',
                    variationId: '3456',
                    variationName: '5678',
                    variations: [],
                    versionId: '6789',
                },
            }));
        });

        describe('trackPublish', () => {
            it('calls analytics.track with the proper arguments', () => {
                const configurationId = '1234';
                trackPublish(configurationId);
                expect(global.analytics.track).toHaveBeenCalledWith('store-design_publish', {
                    category: 'store-design_publish',
                    configurationId,
                    element: 'button',
                    label: 'store-design_header-publish',
                    text: 'Publish',
                    theme_configuration_id: '1234',
                    theme_id: '7890',
                    theme_name: '4567',
                    theme_variation: '5678',
                    theme_variation_id: '3456',
                    theme_version: '2345',
                    theme_version_id: '6789',
                });
            });
        });
    });

    describe('when we do not have segment initialized', () => {
        beforeEach(() => {
            init(storeCreator({
                theme: {
                    configurationId: '1234',
                    displayVersion: '2345',
                    initialSettings: {},
                    isChanged: false,
                    schema: [],
                    settings: {},
                    themeId: '7890',
                    themeName: '4567',
                    variationId: '3456',
                    variationName: '5678',
                    variations: [],
                    versionId: '6789',
                },
            }));
        });

        it('does not call analytics.track', () => {
            expect(global.analytics).not.toBeDefined();
            expect(() => trackPublish('1234')).not.toThrow();
        });
    });

    describe('when we do not have the redux store initialized', () => {
        beforeEach(() => {
            global.analytics = {
                track: jest.fn(),
            };
        });

        it('does not call analytics.track', () => {
            expect(() => trackPublish('1234')).not.toThrow();
            expect(global.analytics.track).not.toHaveBeenCalled();
        });
    });
});
