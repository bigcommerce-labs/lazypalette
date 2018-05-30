import { shallow } from 'enzyme';
import React from 'react';

import CheckboxInput from './CheckboxInput';

const id = 'CheckboxTestId';

it('renders', () => {
  const checkbox = shallow(
    <CheckboxInput inputId={id} label="Label" />
  );
  expect(checkbox).toMatchSnapshot();
});
