import { shallow } from 'enzyme';
import React from 'react';

import HeaderMenu from './HeaderMenu';

it('renders', () => {
  const headerMenu = shallow(
    <HeaderMenu/>
  );

  expect(headerMenu).toMatchSnapshot();
});
