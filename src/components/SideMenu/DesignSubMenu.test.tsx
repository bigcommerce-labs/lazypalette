import { shallow } from 'enzyme';
import React from 'react';

import DesignSubMenu from './DesignSubMenu';

it('renders', () => {
    const mockHandleSave = jest.fn();
    const mockHandleReset = jest.fn();

    const menu = shallow(
        <DesignSubMenu
            sections={['fred', 'joe']}
            isChanged={false}
            currentPath="/design/logo"
            handleSave={mockHandleSave}
            handleReset={mockHandleReset}
        />
    );

    expect(menu).toMatchSnapshot();
});
