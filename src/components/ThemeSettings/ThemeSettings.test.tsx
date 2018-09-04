import {  shallow } from 'enzyme';
import React from 'react';

import { getEditor, ThemeSettings } from './ThemeSettings';

const settings = {
    brandpage_products_per_page: 12,
    categorypage_products_per_page: 12,
    homepage_blog_posts_count: 3,
    homepage_featured_products_column_count: 4,
    homepage_featured_products_count: 8,
    homepage_new_products_column_count: 4,
    homepage_new_products_count: 12,
    homepage_show_carousel: true,
    homepage_top_products_column_count: 4,
    homepage_top_products_count: 8,
    productpage_related_products_count: 10,
    productpage_reviews_count: 9,
    productpage_similar_by_views_count: 10,
    productpage_videos_count: 8,
    searchpage_products_per_page: 12,
    show_product_quick_view: true,
};

const preSetValue = {
    'test-imageDimension': '20x20',
    'test-imageUpload': 'hello_there',
    'test-select': 1,
    'test-text': 'kermit_the_frog',
    'testing-checkbox': false,
    'testing-color-picker': '#FFFFF',
    'testing-font': false,
};

const mockProp: any = jest.fn();
const routeProps = {
    history: mockProp,
    location: mockProp,
    match: mockProp,
    staticContext: mockProp,
};

