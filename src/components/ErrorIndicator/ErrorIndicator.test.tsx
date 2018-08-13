import { shallow } from 'enzyme';
import React from 'react';

import { ErrorIndicator } from './ErrorIndicator';

describe('ErrorIndicator', () => {
    let clearErrors: any;

    beforeEach(() => {
        clearErrors = jest.fn();
    });

    describe('when rendering', () => {
        it('renders with no errors', () => {
            const errorIndicator = shallow(
                <ErrorIndicator clearErrors={clearErrors} errors={[]}/>);
            expect(errorIndicator).toMatchSnapshot();
        });

        it('renders with errors', () => {
            const errors = [
                new Error('hello'),
                new Error('goodbye'),
            ];

            const errorIndicator = shallow(
                <ErrorIndicator clearErrors={clearErrors} errors={errors}/>);
            expect(errorIndicator).toMatchSnapshot();
        });
    });

    describe('when clicking the OK button', () => {
        it('calls the clearErrors function', () => {
            const errorIndicator = shallow(
                <ErrorIndicator clearErrors={clearErrors} errors={[]}/>);

            errorIndicator.find('ButtonInput').simulate('click');

            expect(clearErrors).toHaveBeenCalled();
        });
    });
});
