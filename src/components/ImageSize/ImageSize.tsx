import React, { Component } from 'react';

import { ThemeConfigChange } from '../../actions/theme';
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
    onChange?(configChange: ThemeConfigChange): void;
}

interface ImageSizeState {
    inputValue: string | undefined;
}

class ImageSize extends Component<ImageSizeProps, ImageSizeState, {}> {
    readonly state: ImageSizeState = { inputValue: '' };

    handleChange = (configChange: any) => {
        this.setState({ inputValue: configChange[name] });
        this.props.onChange!(configChange);
    };

    render() {
        const { label, options, selected, name } = this.props;

        return (
            <ImageSizeModal>
                <SelectBox
                    label={label}
                    options={options}
                    selected={selected}
                    onChange={this.handleChange}
                    name={name}
                />
                {this.state.inputValue === 'custom' &&
                <CustomSize defaultValue={selected}/>
                }
            </ImageSizeModal>
        );
    }

}

export default ImageSize;
