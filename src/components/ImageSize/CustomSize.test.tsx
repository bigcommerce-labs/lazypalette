import { shallow } from 'enzyme';
import React from 'react';

import CustomSize from './CustomSize';

describe('<CustomSize /> test', () => {
    const customImageSize = shallow(
        <CustomSize
            defaultValue="250x100"
        />
    );

    it('should render 2 <InputField />', () => {
        expect(customImageSize.find('InputField').length).toBe(2);
    });

    it('should render one of the ImputField with the label as "Max width" and the other as "Max height"', () => {
        expect(customImageSize.find('InputField').getElements()[0].props.label).toBe('Max width');
        expect(customImageSize.find('InputField').getElements()[1].props.label).toBe('Max height');
    });
});
