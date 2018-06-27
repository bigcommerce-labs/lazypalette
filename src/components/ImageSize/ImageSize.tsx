import React, { Component } from 'react';

import SelectBox from '../SelectBox/SelectBox';

import { ImageSizeModal } from './styles';
import CustomSize from './CustomSize';

interface ImageSizeProps {
    label: string;
    options: Array<{
        label: string;
    value: string;
  }>;
  selected: string;
  name: string;
  onChange?(configChange: {[key: string]: string}): void;
}

class ImageSize extends Component<ImageSizeProps> {

    handleChange = (configChange: {[key: string]: string}) => {
        const { name } = this.props;

        configChange[name] = configChange[name] === 'custom' ? '0x0' : configChange[name];
        this.props.onChange!(configChange);
    };

    render() {
        const { label, options, selected, name } = this.props;
        const optionExists = options.findIndex(({value}) => value === selected);
        const optionSelected = optionExists < 0 ? 'custom' : selected;

        return (
            <ImageSizeModal>
                <SelectBox
                    label={label}
                    options={options}
                    selected={optionSelected}
                    onChange={this.handleChange}
                    name={name}
                />
                { optionSelected === 'custom' &&
            <CustomSize defaultValue={selected} onChange={this.handleChange} name={name}/>}
            </ImageSizeModal>
        );
    }

}

export default ImageSize;
