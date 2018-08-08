import { shallow } from 'enzyme';
import React from 'react';
import createMockStore from 'redux-mock-store';

import ColorSetting from './ColorSetting';

const mockStore = createMockStore([]);

it('renders', () => {
    const store = mockStore({});

    const colorSetting = shallow(
        <ColorSetting inputId="blah" name="blah2" />,
        { context: { store } }).dive();
    expect(colorSetting).toMatchSnapshot();
});

it('renders an initial color if provided', () => {
    const store = mockStore({});
    const colorSetting = shallow(
        <ColorSetting inputId="blah" name="blah2" color="#fff" />,
        { context: { store } }).dive();
    expect(colorSetting).toMatchSnapshot();
});
