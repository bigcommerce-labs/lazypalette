import React, { Component } from 'react';
import { ColorResult, SketchPicker } from 'react-color';

import { ThemeConfigChange } from '../../actions/theme';

import { Container, Label, SelectedColor, SketchPickerModal } from './styles';

interface ColorPickerProps {
    label?: string;
    initialColor?: string;
    name: string;
    onChange?(configChange: ThemeConfigChange): void;
}

interface ColorPickerState {
    color: string;
    displayColorPicker: boolean;
}

const defaultColor = '#000000';

class ColorPicker extends Component<ColorPickerProps, ColorPickerState> {
    readonly state: ColorPickerState = {
        color: this.props.initialColor || defaultColor,
        displayColorPicker: false,
    };

    handleClick = () => {
        this.setState((prevState: ColorPickerState) => ({ displayColorPicker: !prevState.displayColorPicker }));
    };

    handleClose = () => this.setState({ displayColorPicker: false });

    handleChange = (color: ColorResult) => {
        this.setState({ color: color.hex });
        this.props.onChange!({ [this.props.name]: color.hex });
    };

    render() {
        return (
            <Container>
                <Label>{this.props.label}
                    {this.state.displayColorPicker &&
                    <SketchPickerModal>
                        <SketchPicker color={this.state.color} onChange={this.handleChange}/>
                    </SketchPickerModal>}
                </Label>
                <SelectedColor color={this.state.color} onClick={this.handleClick}/>
            </Container>
        );
    }
}

export default ColorPicker;
