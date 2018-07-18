import { shallow } from 'enzyme';
import React from 'react';

import ColorPicker from './ColorPicker';

it('renders', () => {
    const colorPicker = shallow(
        <ColorPicker inputId="blah" />
    );
    expect(colorPicker).toMatchSnapshot();
});

it('renders an initial color if provided', () => {
    const colorPicker = shallow(
        <ColorPicker inputId="blah" color="#fff" />
    );
    expect(colorPicker).toMatchSnapshot();
});
