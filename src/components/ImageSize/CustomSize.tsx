import React, { ChangeEvent, ChangeEventHandler, PureComponent } from 'react';

import NumberInput from '../NumberInput/NumberInput';

import { Axis, SizeModal } from './styles';

interface CustomSizeProps {
    defaultValue: string;
    onChange?: ChangeEventHandler<HTMLInputElement>;
}

interface CustomSizeState {
    [key: string]: string;
}

class CustomSize extends PureComponent<CustomSizeProps, CustomSizeState> {
    readonly state: CustomSizeState = {
        height: '0',
        width: '0',
    };

    componentDidUpdate(prevProps: CustomSizeProps) {
        const { defaultValue } = this.props;

        if (defaultValue !== prevProps.defaultValue) {
            const [width, height] = defaultValue.split('x');
            this.setState({height, width});
        }
    }

    handleChange = (event: ChangeEvent<HTMLInputElement>, axis: string) => {
        const { height, width } = this.state;
        const { value } = event.target;
        this.setState({ [axis]: value });

        const dimensions = axis === 'height' ? `${width}x${value}` : `${value}x${height}`;
        const newEvent = {...event, target: {...event.target, value: dimensions}};

        if (this.props.onChange) {
            this.props.onChange(newEvent);
        }
    };

    render() {
        const { defaultValue } = this.props;
        const dimensions = defaultValue ? defaultValue.split('x') : ['0', '0'];

        return (
            <SizeModal>
                {['width', 'height'].map((axis, i) => (
                    <Axis key={axis}>
                        <NumberInput
                            value={dimensions[i]}
                            label={`Max ${axis}`}
                            required={true}
                            onChange={e => this.handleChange(e, axis)}
                        />
                    </Axis>
                ))}
            </SizeModal>
        );
    }
}

export default CustomSize;
