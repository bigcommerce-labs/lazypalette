import React, { PureComponent } from 'react';
import { ColorResult } from 'react-color';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import uuid from 'uuid';

import { ThemeConfigChange } from '../../actions/theme';
import { openColorPicker, ColorPickerContent, OpenColorPickerArgs, OpenUIWindowAction } from '../../actions/uiWindow';

import { ColorText, Container, Label, SelectedColor } from './styles';

interface ColorSettingProps {
    color?: string;
    inputId?: string;
    label?: string;
    name: string;
    testId?: string;
    onChange?(configChange: ThemeConfigChange): void;
    openColorPicker(content: OpenColorPickerArgs): OpenUIWindowAction<ColorPickerContent>;
}

interface ColorSettingState {
    color: string;
    focus: boolean;
    inputId: string;
    previousColor?: string;
    testId?: string;
}

const defaultColor = '#000000';

export class ColorSetting extends PureComponent<ColorSettingProps, ColorSettingState> {
    readonly state: ColorSettingState = {
        color: this.props.color || defaultColor,
        focus: false,
        inputId: this.props.inputId || uuid(),
        previousColor: this.props.color || defaultColor,
        testId: this.props.testId,
    };

    handleChange = (color: ColorResult) => {
        const { name, onChange } = this.props;

        this.setState({ color: color.hex });

        if (onChange) {
            onChange({ setting: { id: name, type: 'color' }, value: color.hex });
        }
    };

    handleOnClose = () => this.setState({ focus: false });

    handleClick = () => {
        this.setState(prevState => ({ previousColor: prevState.color }));

        const { left, width, top } =
            (ReactDOM.findDOMNode(this.refs[this.state.inputId]) as Element).getBoundingClientRect();

        const position = { x: left + (width * 3), y: top };
        this.setState({ focus: true });
        this.props.openColorPicker({
            color: this.state.color,
            onChange: this.handleChange,
            onClose: this.handleOnClose,
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
                <ColorText>{this.state.color.toUpperCase()}</ColorText>
                <SelectedColor
                    focus={this.state.focus}
                    color={this.state.color}
                    ref={this.state.inputId}
                    onClick={this.handleClick}
                    {...(this.state.testId ? {'data-test-id': this.state.testId} : {})}
                />
            </Container>
        );
    }
}

const mapDispatchToProps = {
    openColorPicker,
};

export default connect(null, mapDispatchToProps)(ColorSetting);
