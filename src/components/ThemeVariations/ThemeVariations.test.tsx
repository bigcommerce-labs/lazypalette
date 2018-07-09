import { shallow } from 'enzyme';
import React from 'react';

import ExpandableMenu from '../ExpandableMenu/ExpandableMenu';

import ThemeModule from './ThemeModule';

it('renders', () => {
    const mockVariationChange = jest.fn();
    const testItems = [
        {
            image: 'http://meow.wow.com/123.jpg',
            isActive: false,
            name: 'light',
            variationId: '123',
        },
        {
            image: 'http://meow.wow.com/123.jpg',
            isActive: true,
            name: 'dark',
            variationId: '234',
        },
    ];

    const themeModule = shallow(
        <ExpandableMenu title="foo">
            <ThemeModule variants={testItems} handleVariationChange={mockVariationChange}/>
        </ExpandableMenu>
    );

    expect(themeModule).toMatchSnapshot();
});
