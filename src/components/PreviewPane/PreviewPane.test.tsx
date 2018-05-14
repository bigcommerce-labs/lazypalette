import { shallow } from 'enzyme';
import React from 'react';

import PreviewPane from './PreviewPane';

it('renders', () => {
  const previewPane = shallow(
    <PreviewPane/>
  );

  expect(previewPane).toMatchSnapshot();
});
