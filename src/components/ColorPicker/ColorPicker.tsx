import React, { Component } from 'react';
import { ColorResult, RGBColor, SketchPicker } from 'react-color';

import { Container, SelectedColor, Label, SketchPickerModal } from './styles';

interface ColorPickerProps {
  label?: string;
  initialColor?: RGBColor;
}

interface ColorPickerState {
  color: RGBColor;
  displayColorPicker: boolean;
}

const defaultColor = {
  a: 1,
  b: 0,
  g: 0,
  r: 0,
};

class ColorPicker extends Component<ColorPickerProps, ColorPickerState> {
  readonly state: ColorPickerState = {
    color: this.props.initialColor || defaultColor,
    displayColorPicker: false,
  };

  handleClick = () => {
    this.setState((prevState: ColorPickerState) => ({displayColorPicker: !prevState.displayColorPicker}));
  };

  handleClose = () => this.setState({ displayColorPicker: false });

  handleChange = (color: ColorResult) => this.setState({ color: color.rgb });

  render() {
    return (
      <Container>
        <Label>{this.props.label}
            {this.state.displayColorPicker &&
            <SketchPickerModal>
                <SketchPicker color={this.state.color} onChange={this.handleChange} />
            </SketchPickerModal>}
        </Label>
        <SelectedColor color={this.state.color} onClick={this.handleClick}/>
      </Container>
    );
  }
}

export default ColorPicker;
