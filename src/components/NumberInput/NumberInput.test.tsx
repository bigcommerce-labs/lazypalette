import { shallow } from 'enzyme';
import React from 'react';

import { Sign, Status } from './constants';
import NumberInput from './NumberInput';

const numId = 'meow123';

describe('NumberInput', () => {
    it('renders', () => {
        const numberInput = shallow(
            <NumberInput
                disabled={false}
                inputId={numId}
                label="FooBar"
                value="5"
            />
        );
        expect(numberInput).toMatchSnapshot();
    });

    it('should render a default state', () => {
        const numberInput = shallow(
            <NumberInput
                inputId={numId}
                label="Max width"
                value="12"
            />
        );

        numberInput.find(`[id="${numId}"]`).simulate('blur', {});

        expect(numberInput).toMatchSnapshot();
    });

    it('should render an invalid state for required fields', () => {
        const numberInput = shallow(
            <NumberInput
                inputId={numId}
                label="Min height"
                required={true}
            />
        );

        numberInput.find(`[id="${numId}"]`).simulate('blur', {});

        expect(numberInput).toMatchSnapshot();
    });

    describe('when the user changes the input', () => {
        it('should call the onChange handler', () => {
            const mockHandler = jest.fn();
            const event = {
                target: { value: 'happyCat' },
            };
            const numberInput = shallow(
                <NumberInput
                    inputId={numId}
                    label="depth"
                    onChange={mockHandler}
                />
            );
            numberInput.find(`[id="${numId}"]`).simulate('change', event);
            expect(mockHandler).toBeCalledWith(event);
        });
    });

    describe('when the user clicks off the input area', () => {
        it('should call the onBlur handler', () => {
            const mockHandler = jest.fn();
            const event = {
                target: { value: 'happyCat' },
            };
            const numberInput = shallow(
                <NumberInput
                    inputId={numId}
                    label="volume"
                    onBlur={mockHandler}
                    required={true}
                />
            );
            numberInput.find(`[id="${numId}"]`).simulate('blur', event);
            expect(mockHandler).toBeCalledWith(event);
        });

        it('should cause an invaild status if the input is cleared', () => {
            const mockOnBlur = jest.fn();
            const event = {
                target: { value: '' },
            };
            const numberInput = shallow(
                <NumberInput
                    inputId={numId}
                    label="radius"
                    onBlur={mockOnBlur}
                    required={true}
                />
            );
            numberInput.find(`[id="${numId}"]`).simulate('change', event);
            numberInput.find(`[id="${numId}"]`).simulate('blur', event);
            expect(numberInput.state('status')).toBe(Status.Invalid);
        });
    });

    describe('when the user clicks the plus button', () => {
        const clickEvent = {
            target: { value: '+' },
        };

        it('should call the onChange handler with value + 1', () => {
            const mockHandler = jest.fn();
            const initialValue = '10';
            const changeEvent = {
                target: { value: `${+initialValue + 1}` },
            };
            const numberInput = shallow(
                <NumberInput
                    inputId={numId}
                    label="depth"
                    onChange={mockHandler}
                    value={initialValue}
                />
            );

            expect(numberInput.state().value).toEqual(initialValue);

            const addButton = numberInput.find({ value: Sign.Plus });
            addButton.simulate('click', clickEvent);

            expect(mockHandler).toBeCalledWith(changeEvent);
            expect(numberInput.state().value).toEqual('11');
        });

        describe('when a max prop is passed in', () => {
            const mockHandler = jest.fn();
            const initialValue = '6';
            const numberInput = shallow(
                <NumberInput
                    inputId={numId}
                    label="depth"
                    onChange={mockHandler}
                    max={6}
                    value={initialValue}
                />
            );

            it('should not increment the value past the max', () => {
                expect(numberInput.state().value).toEqual(initialValue);

                const addButton = numberInput.find({ value: Sign.Plus });
                addButton.simulate('click', clickEvent);

                expect(mockHandler).toHaveBeenCalledTimes(0);
                expect(numberInput.state().value).toEqual(initialValue);
            });
        });
    });

    describe('when the user clicks the minus button', () => {
        const clickEvent = {
            target: { value: '-' },
        };

        it('should call the onChange handler with value - 1', () => {
            const mockHandler = jest.fn();
            const initialValue = '7';
            const changeEvent = {
                target: { value: `${+initialValue - 1}` },
            };
            const numberInput = shallow(
                <NumberInput
                    inputId={numId}
                    label="depth"
                    onChange={mockHandler}
                    value={initialValue}
                />
            );

            expect(numberInput.state().value).toEqual(initialValue);

            const minusButton = numberInput.find({ value: Sign.Minus });
            minusButton.simulate('click', clickEvent);

            expect(mockHandler).toBeCalledWith(changeEvent);
            expect(numberInput.state().value).toEqual('6');
        });

        describe('when a min prop is passed in', () => {
            const mockHandler = jest.fn();
            const initialValue = '1';
            const numberInput = shallow(
                <NumberInput
                    inputId={numId}
                    label="depth"
                    onChange={mockHandler}
                    min={1}
                    value={initialValue}
                />
            );

            it('should not decrement the value past the min', () => {
                expect(numberInput.state().value).toEqual(initialValue);

                const minusButton = numberInput.find({ value: Sign.Minus });
                minusButton.simulate('click', clickEvent);

                expect(mockHandler).toHaveBeenCalledTimes(0);
                expect(numberInput.state().value).toEqual(initialValue);
            });
        });
    });
});
