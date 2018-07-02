import { shallow } from 'enzyme';
import React from 'react';

import ColorPicker from './ColorPicker';

it('renders', () => {
    const colorPicker = shallow(
        <ColorPicker inputId="blah" name="color-primary"/>
    );
    expect(colorPicker).toMatchSnapshot();
});

it('renders an initial color if provided', () => {
    const colorPicker = shallow(
        <ColorPicker inputId="blah" name="color-primary" color="#fff" />
    );
    expect(colorPicker).toMatchSnapshot();
});
