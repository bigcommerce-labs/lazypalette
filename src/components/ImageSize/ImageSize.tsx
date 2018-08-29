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

class ImageSize extends Component<ImageSizeProps> {
    handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        const selectEvent = value === 'custom' ? {...event, target: {...event.target, value: '0x0'}} : event;

        if (this.props.onChange) {
            this.props.onChange(selectEvent);
        }
    };

    handleCustomChange = (event: ChangeEvent<HTMLInputElement>) => {
        this.props.onChange!(event);
    };

    render() {
        const { label, options, selected, testId } = this.props;
        const optionExists = options.some(({value}) => value === selected);
        const optionSelected = optionExists ? selected : 'custom';

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
