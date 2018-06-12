import React, { Component } from 'react';
import { ColorResult, RGBColor, SketchPicker } from 'react-color';

import { Container, SelectedColor } from './styles';

interface ColorPickerProps {
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
        <SelectedColor color={this.state.color} onClick={this.handleClick} />
        {this.state.displayColorPicker &&
          <SketchPicker color={this.state.color} onChange={this.handleChange} />}
      </Container>
    );
  }
}

export default ColorPicker;
