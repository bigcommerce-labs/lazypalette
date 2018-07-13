import { shallow } from 'enzyme';
import React from 'react';

import { Button } from './styles';
import ButtonInput from './ButtonInput';

describe('<ButtonInput />', () => {

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
            >
          Click Meow!
            </ButtonInput>
        );

        buttonInput.find(Button).simulate('click', event);
        expect(mockClick).toBeCalledWith(event);
    });

});
