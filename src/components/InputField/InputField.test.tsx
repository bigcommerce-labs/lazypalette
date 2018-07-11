import { shallow } from 'enzyme';

import React from 'react';

import { Status } from './Constants';
import InputField from './InputField';

const id = 'InputTestId';

describe('<InputField> ', () => {

    it('renders', () => {
        const inputField = shallow(
            <InputField inputId={id} label="Name your version"/>
        );
        expect(inputField).toMatchSnapshot();
    });

    it('renders a valid state', () => {
        const inputField = shallow(
            <InputField inputId={id} label="Name your version" defaultValue="abc" pattern="abc"/>
        );
        expect(inputField).toMatchSnapshot();
    });

    it('renders an invalid state', () => {
        const inputField = shallow(
            <InputField inputId={id} label="Name your version" defaultValue="adlkfj" pattern="abc"/>
        );
        expect(inputField).toMatchSnapshot();
    });

    it('renders the note', () => {
        const inputField = shallow(
            <InputField inputId={id}
                label="Name your version"
                defaultValue="adlkfj"
                pattern="abc"
                note="A simple note"
            />
        );
        expect(inputField).toMatchSnapshot();
    });

    it('onChange function triggers', () => {
        const mockOnChange = jest.fn();
        const event = {
            target: { value: 'the-value' },
        };
        const inputField = shallow(
            <InputField inputId={id}
                label="Name your version"
                defaultValue="adlkfj"
                onChange={mockOnChange}
            />
        );
        inputField.find('[id="InputTestId"]').simulate('change', event);
        expect(mockOnChange).toBeCalledWith(event);
    });

    it('onBlur function triggers', () => {
        const mockOnBlur = jest.fn();
        const event = {
            target: { value: 'the-value' },
        };
        const inputField = shallow(
            <InputField inputId={id}
                label="Name your version"
                defaultValue="adlkfj"
                onBlur={mockOnBlur}
                required={true}
            />
        );
        inputField.find('[id="InputTestId"]').simulate('blur', event);
        expect(mockOnBlur).toBeCalledWith(event);
    });

    it('onBlur event causes invalid state when patterns does not match', () => {
        const mockOnBlur = jest.fn();
        const event = {
            target: { value: 'abc' },
        };
        const inputField = shallow(
            <InputField inputId={id}
                label="Name your version"
                defaultValue="adlkfj"
                pattern="[0-9]"
                onBlur={mockOnBlur}
                required={true}
            />
        );
        inputField.find('[id="InputTestId"]').simulate('change', event);
        inputField.find('[id="InputTestId"]').simulate('blur', event);
        expect(inputField.state('status')).toBe(Status.Invalid);
    });

    it('onBlur event shows valid state when patterns matchs', () => {
        const mockOnBlur = jest.fn();
        const event = {
            target: { value: 'abc' },
        };
        const inputField = shallow(
            <InputField inputId={id}
                label="Name your version"
                defaultValue="adlkfj"
                pattern="[a-z]"
                onBlur={mockOnBlur}
                required={true}
            />
        );
        inputField.find('[id="InputTestId"]').simulate('change', event);
        inputField.find('[id="InputTestId"]').simulate('blur', event);
        expect(inputField.state('status')).toBe(Status.Valid);
    });
});
