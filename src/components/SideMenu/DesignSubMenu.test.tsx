import { shallow } from 'enzyme';
import React from 'react';

import DesignSubMenu from './DesignSubMenu';

it('renders', () => {
  const menu = shallow(
    <DesignSubMenu sections={['fred', 'joe']} currentPath="/design/logo"/>
  );

  expect(menu).toMatchSnapshot();
});
