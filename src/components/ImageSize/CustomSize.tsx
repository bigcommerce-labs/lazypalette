import React, { ChangeEvent, PureComponent } from 'react';

import InputField from '../InputField/InputField';

import { Axis, SizeModal } from './styles';

interface CustomSizeProps {
    defaultValue: string;
    name: string;
    onChange?(configChange: {[key: string]: string}): void;
}

interface CustomSizeState {
    [key: string]: string;
}

class CustomSize extends PureComponent<CustomSizeProps, CustomSizeState> {
    readonly state: CustomSizeState = {
        height: '0',
        width: '0',
    };

    componentDidMount() {
        const { defaultValue } = this.props;
        const [width, height] = defaultValue ? this.props.defaultValue.split('x') : ['0', '0'];
        this.setState({height, width});
    }

    onChange = (event: ChangeEvent<HTMLInputElement>, dimension: string) => {
        const { name } = this.props;
        const { height, width } = this.state;
        const value = event.target.value;

        const dimensions = dimension === 'height' ? `${width}x${value}` : `${value}x${height}`;
        this.setState({ [dimension]: value });
        this.props.onChange!({ [name]: `${dimensions}` });
    };

    render() {
        const { defaultValue } = this.props;
        const dimensions = defaultValue ? defaultValue.split('x') : [0, 0];

        return (
            <SizeModal>
                {['width', 'height'].map((axis, i) => (
                    <Axis key={i}>
                        <InputField
                            defaultValue={+dimensions[i]}
                            label={`Max ${axis}`}
                            required={true}
                            type="number"
                            onChange={e => this.onChange(e, axis)}
                        />
                    </Axis>
                ))}
            </SizeModal>
        );
    }
}

export default CustomSize;
