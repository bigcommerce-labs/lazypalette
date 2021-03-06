import { SelectBox } from 'pattern-lab';
import React, { ChangeEvent, ChangeEventHandler, Component } from 'react';

import { ImageDimensionPattern } from './constants';
import { ImageSizeModal } from './styles';
import CustomSize from './CustomSize';

interface ImageSizeProps {
    label: string;
    options: Array<{
        label: string;
        value: string;
    }>;
    selected: string;
    testId?: string;
    onChange?: ChangeEventHandler<HTMLSelectElement | HTMLInputElement>;
}

interface ImageSizeState {
    defaultValue: string;
    selectedValue: string;
}

class ImageSize extends Component<ImageSizeProps, ImageSizeState> {
    readonly state: ImageSizeState = {
        defaultValue: '',
        selectedValue: '',
    };

    componentDidMount() {
        if (this.props.selected) {
            this.setState({ defaultValue: this.props.selected });
        }
    }

    componentDidUpdate(prevProps: ImageSizeProps) {
        if (prevProps.selected !== this.props.selected) {
            this.setState({ defaultValue: this.props.selected });
        }
    }

    handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        const { defaultValue } = this.state;
        this.setState({ selectedValue: value });

        if (value === 'custom') {
            event.target.value = defaultValue;
        }

        if (this.props.onChange) {
            this.props.onChange(event);
        }
    };

    handleCustomChange = (event: ChangeEvent<HTMLInputElement>) => {
        this.props.onChange!(event);
    };

    getDefaultValue = () => {
        const { options } = this.props;

        // TODO: Polyfill Array.prototype.find or use lodash, ie11 doesnt support .find method
        const defaultOption = options.filter(option => !!option.value.match(ImageDimensionPattern))[0];

        if (this.state.selectedValue !== 'custom') {
            return this.props.selected;
        } else if (defaultOption) {
            return defaultOption.value;
        } else {
            return '1x1';
        }
    };

    render() {
        const { label, options, selected, testId } = this.props;
        const { selectedValue } = this.state;

        const defaultInput = this.getDefaultValue();

        const optionExists = options.some(({value}) => value === selected);
        const optionSelected = (optionExists && selectedValue !== 'custom') ? selected : 'custom';

        return (
            <ImageSizeModal>
                <SelectBox
                    label={label}
                    options={options}
                    selected={optionSelected}
                    onChange={this.handleSelectChange}
                    testId={testId}
                />
                {optionSelected === 'custom' &&
                    <CustomSize defaultValue={defaultInput} onChange={this.handleCustomChange} />
                }
            </ImageSizeModal>
        );
    }

}

export default ImageSize;
