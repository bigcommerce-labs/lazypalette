import { shallow } from 'enzyme';
import React from 'react';

import { MoreOptions } from './MoreOptions';

const mockProp: any = jest.fn();
const routeProps = {
    history: mockProp,
    location: mockProp,
    match: mockProp,
    staticContext: mockProp,
};

describe('<MoreOptions />', () => {
    describe('render()', () => {
        it('renders the component', () => {
            const moreOptions = shallow(
                <MoreOptions
                    position={{ x: 10, y: 10 }}
                    {...routeProps}
                />
            );

            expect(moreOptions).toMatchSnapshot();
        });
    });
});
