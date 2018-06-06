import { shallow } from 'enzyme';
import React from 'react';

import ColorPicker from './ColorPicker';

it('renders', () => {
  const colorPicker = shallow(
    <ColorPicker />
  );
  expect(colorPicker).toMatchSnapshot();
});

it('renders an initial color if provided', () => {
  const colorPicker = shallow(
    <ColorPicker initialColor={{ a: 1, r: 255, g: 255, b: 255}} />
  );
  expect(colorPicker).toMatchSnapshot();
});
