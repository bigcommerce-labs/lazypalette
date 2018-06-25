import { shallow } from 'enzyme';
import React from 'react';

import ButtonInput from './ButtonInput';

it('renders', () => {
    const buttonInput = shallow(
        <ButtonInput disabled={false} classType="primary" type="button">
      Click Meow!
        </ButtonInput>
    );

    expect(buttonInput).toMatchSnapshot();
});
