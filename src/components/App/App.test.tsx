import { shallow } from 'enzyme';
import React from 'react';
import { withRouter } from 'react-router';

import { App } from './App';

const WrappedApp = withRouter(App);

it('renders', () => {
  const mockFetch = jest.fn();
  const app = shallow(
    <WrappedApp fetchInitialState={mockFetch}/>
  );

  expect(app).toMatchSnapshot();
});
