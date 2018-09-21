import { Icon } from 'pattern-lab';
import React, { ChangeEvent, ChangeEventHandler, FocusEvent, PureComponent } from 'react';

import NumberInput from '../NumberInput/NumberInput';

import { Messages } from './constants';
import { Axis, DimensionMessage, SizeModal, StyledContainer, StyledImageLock } from './styles';

interface CustomSizeProps {
    defaultValue: string;
    onChange?: ChangeEventHandler<HTMLInputElement>;
}

interface CustomSizeState {
    height: string;
    imageLock: boolean;
    imageRatio: number;
    width: string;
}

class CustomSize extends PureComponent<CustomSizeProps, CustomSizeState> {
    readonly state: CustomSizeState = {
        height: '1',
        imageLock: false,
        imageRatio: 0,
        width: '1',
    };

    componentDidMount() {
        const { defaultValue } = this.props;

        if (defaultValue) {
            const [width, height] = defaultValue.split('x');
            this.setState({ height, width });
        }
    }

    componentDidUpdate(prevProps: CustomSizeProps) {
        const { defaultValue } = this.props;

        if (defaultValue && defaultValue !== prevProps.defaultValue) {
            const [width, height] = defaultValue.split('x');
            this.setState({ height, width });
        }
    }

    imageLock = () => {
        const { width, height } = this.state;
        const ratio = (Number(width) / Number(height));
        this.state.imageLock
            ? this.setState({ imageLock: false })
            : this.setState({ imageLock: true, imageRatio: ratio });
    };

    handleOnBlur = (event: FocusEvent<HTMLInputElement>, axis: string) => {
        if (!parseInt(event.target.value, 10)) {
            axis === 'height' ? this.setState({ height: '1' }) : this.setState({ width: '1' });
            const [width, height] = this.props.defaultValue.split('x');
            const dimensions = axis === 'height' ? `${width}x${1}` : `${1}x${height}`;
            const newEvent = {...event, target: {...event.target, value: dimensions}};

            if (this.props.onChange) {
                this.props.onChange(newEvent);
            }
        }
    };

    handleChange = (event: ChangeEvent<HTMLInputElement>, axis: string) => {
        let newEvent;
        const value = Number(event.target.value);
        if (this.state.imageLock) {
            const ratioValue = axis === 'height'
                ? Math.round((value * this.state.imageRatio))
                : Math.round((value / this.state.imageRatio));

            const dimensions = axis === 'height'
                ? `${ratioValue}x${value}`
                : `${value}x${ratioValue}`;
            newEvent = {...event, target: {...event.target, value: dimensions}};
        } else {
            const [width, height] = this.props.defaultValue.split('x');

            const dimensions = axis === 'height' ? `${width}x${value}` : `${value}x${height}`;
            newEvent = {...event, target: {...event.target, value: dimensions}};

        }

        this.setState({[axis]: `${value}`} as any);
        if (this.props.onChange) {
            return this.props.onChange(newEvent);
        }
    };

    render() {
        const { height, imageLock, width } = this.state;

        return (
            <StyledContainer>
                <SizeModal>
                    <Axis>
                        <NumberInput
                            value={width}
                            label="Max width"
                            isInteger
                            min={1}
                            onChange={e => this.handleChange(e, 'width')}
                            onBlur={e => this.handleOnBlur(e, 'width')}
                        />
                    </Axis>

                    <StyledImageLock onClick={this.imageLock}>
                        <Icon
                            glyph={ imageLock ? 'imageLock' : 'imageUnlock' }
                            size="large"
                        />
                    </StyledImageLock>

                    <Axis>
                        <NumberInput
                            value={height}
                            label="Max height"
                            isInteger
                            min={1}
                            onChange={e => this.handleChange(e, 'height')}
                            onBlur={e => this.handleOnBlur(e, 'height')}
                        />
                    </Axis>
                </SizeModal>

                <DimensionMessage>
                    {Messages.Dimension}
                </DimensionMessage>
            </StyledContainer>
        );
    }
}

export default CustomSize;
