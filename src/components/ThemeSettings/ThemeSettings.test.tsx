import { shallow } from 'enzyme';
import React from 'react';
import { withRouter, MemoryRouter } from 'react-router';

import { ThemeSettings } from './ThemeSettings';

const WrappedThemeSettings = withRouter(ThemeSettings);

it('renders', () => {
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
    const mockFetch = jest.fn();
    const themeSettings = shallow(
        <MemoryRouter initialEntries={[ { pathname: '/', key: 'blah' } ]}>
            <WrappedThemeSettings
                settingsIndex={1}
                themeSettings={testItems}
                settings={settings}
                updateThemeConfigChange={mockFetch}
            >
            </WrappedThemeSettings>
        </MemoryRouter>
    );

    expect(themeSettings).toMatchSnapshot();
});
