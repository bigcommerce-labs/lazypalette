import { shallow } from 'enzyme';
import React from 'react';

import CustomSize from './CustomSize';

describe('<CustomSize /> test', () => {
    const customImageSize = shallow(
        <CustomSize
            defaultValue="250x100"
        />
    );

    it('should render 2 <NumberInput />', () => {
        expect(customImageSize.find('NumberInput').length).toBe(2);
    });

    it('should render one of the ImputField with the label as "Max width" and the other as "Max height"', () => {
        expect(customImageSize.find('NumberInput').getElements()[0].props.label).toBe('Max width');
        expect(customImageSize.find('NumberInput').getElements()[1].props.label).toBe('Max height');
    });
});
