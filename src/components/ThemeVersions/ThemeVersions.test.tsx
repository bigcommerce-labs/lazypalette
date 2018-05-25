import { shallow } from 'enzyme';
import React from 'react';
import ThemeModule from './ThemeModule';

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
    <ThemeModule variants={testItems} />
  );

  expect(themeModule).toMatchSnapshot();
});
