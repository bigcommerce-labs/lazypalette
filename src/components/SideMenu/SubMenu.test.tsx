import { shallow } from 'enzyme';
import React from 'react';

import SubMenu from './SubMenu';

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

    const subMenu = shallow(
        <SubMenu title="Menu" currentPath="/" items={testItems}/>
    );

    expect(subMenu).toMatchSnapshot();
});
