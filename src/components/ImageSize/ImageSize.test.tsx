import { shallow } from 'enzyme';
import React from 'react';
import ImageSize from './ImageSize';

it('renders', () => {
  const testItems = [
    {
      label: 'Optimized for theme',
      value: '100x100',
    },
    {
      label: 'Specify dimensions',
      value: 'foo',
    },
  ];
  const imageSize = shallow(
    <ImageSize
        label="test"
        options={testItems}
        selected="foo"
        name="test"
    />
  );

  expect(imageSize).toMatchSnapshot();
});
