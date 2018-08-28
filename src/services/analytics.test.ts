import createMockStore from 'redux-mock-store';

import {
    init,
    trackPublish,
    trackResetCancel,
    trackResetClick,
    trackResetConfirmation,
    trackResetModalClose,
    trackSave,
    trackSectionClose,
    trackSectionOpen,
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
                expect(global.analytics.track).toHaveBeenCalledWith('store-design_click', {
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

        describe('trackSave', () => {
            it('calls analytics.track with the proper arguments', () => {
                trackSave();
                expect(global.analytics.track).toHaveBeenCalledWith('store-design_click', {
                    category: 'store-design_save',
                    element: 'button',
                    label: 'store-design_save',
                    text: 'Save',
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

        describe('trackResetClick', () => {
            it('calls analytics.track with proper arguments', () => {
                trackResetClick();
                expect(global.analytics.track).toHaveBeenCalledWith('store-design_click', {
                    category: 'store-design_reset',
                    element: 'button',
                    label: 'store-design_reset',
                    text: 'Reset',
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

        describe('trackResetConfirmation', () => {
            it('calls analytics.track with proper arguments', () => {
                trackResetConfirmation();
                expect(global.analytics.track).toHaveBeenCalledWith('store-design_click', {
                    category: 'store-design_reset',
                    element: 'button',
                    label: 'store-design_reset_confirmation',
                    text: 'OK',
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

        describe('trackResetCancel', () => {
            it('calls analytics.track with proper arguments', () => {
                trackResetCancel();
                expect(global.analytics.track).toHaveBeenCalledWith('store-design_click', {
                    category: 'store-design_reset',
                    element: 'button',
                    label: 'store-design_reset_cancel',
                    text: 'Cancel',
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

        describe('trackResetModalClose', () => {
            it('calls analytics.track with proper arguments', () => {
                trackResetModalClose();
                expect(global.analytics.track).toHaveBeenCalledWith('store-design_click', {
                    category: 'store-design_reset',
                    element: 'div',
                    label: 'store-design_modal_close',
                    text: '',
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

        describe('trackSectionOpen', () => {
            it('calls analytics.track with proper arguments', () => {
                const label = 'Styles';
                trackSectionOpen(label);
                expect(global.analytics.track).toHaveBeenCalledWith('store-design_click', {
                    category: 'store-design_section',
                    element: 'a',
                    label: 'store-design_section_open',
                    text: label,
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

        describe('trackSectionClose', () => {
            it('calls analytics.track with proper arguments', () => {
                const title = 'Styles';
                trackSectionClose(title);
                expect(global.analytics.track).toHaveBeenCalledWith('store-design_click', {
                    category: 'store-design_section',
                    element: 'a',
                    label: 'store-design_section_close',
                    text: 'x',
                    theme_configuration_id: '1234',
                    theme_id: '7890',
                    theme_name: '4567',
                    theme_variation: '5678',
                    theme_variation_id: '3456',
                    theme_version: '2345',
                    theme_version_id: '6789',
                    title,
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
