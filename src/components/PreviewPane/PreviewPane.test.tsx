import { shallow } from 'enzyme';
import React from 'react';
import createMockStore from 'redux-mock-store';
import PreviewPane from './PreviewPane';

it('renders', () => {
  const store = createMockStore([])({ previewPane: {} });
  const previewPane = shallow(<PreviewPane />, { context: { store }});

  expect(previewPane).toMatchSnapshot();
});