describe('<ThemeSettings />', () => {
    describe('render()', () => {
        it('renders the component', () => {
            const mockFetch = jest.fn();
            const testItems = {
                name: 'Typography & Icons',
                settings: [
                    {
                        content: 'Logo',
                        type: 'heading',
                    },
                    {
                        id: 'logo-font',
                        label: 'Font family',
                        options: [
                            {
                                group: 'Oswald',
                                label: 'Oswald',
                                value: 'Google_Oswald_400',
                            },
                            {
                                group: 'Oswald',
                                label: 'Oswald Light',
                                value: 'Google_Oswald_300',
                            },
                        ],
                        type: 'font',
                    },
                    {
                        content: 'Headings',
                        type: 'heading',
                    },
                    {
                        id: 'color-textHeading',
                        label: 'Headings text color',
                        type: 'color',
                    },
                    {
                        description: 'Please specify a maximum image size for desktop display.',
                        force_reload: true,
                        id: 'logo_size',
                        label: 'Logo size',
                        options: [
                            {
                                label: 'Original (as uploaded)',
                                value: 'original',
                            },
                            {
                                label: 'Optimized for theme',
                                value: '250x100',
                            },
                            {
                                label: 'Specify dimensions',
                                value: 'custom',
                            },
                        ],
                        type: 'imageDimension',
                    },
                    {
                        force_reload: true,
                        id: 'logo-position',
                        label: 'Logo position',
                        options: [
                            {
                                label: 'Right',
                                value: 'right',
                            },
                            {
                                label: 'Center',
                                value: 'center',
                            },
                            {
                                label: 'Left',
                                value: 'left',
                            },
                        ],
                        type: 'select',
                    },
                    {
                        force_reload: true,
                        id: 'show_powered_by',
                        label: 'Show Powered By',
                        type: 'checkbox',
                    },
                    {
                        id: 'pdp-sale-price-label',
                        label: 'Product sale price label',
                        type: 'text',
                    },
                ],
            };
            const themeSettings = shallow(
                <ThemeSettings
                    position={{ x: 5, y: 10 }}
                    settingsIndex={1}
                    themeSettings={testItems}
                    settings={settings}
                    updateThemeConfigChange={mockFetch}
                    {...routeProps}
                />
            );

            expect(themeSettings).toMatchSnapshot();
        });
    });

    describe('when handleChange is called', () => {
        describe('when target type is checkbox', () => {
            it('should update themeconfig to new value', () => {
                const testItems = {
                    name: 'Typography & Icons',
                    settings: [
                        {
                            content: 'Logo',
                            type: 'heading',
                        },
                        {
                            id: 'hide_content',
                            label: 'Hide links on webpage',
                            type: 'checkbox',
                        },
                        {
                            id: 'logo-font',
                            label: 'Font family',
                            options: [
                                {
                                    group: 'Oswald',
                                    label: 'Oswald',
                                    value: 'Google_Oswald_400',
                                },
                                {
                                    group: 'Oswald',
                                    label: 'Oswald Light',
                                    value: 'Google_Oswald_300',
                                },
                            ],
                            type: 'font',
                        },
                        {
                            content: 'Headings',
                            type: 'heading',
                        },
                        {
                            id: 'color-textHeading',
                            label: 'Headings text color',
                            type: 'color',
                        },
                        {
                            description: 'Please specify a maximum image size for desktop display.',
                            force_reload: true,
                            id: 'logo_size',
                            label: 'Logo size',
                            options: [
                                {
                                    label: 'Original (as uploaded)',
                                    value: 'original',
                                },
                                {
                                    label: 'Optimized for theme',
                                    value: '250x100',
                                },
                                {
                                    label: 'Specify dimensions',
                                    value: 'custom',
                                },
                            ],
                            type: 'imageDimension',
                        },
                        {
                            force_reload: true,
                            id: 'logo-position',
                            label: 'Logo position',
                            options: [
                                {
                                    label: 'Right',
                                    value: 'right',
                                },
                                {
                                    label: 'Center',
                                    value: 'center',
                                },
                                {
                                    label: 'Left',
                                    value: 'left',
                                },
                            ],
                            type: 'select',
                        },
                        {
                            force_reload: true,
                            id: 'show_powered_by',
                            label: 'Show Powered By',
                            type: 'checkbox',
                        },
                        {
                            id: 'pdp-sale-price-label',
                            label: 'Product sale price label',
                            type: 'text',
                        },
                    ],
                };

                const setting = {
                    id: 'hide_content',
                    label: 'Hide links on webpage',
                    type: 'checkbox',
                };

                let themeSettings: any;

                themeSettings = shallow(
                    <ThemeSettings
                        position={{ x: 5, y: 10 }}
                        settingsIndex={1}
                        themeSettings={testItems}
                        settings={settings}
                        updateThemeConfigChange={mockProp}
                        {...routeProps}
                    />
                );

                const target = {
                    checked: false,
                    type: 'checkbox',
                };

                themeSettings.instance().handleChange(setting)({ target });
                expect(mockProp).toBeCalledWith({ setting, value: target.checked });
            });
        });

        describe('when target is not a checkbox', () => {
            it('should update with the correct value', () => {
                const testItems = {
                    name: 'Typography & Icons',
                    settings: [
                        {
                            content: 'Logo',
                            type: 'heading',
                        },
                        {
                            id: 'hide_content',
                            label: 'Hide links on webpage',
                            type: 'checkbox',
                        },
                    ],
                };

                const setting = {
                    id: 'color-textHeading',
                    label: 'Headings text color',
                    type: 'color',
                };

                let themeSettings: any;

                themeSettings = shallow(
                    <ThemeSettings
                        position={{ x: 5, y: 10 }}
                        settingsIndex={1}
                        themeSettings={testItems}
                        settings={settings}
                        updateThemeConfigChange={mockProp}
                        {...routeProps}
                    />
                );

                const target = {
                    type: 'color',
                    value: '#FF123',
                };

                themeSettings.instance().handleChange(setting)({ target });
                expect(mockProp).toBeCalledWith({ setting, value: target.value });
            });
        });
    });

    describe('getEditor', () => {
        describe('when type equals color', () => {
            it('should return with the correct type', () => {
                const setting = {
                    id: 'testing-color-picker',
                    label: 'Button text color',
                    type: 'color',
                };

                const colorPicker = getEditor(setting, preSetValue, mockProp, mockProp);
                expect(colorPicker).toMatchSnapshot();
            });
        });

        describe('when type equals checkbox', () => {
            it('should return with the correct type', () => {
                const setting = {
                    id: 'testing-checkbox',
                    label: 'Hide links to web pages',
                    type: 'checkbox',
                };

                const checkBox = getEditor(setting, preSetValue, mockProp, mockProp);
                expect(checkBox).toMatchSnapshot();
            });
        });

        describe('when type equals font', () => {
            it('should return with the correct type', () => {
                const setting = {
                    id: 'testing-font',
                    label: 'Logo Font Family',
                    type: 'font',
                };

                const font = getEditor(setting, preSetValue, mockProp, mockProp);
                expect(font).toMatchSnapshot();
            });
        });

        describe('when type equals imageDimension', () => {
            it('should return the correct type', () => {
                const setting = {
                    id: 'test-imageDimension',
                    label: 'Background image',
                    type: 'imageDimension',
                };

                const imageDimension = getEditor(setting, preSetValue, mockProp, mockProp);
                expect(imageDimension).toMatchSnapshot();
            });
        });

        describe('when type equals optimizedCheckout-image', () => {
            it('should return the correct type', () => {
                const setting = {
                    id: 'test-imageUpload',
                    label: 'Upload image',
                    type: 'optimizedCheckout-image',
                };

                const checkoutImageUpload = getEditor(setting, preSetValue, mockProp, mockProp);
                expect(checkoutImageUpload).toMatchSnapshot();
            });
        });

        describe('when type equals select', () => {
            it('should return correct type', () => {
                const setting = {
                    id: 'test-select',
                    label: 'Logo type',
                    type: 'select',
                };

                const selectBox = getEditor(setting, preSetValue, mockProp, mockProp);
                expect(selectBox).toMatchSnapshot();
            });
        });

        describe('when type equals text', () => {
            it('should return correct type', () => {
                const setting = {
                    id: 'test-text',
                    label: '',
                    type: 'text',
                };

                const text = getEditor(setting, preSetValue, mockProp, mockProp);
                expect(text).toMatchSnapshot();
            });
        });

        describe('when type equals heading', () => {
            it('should return correct type', () => {
                const setting = {
                    content: 'HELLO',
                    type: 'heading',
                };
                const heading = getEditor(setting, preSetValue, mockProp, mockProp);
                expect(heading).toMatchSnapshot();
            });
        });

        describe('when type is not listed', () => {
            it('should return null', () => {
                const setting = {
                    content: 'whatever',
                    type: 'not_a_real_type',
                };
                const notRealType = getEditor(setting, preSetValue, mockProp, mockProp);
                expect(notRealType).toEqual(null);
            });
        });
    });
});
