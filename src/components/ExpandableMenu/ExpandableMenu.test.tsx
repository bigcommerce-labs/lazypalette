import { shallow } from 'enzyme';
import { LocationDescriptor } from 'history';
import React from 'react';

import ExpandableMenu from './ExpandableMenu';

it('renders', () => {
    const TestChildren = () => (
        <div>some inner content</div>
    );

    const locationDescriptor: LocationDescriptor = {
        pathname: 'bar',
    };

    const expandableMenu = shallow(
        <ExpandableMenu title="foo" back={locationDescriptor}>
            <TestChildren/>
        </ExpandableMenu>
    );

    expect(expandableMenu).toMatchSnapshot();
});
