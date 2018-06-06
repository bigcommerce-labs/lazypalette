import { shallow } from 'enzyme';
import React from 'react';
import ThemeModule from './ThemeModule';

import ExpandableMenu from '../ExpandableMenu/ExpandableMenu';

it('renders', () => {
  const testItems = [
    {
      image: 'http://meow.wow.com/123.jpg',
      name: 'light',
    },
    {
      image: 'http://meow.wow.com/123.jpg',
      name: 'dark',
    },
  ];

  const themeModule = shallow(
    <ExpandableMenu title="foo">
      <ThemeModule variants={testItems} />
    </ExpandableMenu>
  );

  expect(themeModule).toMatchSnapshot();
});
