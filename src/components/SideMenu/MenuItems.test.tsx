import { shallow } from 'enzyme';
import React from 'react';

import MenuItems from './MenuItems';

it('renders', () => {
    const testItems = [
        {
            label: 'Logo and name',
            path: 'logo',
        },
        {
            label: 'Store theme',
            path: 'theme',
        },
    ];

    const menuItems = shallow(
        <MenuItems items={testItems} currentPath="/"/>
    );

    expect(menuItems).toMatchSnapshot();
});
