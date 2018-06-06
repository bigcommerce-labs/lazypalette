import { shallow } from 'enzyme';
import React from 'react';
import ExpandableMenu from './ExpandableMenu';

it('renders', () => {
  const TestChildren = () => (
    <div>some inner content</div>
  );

  const expandableMenu = shallow(
    <ExpandableMenu title="foo" back="/bar">
      <TestChildren />
    </ExpandableMenu>
  );

  expect(expandableMenu).toMatchSnapshot();
});
