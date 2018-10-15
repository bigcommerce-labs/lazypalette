import { shallow } from 'enzyme';
import React from 'react';
import createMockStore from 'redux-mock-store';

import { ColorText } from './styles';
import ColorSetting from './ColorSetting';

const mockStore = createMockStore([]);

describe('ColorSetting', () => {
    it('should render', () => {
        const store = mockStore({});

        const colorSetting = shallow(
            <ColorSetting inputId="blah" name="blah2" />,
            { context: { store } }).dive();
        expect(colorSetting).toMatchSnapshot();
    });

    describe('when an initial color is provided', () => {
        it('should render and match ColorText box', () => {
            const store = mockStore({});
            const initialColor = '#FFFFFF';
            const colorSetting = shallow(
                <ColorSetting inputId="blah" name="blah2" color={initialColor} />,
                { context: { store } }).dive();
            const mockColorText = colorSetting.find(ColorText);

            expect(mockColorText.prop('children')).toEqual(initialColor);
            expect(colorSetting).toMatchSnapshot();
        });
    });

    describe('when an initial color does not start with a #', () => {
        it('should add a hash (#) before the hex code', () => {
            const store = mockStore({});
            const initialColor = 'FFFFFF';
            const expectedColor = '#' + initialColor;
            const colorSetting = shallow(
                <ColorSetting inputId="blah" name="blah2" color={initialColor} />,
                { context: { store } }).dive();
            const mockColorText = colorSetting.find(ColorText);

            expect(mockColorText.prop('children')).toEqual(expectedColor);
            expect(colorSetting).toMatchSnapshot();
        });
    });

    describe('when an initial color is a hex color but is not capitalized', () => {
        it('should capitalize the hex color', () => {
            const store = mockStore({});
            const initialColor = '#FFffff';
            const expectedColor = '#FFFFFF';
            const colorSetting = shallow(
                <ColorSetting inputId="blah" name="blah2" color={initialColor} />,
                { context: { store } }).dive();
            const mockColorText = colorSetting.find(ColorText);

            expect(mockColorText.prop('children')).toEqual(expectedColor);
            expect(colorSetting).toMatchSnapshot();
        });
    });

    describe('when an initial color is not a hex color', () => {
        it('should not capitalize the color', () => {
            const store = mockStore({});
            const initialColor = 'transparent';
            const expectedColor = 'Transparent';
            const colorSetting = shallow(
                <ColorSetting inputId="blah" name="blah2" color={initialColor} />,
                { context: { store } }).dive();
            const mockColorText = colorSetting.find(ColorText);

            expect(mockColorText.prop('children')).toEqual(expectedColor);
            expect(colorSetting).toMatchSnapshot();
        });
    });
});
