import React, {
    ChangeEvent,
    ChangeEventHandler,
    FocusEvent,
    FocusEventHandler,
    MouseEvent,
    PureComponent,
} from 'react';
import uuid from 'uuid';

import { Notes, Sign, Status } from './constants';
import { Button, Container, Input, InputBox, Label, Small } from './styles';

interface NumberInputProps extends Partial <{
    disabled: boolean;
    inputId: string;
    label: string;
    max: number;
    min: number;
    required: boolean;
    value: string;
    onBlur: FocusEventHandler<HTMLInputElement>;
    onChange: ChangeEventHandler<HTMLInputElement>;
}> {}

interface NumberInputState {
    inputId: string;
    status: Status;
    value: string;
}

class NumberInput extends PureComponent<NumberInputProps, NumberInputState> {
    readonly state: NumberInputState = {
        inputId: this.props.inputId || uuid(),
        status: Status.Undefined,
        value: this.props.value || '0',
    };

    componentDidUpdate(prevProps: NumberInputProps) {
        const { value } = this.props;
        if (value && prevProps.value !== value) {
            this.setState({ value });
        }
    }

    handleBlur = (event: FocusEvent<HTMLInputElement>) => {
        const newStatus = this.isInvalid() ? Status.Invalid : Status.Undefined;
        if (this.state.status !== newStatus) {
            this.setState({ status: newStatus });
        }

        if (this.props.onBlur) {
            this.props.onBlur(event);
        }
    };

    handleButtonClick = (event: MouseEvent<HTMLInputElement>) => {
        const { max, min } = this.props;
        const { value: button } = event.target as HTMLInputElement;
        const { value: prevValue } = this.state;
        const numValue = Number(prevValue);
        let newValue = numValue;

        if (button === Sign.Plus) {
            newValue = max && numValue >= max ? max : numValue + 1;
        } else if (button === Sign.Minus) {
            newValue = min && numValue <= min ? min : numValue - 1;
        }

        if (`${newValue}` !== prevValue) {
            const newEvent = {
                ...event,
                target: { ...event.target as HTMLInputElement, value: `${newValue}` },
            };
            this.handleChange(newEvent);
        }
    };

    handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({ status: Status.Undefined, value: event.target.value });

        if (this.props.onChange) {
            this.props.onChange(event);
        }
    };

    isInvalid = () => !this.state.value && this.props.required;

    render() {
        const { inputId, status, value } = this.state;
        const note = this.isInvalid() ? Notes.Required : '';
        const {
            disabled,
            label,
            max,
            min,
            required,
        } = this.props;
        const numValue = Number(value);
        const isMinDisabled = min ? numValue <= min : numValue < 1;
        const isMaxDisabled = max ? numValue >= max : false;

        return (
            <Container>
                <Label htmlFor={inputId}>
                    {label}
                </Label>
                <InputBox>
                    <Button
                        onClick={this.handleButtonClick}
                        disabled={isMinDisabled}
                        type="button"
                        value={Sign.Minus}
                    />
                    <Input
                        disabled={disabled}
                        id={inputId}
                        max={max}
                        min={min}
                        onBlur={this.handleBlur}
                        onChange={this.handleChange}
                        required={required}
                        status={status}
                        type="number"
                        value={value}
                    />
                    <Button
                        onClick={this.handleButtonClick}
                        disabled={isMaxDisabled}
                        type="button"
                        value={Sign.Plus}
                    />
                </InputBox>
                {note &&
                    <Small required={required}>
                        {note}
                    </Small>
                }
            </Container>
        );
    }
}

export default NumberInput;
