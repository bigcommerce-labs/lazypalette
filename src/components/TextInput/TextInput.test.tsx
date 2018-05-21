import { shallow } from 'enzyme';
import React from 'react';

import TextInput from './TextInput';

const id = 'TextInputTestId';

it('renders', () => {
  const textInput = shallow(
    <TextInput inputId={id} label="Name your version" />
  );
  expect(textInput).toMatchSnapshot();
});

it('renders a valid state', () => {
  const textInput = shallow(
    <TextInput inputId={id} label="Name your version" defaultValue="abc" pattern="abc" />
  );
  expect(textInput).toMatchSnapshot();
});

it('renders an invalid state', () => {
  const textInput = shallow(
    <TextInput inputId={id} label="Name your version" defaultValue="adlkfj" pattern="abc" />
  );
  expect(textInput).toMatchSnapshot();
});
