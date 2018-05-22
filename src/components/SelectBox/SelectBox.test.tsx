import { shallow } from 'enzyme';
import React from 'react';

import SelectBox from './SelectBox';

it('renders', () => {
  const selectBox = shallow(
    <SelectBox label="Label" options={[]} />
  );
  expect(selectBox).toMatchSnapshot();
});
