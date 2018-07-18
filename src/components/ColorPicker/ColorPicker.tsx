import React, { ChangeEvent, ChangeEventHandler, PureComponent } from 'react';
import uuid from 'uuid';

import { Container, Input, Label } from './styles';

interface ColorPickerProps {
    color?: string;
    label?: string;
    inputId?: string;
    onChange?: ChangeEventHandler<HTMLInputElement>;
}

class ColorPicker extends PureComponent<ColorPickerProps, {}> {
    static defaultProps = {
        color: '#000000',
        inputId: uuid(),
    };

    handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (this.props.onChange) {
            this.props.onChange(event);
        }
    };

    render() {
        const { inputId, label, color } = this.props;

        return (
            <Container>
                <Label htmlFor={inputId}>{label}</Label>
                <Input
                    id={inputId}
                    value={color}
                    onChange={this.handleChange}
                />
            </Container>
        );
    }
}

export default ColorPicker;
