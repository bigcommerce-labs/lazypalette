import { shallow } from 'enzyme';
import React from 'react';

import ColorPicker from './ColorPicker';

it('renders', () => {
  const colorPicker = shallow(
    <ColorPicker name="color-primary"/>
  );
  expect(colorPicker).toMatchSnapshot();
});

it('renders an initial color if provided', () => {
  const colorPicker = shallow(
    <ColorPicker name="color-primary" initialColor="#fff" />
  );
  expect(colorPicker).toMatchSnapshot();
});
