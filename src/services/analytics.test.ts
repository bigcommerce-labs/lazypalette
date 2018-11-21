import createMockStore from 'redux-mock-store';

import * as analytics from './analytics';

declare const global: any;

describe('analytics service', () => {
    const storeCreator = createMockStore<any>([]);

    beforeEach(() => {
        global.analytics = undefined;
        analytics.init();
    });

    describe('when we have segment and the redux store initialized', () => {
        beforeEach(() => {
            global.analytics = {
                track: jest.fn(),
            };

            analytics.init(storeCreator({
                merchant: {
                    activeThemeId: '234',
                    canOptOut: true,
                    isDownForMaintenance: false,
                    isPrelaunchStore: false,
                },
                previewPane: {
                    page: '/blah',
                    viewportType: {
                        glyphName: 'desktop',
                    },
                },
                sideMenu: {
                    collapsed: false,
                },
                theme: {
                    configurationId: '1234',
                    displayVersion: '2345',
                    initialSettings: { setting1: 'abc', setting2: 'xyz', setting3: 'cbs' },
                    isChanged: false,
                    isPurchased: false,
                    schema: [],
                    settings: { setting1: 'abd', setting2: 'xyz', setting3: 'cbz' },
                    themeId: '7890',
                    themeName: '4567',
                    variationId: '3456',
                    variationName: '5678',
                    variations: [],
                    versionId: '6789',
                },
            }));
        });

        const universalData = {
            is_ab_test_subject: 'false',
            is_active_theme: 'false',
            is_maintenance: 'false',
            is_prelaunch: 'false',
            is_purchased: 'false',
            side_menu_collapsed: 'false',
            store_design_version: 2,
            storefront_page: '/blah',
            theme_configuration_id: '1234',
            theme_id: '7890',
            theme_name: '4567',
            theme_variation: '5678',
            theme_variation_id: '3456',
            theme_version: '2345',
            theme_version_id: '6789',
            viewport: 'desktop',
        };

        describe('trackPublish', () => {
            it('calls analytics.track with the proper arguments', () => {
                const configurationId = '1234';
                analytics.trackPublish(configurationId);
                expect(global.analytics.track).toHaveBeenCalledWith('store-design_click', {
                    ...universalData,
                    category: 'store-design_publish',
                    changedSettings: JSON.stringify({ setting1: 'abd', setting3: 'cbz' }),
                    configurationId,
                    element: 'button',
                    label: 'store-design_header-publish',
                    text: 'Publish',
                });
            });
        });

        describe('trackSave', () => {
            it('calls analytics.track with the proper arguments', () => {
                analytics.trackSave();
                expect(global.analytics.track).toHaveBeenCalledWith('store-design_click', {
                    ...universalData,
                    category: 'store-design_save',
                    changedSettings: JSON.stringify({ setting1: 'abd', setting3: 'cbz' }),
                    element: 'button',
                    label: 'store-design_save',
                    text: 'Save',
                });
            });
        });

        describe('trackResetClick', () => {
            it('calls analytics.track with proper arguments', () => {
                analytics.trackResetClick();
                expect(global.analytics.track).toHaveBeenCalledWith('store-design_click', {
                    ...universalData,
                    category: 'store-design_reset',
                    element: 'button',
                    label: 'store-design_reset',
                    text: 'Reset',
                });
            });
        });

        describe('trackResetConfirmation', () => {
            it('calls analytics.track with proper arguments', () => {
                analytics.trackResetConfirmation();
                expect(global.analytics.track).toHaveBeenCalledWith('store-design_click', {
                    ...universalData,
                    category: 'store-design_reset',
                    element: 'button',
                    label: 'store-design_reset_confirmation',
                    text: 'OK',
                });
            });
        });

        describe('trackResetCancel', () => {
            it('calls analytics.track with proper arguments', () => {
                analytics.trackResetCancel();
                expect(global.analytics.track).toHaveBeenCalledWith('store-design_click', {
                    ...universalData,
                    category: 'store-design_reset',
                    element: 'button',
                    label: 'store-design_reset_cancel',
                    text: 'Cancel',
                });
            });
        });

        describe('trackResetModalClose', () => {
            it('calls analytics.track with proper arguments', () => {
                analytics.trackResetModalClose();
                expect(global.analytics.track).toHaveBeenCalledWith('store-design_click', {
                    ...universalData,
                    category: 'store-design_reset',
                    element: 'div',
                    label: 'store-design_modal_close',
                    text: '',
                });
            });
        });

        describe('trackSectionOpen', () => {
            it('calls analytics.track with proper arguments', () => {
                const label = 'Styles';
                analytics.trackSectionOpen(label);
                expect(global.analytics.track).toHaveBeenCalledWith('store-design_click', {
                    ...universalData,
                    category: 'store-design_section',
                    element: 'a',
                    label: 'store-design_section_open',
                    text: label,
                });
            });
        });

        describe('trackSectionClose', () => {
            it('calls analytics.track with proper arguments', () => {
                const title = 'Styles';
                analytics.trackSectionClose(title);
                expect(global.analytics.track).toHaveBeenCalledWith('store-design_click', {
                    ...universalData,
                    category: 'store-design_section',
                    element: 'a',
                    label: 'store-design_section_close',
                    text: 'x',
                    title,
                });
            });
        });

        describe('trackCheckboxChange', () => {
            it('calls analytics.track with proper arguments', () => {
                const checked = true;
                const id = 'hide_content_navigation';
                analytics.trackCheckboxChange(id, checked);
                expect(global.analytics.track).toHaveBeenCalledWith('store-design_change', {
                    ...universalData,
                    category: 'store-design_change',
                    checked: checked ? 'true' : 'false',
                    element: 'input',
                    id,
                    label: 'store-design_checkbox_change',
                    text: '',
                });
            });
        });

        describe('trackImageDimensionChange', () => {
            it('calls analytics.track with proper arguments', () => {
                const dimension = '20x20';
                const id = 'logo_size';
                analytics.trackImageDimensionChange(id, dimension);
                expect(global.analytics.track).toHaveBeenCalledWith('store-design_change', {
                    ...universalData,
                    category: 'store-design_change',
                    dimension,
                    element: 'input',
                    id,
                    label: 'store-design_image_dimension_change',
                    text: '',
                });
            });
        });

        describe('trackSelectChange', () => {
            it('calls analytics.track with proper arguments', () => {
                const selected = 'Hello';
                const id = 'logo-position';
                analytics.trackSelectChange(id, selected);
                expect(global.analytics.track).toHaveBeenCalledWith('store-design_change', {
                    ...universalData,
                    category: 'store-design_change',
                    element: 'select',
                    id,
                    label: 'store-design_select_change',
                    selected,
                    text: selected,
                });
            });
        });

        describe('trackTextChange', () => {
            it('calls analytics.track with proper arguments', () => {
                const text = 'Bye';
                const id = 'geotrust_ssl_common_name';
                analytics.trackTextChange(id, text);
                expect(global.analytics.track).toHaveBeenCalledWith('store-design_change', {
                    ...universalData,
                    category: 'store-design_change',
                    element: 'input',
                    id,
                    label: 'store-design_text_change',
                    text,
                });
            });
        });

        describe('trackColorChange', () => {
            it('calls analytics.track with proper arguments', () => {
                const color = '#FFFFFF';
                const id = 'pretty-color';
                const colorCount = 25;
                const colorReuse = true;
                analytics.trackColorChange(id, color, colorCount, colorReuse);
                expect(global.analytics.track).toHaveBeenCalledWith('store-design_change', {
                    ...universalData,
                    category: 'store-design_change',
                    color,
                    color_count: colorCount,
                    color_reuse: colorReuse,
                    element: 'div',
                    id,
                    label: 'store-design_color_change',
                    text: '',
                });
            });
        });

        describe('trackImageUpload', () => {
            it('calls analytics.track with proper arguments', () => {
                const imageName = 'kermit_the_frog';
                const id = 'optimizedCheckout-backgroundImage';
                analytics.trackImageUpload(id, imageName);
                expect(global.analytics.track).toHaveBeenCalledWith('store-design_change', {
                    ...universalData,
                    category: 'store-design_change',
                    element: 'div',
                    id,
                    imageName,
                    label: 'store-design_image_upload',
                    text: 'Upload image',
                });
            });
        });

        describe('trackViewLiveStore', () => {
            it('calls analytics.track with proper arguments', () => {
                analytics.trackViewLiveStore();
                expect(global.analytics.track).toHaveBeenCalledWith('store-design_click', {
                    ...universalData,
                    category: 'store-design_view-store',
                    element: 'a',
                    label: 'store-design_view-store',
                    text: 'View live store',
                });
            });
        });

        describe('trackCollapseSideMenu', () => {
            it('calls analytics.track with proper arguments', () => {
                analytics.trackCollapseSideMenu(true);
                expect(global.analytics.track).toHaveBeenCalledWith('store-design_click', {
                    ...universalData,
                    category: 'store-design_side-menu',
                    collapsed: 'true',
                    element: 'button',
                    label: 'store-design_side-menu-collapse',
                    text: '',
                });
            });
        });

        describe('trackHelp', () => {
            it('calls analytics.track with proper arguments', () => {
                analytics.trackHelp('Help');
                expect(global.analytics.track).toHaveBeenCalledWith('store-design_click', {
                    ...universalData,
                    category: 'store-design_help',
                    element: 'a',
                    label: 'store-design_help',
                    text: 'Help',
                });
            });
        });

        describe('trackCopyPrivateLink', () => {
            it('calls analytics.track with proper arguments', () => {
                analytics.trackCopyPrivateLink('Copy Private Link');
                expect(global.analytics.track).toHaveBeenCalledWith('store-design_click', {
                    ...universalData,
                    category: 'store-design_copy-private-link',
                    element: 'button',
                    label: 'store-design_copy-private-link',
                    text: 'Copy Private Link',
                });
            });
        });

        describe('trackAddTheme', () => {
            it('calls analytics.track with proper arguments', () => {
                analytics.trackAddTheme('12345', 'Add Theme');
                expect(global.analytics.track).toHaveBeenCalledWith('store-design_click', {
                    ...universalData,
                    category: 'store-design_add-theme',
                    element: 'button',
                    label: 'store-design_header-add-theme',
                    text: 'Add Theme',
                    variation_id: '12345',
                });
            });
        });

        describe('trackVariationChange', () => {
            it('calls analytics.track with proper arguments', () => {
                analytics.trackVariationChange('12345', 'Pretty Variation');
                expect(global.analytics.track).toHaveBeenCalledWith('store-design_click', {
                    ...universalData,
                    category: 'store-design_variation-change',
                    element: 'div',
                    label: 'store-design_variation-change',
                    selected_variation_id: '12345',
                    text: 'Pretty Variation',
                });
            });
        });

        describe('trackHistoryChange', () => {
            it('calls analytics.track with proper arguments', () => {
                analytics.trackHistoryChange('12345', '56789', 'Lovely History');
                expect(global.analytics.track).toHaveBeenCalledWith('store-design_click', {
                    ...universalData,
                    category: 'store-design_history-change',
                    element: 'div',
                    label: 'store-design_history-change',
                    selected_configuration_id: '56789',
                    selected_variation_id: '12345',
                    text: 'Lovely History',
                });
            });
        });

        describe('trackOptOut', () => {
            it('calls analytics.track with proper arguments', () => {
                analytics.trackOptOut();
                expect(global.analytics.track).toHaveBeenCalledWith('store-design_click', {
                    ...universalData,
                    category: 'store-design_opt-out',
                    element: 'a',
                    label: 'store-design_opt-out',
                    text: 'Switch to old Theme Editor',
                });
            });
        });
    });

    describe('when we do not have segment initialized', () => {
        beforeEach(() => {
            analytics.init(storeCreator({
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
            expect(() => analytics.trackPublish('1234')).not.toThrow();
        });
    });

    describe('when we do not have the redux store initialized', () => {
        beforeEach(() => {
            global.analytics = {
                track: jest.fn(),
            };
        });

        it('does not call analytics.track', () => {
            expect(() => analytics.trackPublish('1234')).not.toThrow();
            expect(global.analytics.track).not.toHaveBeenCalled();
        });
    });
});
