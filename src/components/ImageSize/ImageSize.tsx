import React, { Component, ChangeEvent } from 'react';

import CustomSize from './CustomSize';
import { ImageSizeModal } from './styles';

import SelectBox from '../SelectBox/SelectBox';

interface ImageSizeProps {
  label: string;
  options: Array<{
    label: string;
    value: string;
  }>;
  selectedValue: string;
}

interface ImageSizeState {
  inputValue: string | undefined;
}

class ImageSize extends Component<ImageSizeProps, ImageSizeState, {}> {
  readonly state: ImageSizeState = { inputValue: '' };

  handleChange = (e: ChangeEvent<HTMLSelectElement>) => this.setState({ inputValue: e.target.value });

  render() {
    const { label, options, selectedValue } = this.props;

    return (
      <ImageSizeModal>
        <SelectBox
          label={label}
          options={options}
          selected={selectedValue}
          onChange={this.handleChange} />
        {this.state.inputValue === 'custom' &&
          <CustomSize defaultValue={selectedValue} />
        }
      </ImageSizeModal>
    );
  }

}

export default ImageSize;
