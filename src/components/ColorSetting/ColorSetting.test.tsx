import { shallow } from 'enzyme';
import React from 'react';

import { ColorText } from './styles';
import { ColorSetting } from './ColorSetting';

describe('ColorSetting', () => {
    const mockOpenColorPicker = jest.fn();

    it('should render', () => {

        const colorSetting = shallow(
            <ColorSetting
                inputId="blah"
                name="blah2"
                openColorPicker={mockOpenColorPicker}
            />);

        expect(colorSetting).toMatchSnapshot();
    });

    describe('when an initial color is provided', () => {
        it('should render and match ColorText box', () => {
            const initialColor = '#FFFFFF';
            const colorSetting = shallow(
                <ColorSetting
                    color={initialColor}
                    inputId="blah"
                    name="blah2"
                    openColorPicker={mockOpenColorPicker}
                />);
            const mockColorText = colorSetting.find(ColorText);

            expect(mockColorText.prop('children')).toEqual(initialColor);
            expect(colorSetting).toMatchSnapshot();
        });
    });

    describe('when an initial color does not start with a #', () => {
        it('should add a hash (#) before the hex code', () => {
            const initialColor = 'FFFFFF';
            const expectedColor = '#' + initialColor;
            const colorSetting = shallow(
                <ColorSetting
                    color={initialColor}
                    inputId="blah"
                    name="blah2"
                    openColorPicker={mockOpenColorPicker}
                />);
            const mockColorText = colorSetting.find(ColorText);

            expect(mockColorText.prop('children')).toEqual(expectedColor);
            expect(colorSetting).toMatchSnapshot();
        });
    });

    describe('when an initial color is a hex color but is not capitalized', () => {
        it('should capitalize the hex color', () => {
            const initialColor = '#FFffff';
            const expectedColor = '#FFFFFF';
            const colorSetting = shallow(
                <ColorSetting
                    color={initialColor}
                    inputId="blah"
                    name="blah2"
                    openColorPicker={mockOpenColorPicker}
                />);
            const mockColorText = colorSetting.find(ColorText);

            expect(mockColorText.prop('children')).toEqual(expectedColor);
            expect(colorSetting).toMatchSnapshot();
        });
    });

    describe('when an initial color is not a hex color', () => {
        it('should not capitalize the color', () => {
            const initialColor = 'transparent';
            const expectedColor = 'Transparent';
            const colorSetting = shallow(
                <ColorSetting
                    color={initialColor}
                    inputId="blah"
                    name="blah2"
                    openColorPicker={mockOpenColorPicker}
                />);
            const mockColorText = colorSetting.find(ColorText);

            expect(mockColorText.prop('children')).toEqual(expectedColor);
            expect(colorSetting).toMatchSnapshot();
        });
    });

    describe('when the color changes', () => {
        it('should capitalize the color', () => {
            const initialColor = 'transparent';
            const expectedColor = '#ABCDEF';
            const colorSetting = shallow(
                <ColorSetting
                    color={initialColor}
                    inputId="blah"
                    name="blah2"
                    openColorPicker={mockOpenColorPicker}
                />);
            const mockColorText = colorSetting.find(ColorText);

            (colorSetting.instance() as ColorSetting).handleChange({
                hex: '#abcdef',
                hsl: { h: 1, s: 1, l: 1 },
                rgb: { r: 1, g: 1, b: 1 },
            });

            setTimeout(() => {
                expect(mockColorText.prop('children')).toEqual(expectedColor);
                expect(colorSetting).toMatchSnapshot();
            });
        });
    });
});
