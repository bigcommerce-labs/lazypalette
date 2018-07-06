import { shallow } from 'enzyme';
import React from 'react';

import ExpandableMenu from '../ExpandableMenu/ExpandableMenu';

import ThemeModule from './ThemeModule';

it('renders', () => {
    const testItems = [
        {
            image: 'http://meow.wow.com/123.jpg',
            isActive: false,
            name: 'light',
        },
        {
            image: 'http://meow.wow.com/123.jpg',
            isActive: true,
            name: 'dark',
        },
    ];

    const themeModule = shallow(
        <ExpandableMenu title="foo">
            <ThemeModule variants={testItems} />
        </ExpandableMenu>
    );

    expect(themeModule).toMatchSnapshot();
});
