import { shallow } from 'enzyme';
import React from 'react';

import { sel } from '../../utils/testUtil';

import ButtonInput from './ButtonInput';

describe('<ButtonInput />', () => {

    const testId = 'buttonInput';

    it('renders', () => {
        const buttonInput = shallow(
            <ButtonInput disabled={false} classType="primary" type="button">
          Click Meow!
            </ButtonInput>
        );

        expect(buttonInput).toMatchSnapshot();
    });

    it('onClick handler works', () => {
        const mockClick = jest.fn();
        const event = {
            target: {
                value: 'testing',
            },
        };
        const buttonInput = shallow(
            <ButtonInput
                disabled={false}
                classType="primary"
                type="button"
                onClick={mockClick}
                testId={testId}
            >
          Click Meow!
            </ButtonInput>
        );

        buttonInput.find(sel(testId)).simulate('click', event);
        expect(mockClick).toBeCalledWith(event);
    });

});
