import { shallow } from 'enzyme';
import React from 'react';

import CheckboxInput from './CheckboxInput';

const id = 'CheckboxTestId';

it('renders', () => {
  const checkbox = shallow(
    <CheckboxInput
        checked={true}
        inputId={id}
        label="Label"
        name="show_accept_amex"/>
  );
  expect(checkbox).toMatchSnapshot();
});
