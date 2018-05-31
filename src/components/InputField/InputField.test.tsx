import { shallow } from 'enzyme';
import React from 'react';

import InputField from './InputField';

const id = 'InputTestId';

it('renders', () => {
  const inputField = shallow(
    <InputField inputId={id} label="Name your version" />
  );
  expect(inputField).toMatchSnapshot();
});

it('renders a valid state', () => {
  const inputField = shallow(
    <InputField inputId={id} label="Name your version" defaultValue="abc" pattern="abc" />
  );
  expect(inputField).toMatchSnapshot();
});

it('renders an invalid state', () => {
  const inputField = shallow(
    <InputField inputId={id} label="Name your version" defaultValue="adlkfj" pattern="abc" />
  );
  expect(inputField).toMatchSnapshot();
});
