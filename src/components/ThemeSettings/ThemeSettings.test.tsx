import { shallow } from 'enzyme';
import React from 'react';
import { MemoryRouter, withRouter } from 'react-router';

import { ThemeSettings } from './ThemeSettings';

const WrappedThemeSettings = withRouter(ThemeSettings);

it('renders', () => {
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
        ],
    };

    const themeSettings = shallow(
        <MemoryRouter initialEntries={[ { pathname: '/', key: 'blah' } ]}>
            <WrappedThemeSettings settingsIndex={1} themeSettings={testItems}>
            </WrappedThemeSettings>
        </MemoryRouter>
    );

    expect(themeSettings).toMatchSnapshot();
});
