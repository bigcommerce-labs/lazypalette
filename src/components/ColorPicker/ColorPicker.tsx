import React, { ChangeEvent, PureComponent } from 'react';
import uuid from 'uuid';

import { ThemeConfigChange } from '../../actions/theme';

import { Container, Input, Label } from './styles';

interface ColorPickerProps {
    color?: string;
    label?: string;
    name: string;
    inputId?: string;
    onChange?(configChange: ThemeConfigChange): void;
}

class ColorPicker extends PureComponent<ColorPickerProps, {}> {
    static defaultProps = {
        color: '#000000',
        inputId: uuid(),
    };

    handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (this.props.onChange !== undefined) {
            this.props.onChange({ [this.props.name]: e.target.value });
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
