import { render, shallow } from 'enzyme';
import React from 'react';

import ColorPicker from './ColorPicker';

describe('ColorPicker', () => {
    describe('when rendered', () => {
        it('matches the snapshot', () => {
            const colorPicker = render(<ColorPicker color="#FFFFFF"/>);
            expect(colorPicker).toMatchSnapshot();
        });
    });

    describe('when a change occurs', () => {
        it('calls its onChange prop with the appropriate new color', () => {
            const mockOnChange = jest.fn();

            const colorPicker = shallow(<ColorPicker color="#FFFFFF" onChange={mockOnChange}/>);
            colorPicker.instance()['handleChange']({ hex: '#bbbbbb' }); // tslint:disable-line
            expect(mockOnChange).toMatchSnapshot();
        });

        it('calls its onChangeComplete prop with the appropriate new color after debounce timer expires', done => {
            const mockOnChangeComplete = jest.fn();

            const colorPicker = shallow(<ColorPicker color="#FFFFFF" onChangeComplete={mockOnChangeComplete}/>);

            colorPicker.instance()['handleChange']({ hex: '#cccccc' }); // tslint:disable-line

            setTimeout(() => {
                expect(mockOnChangeComplete).toMatchSnapshot();
                done();
            }, 200);
        });
    });

    describe('when the hex field is modified', () => {
        it('calls its onChange prop with the proper arguments', () => {
            const mockOnChange = jest.fn();

            const colorPicker = shallow(<ColorPicker color="#FFFFFF" onChange={mockOnChange}/>).dive();
            colorPicker.instance()['handleFieldChange']({ hex: 'aaaaaa' }); // tslint:disable-line
            expect(mockOnChange).toMatchSnapshot();
        });
    });

    describe('when the r field is modified', () => {
        it('calls its onChange prop with the proper arguments', () => {
            const mockOnChange = jest.fn();

            const colorPicker = shallow(<ColorPicker color="#FFFFFF" onChange={mockOnChange}/>).dive();
            colorPicker.instance()['handleFieldChange']({ r: '120' }); // tslint:disable-line
            expect(mockOnChange).toMatchSnapshot();
        });
    });

    describe('when the g field is modified', () => {
        it('calls its onChange prop with the proper arguments', () => {
            const mockOnChange = jest.fn();

            const colorPicker = shallow(<ColorPicker color="#FFFFFF" onChange={mockOnChange}/>).dive();
            colorPicker.instance()['handleFieldChange']({ g: '120' }); // tslint:disable-line
            expect(mockOnChange).toMatchSnapshot();
        });
    });

    describe('when the b field is modified', () => {
        it('calls its onChange prop with the proper arguments', () => {
            const mockOnChange = jest.fn();

            const colorPicker = shallow(<ColorPicker color="#FFFFFF" onChange={mockOnChange}/>).dive();
            colorPicker.instance()['handleFieldChange']({ b: '120' }); // tslint:disable-line
            expect(mockOnChange).toMatchSnapshot();
        });
    });
});
