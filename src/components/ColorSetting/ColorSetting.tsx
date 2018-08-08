import React, { PureComponent } from 'react';
import { ColorResult } from 'react-color';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import uuid from 'uuid';

import { ThemeConfigChange } from '../../actions/theme';
import { openColorPicker, ColorPickerContent, OpenColorPickerArgs, OpenUIWindowAction } from '../../actions/uiWindow';

import { Container, Label, SelectedColor } from './styles';

interface ColorSettingProps {
    color?: string;
    inputId?: string;
    label?: string;
    name: string;
    onChange?(configChange: ThemeConfigChange): void;
    openColorPicker(content: OpenColorPickerArgs): OpenUIWindowAction<ColorPickerContent>;
}

interface ColorSettingState {
    color: string;
    inputId: string;
    previousColor?: string;
}

const defaultColor = '#000000';

export class ColorSetting extends PureComponent<ColorSettingProps, ColorSettingState> {
    readonly state: ColorSettingState = {
        color: this.props.color || defaultColor,
        inputId: this.props.inputId || uuid(),
        previousColor: this.props.color || defaultColor,
    };

    handleChange = (color: ColorResult) => {
        const { name, onChange } = this.props;

        this.setState({ color: color.hex });

        if (onChange) {
            onChange({ setting: { id: name, type: 'color' }, value: color.hex });
        }
    };

    handleClick = () => {
        this.setState(prevState => ({ previousColor: prevState.color }));

        const { left, width, top } =
            (ReactDOM.findDOMNode(this.refs[this.state.inputId]) as Element).getBoundingClientRect();

        const position = { x: left + (width * 3), y: top };
        this.props.openColorPicker({
            color: this.state.color,
            onChange: this.handleChange,
            position,
        });
    };

    componentDidUpdate(prevProps: ColorSettingProps) {
        const { color } = this.props;

        if (color && color !== prevProps.color) {
            this.setState({ color });
        }
    }

    render() {
        return (
            <Container>
                <Label>{this.props.label}
                </Label>
                <SelectedColor
                    color={this.state.color}
                    ref={this.state.inputId}
                    onClick={this.handleClick}
                />
            </Container>
        );
    }
}

const mapDispatchToProps = {
    openColorPicker,
};

export default connect(null, mapDispatchToProps)(ColorSetting);
