import { SelectBox } from 'pattern-lab';
import React, { ChangeEvent, ChangeEventHandler, Component } from 'react';

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
        defaultValue: '1x1',
        selectedValue: 'optimized',
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

        const selectEvent = value === 'custom' ? {...event, target: {...event.target, value: defaultValue}} : event;

        if (this.props.onChange) {
            this.props.onChange(selectEvent);
        }
    };

    handleCustomChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (this.state.selectedValue === 'optimized') {
            this.setState({ selectedValue: 'custom' });
        }
        this.props.onChange!(event);
    };

    render() {
        const { label, options, selected, testId } = this.props;
        const { selectedValue } = this.state;
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
                    <CustomSize defaultValue={selected} onChange={this.handleCustomChange} />
                }
            </ImageSizeModal>
        );
    }

}

export default ImageSize;
