import { shallow } from 'enzyme';
import React from 'react';

import ImageSize from './ImageSize';

describe('<ImageSize /> test', () => {
    const testItems = [
        {
            label: 'Original (as uploaded)',
            value: 'original',
        },
        {
            label: 'Optimized for theme',
            value: '250x100',
        },
        {
            label: 'Specify dimensions',
            value: 'custom',
        },
    ];

    const imageSize = shallow(
        <ImageSize
            label="test"
            options={testItems}
            selected="foo"
            name="test"
        />
    );

    const imageCustomSize = shallow(
        <ImageSize
            label="test"
            options={testItems}
            selected="custom"
            name="test"
        />
    );

    it('should render <SelectBox />', () => {
        expect(imageSize).toMatchSnapshot();
    });

    it('should render <SelectBox /> and <CustomSize /> components', () => {
        expect(imageCustomSize).toMatchSnapshot();
    });
});
