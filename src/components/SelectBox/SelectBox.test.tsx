import { shallow } from 'enzyme';
import React from 'react';

import { Select } from './styles';
import SelectBox from './SelectBox';

describe('<SelectBox />', () => {
    it('renders', () => {
        const selectBox = shallow(
            <SelectBox
                label="Label"
                options={[]}
                name="test"
            />
        );
        expect(selectBox).toMatchSnapshot();
    });

    it('onChange is triggered and returns a value', () => {
        const mockOnChange = jest.fn();
        let event = {
            target: { value: 'Google_Oswald_300' },
        };
        const options = [
            {
                label: 'Oswald',
                value: 'Google_Oswald_400',
            },
            {
                label: 'Oswald Light',
                value: 'Google_Oswald_300',
            },
        ];
        const selectBox = shallow(
            <SelectBox
                label="Label"
                options={options}
                name="logo-font"
                onChange={mockOnChange}
                selected="Google_Oswald_400"
            />
        );

        selectBox.find(Select).simulate('change', event);
        expect(mockOnChange).toBeCalledWith({'logo-font': 'Google_Oswald_300'});

        event = {
            target: { value: 'Google_Oswald_400' },
        };

        selectBox.find(Select).simulate('change', event);
        expect(mockOnChange).toBeCalledWith({'logo-font': 'Google_Oswald_400'});
    });
});
