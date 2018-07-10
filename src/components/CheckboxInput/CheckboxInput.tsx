import React, { ChangeEvent, PureComponent } from 'react';
import uuid from 'uuid';

import { Container, HiddenLabel, Input, Label } from './styles';

interface CheckboxInputProps {
    inputId?: string;
    label?: string;
    name: string;
    checked: boolean;
    onChange?(configChange: {[key: string]: boolean}): void;
}

interface CheckboxInputState {
    checked: boolean;
    inputId?: string;
}

class CheckboxInput extends PureComponent<CheckboxInputProps, CheckboxInputState> {
    readonly state: CheckboxInputState = {
        checked: this.props.checked || false,
        inputId: this.props.inputId || uuid(),
    };

    componentDidUpdate(prevProps: CheckboxInputProps) {
        if (this.props.checked !== prevProps.checked) {
            this.setState({ checked: this.props.checked });
        }
    }

    handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.props.onChange!({[this.props.name]: e.target.checked});
    };

    render() {
        const { label } = this.props;
        const { checked, inputId } = this.state;

        return (
            <Container>
                <Input
                    id={inputId}
                    checked={checked}
                    onChange={this.handleChange}
                />
                <Label htmlFor={inputId} />
                <HiddenLabel>{label}</HiddenLabel>
            </Container>
        );
    }
}

export default CheckboxInput;
