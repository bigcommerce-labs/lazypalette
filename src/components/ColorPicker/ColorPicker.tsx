import { theme } from 'pattern-lab';
import React, { Component, CSSProperties } from 'react';
import { CustomPicker, HSLColor, RGBColor } from 'react-color';
import { ColorWrapChangeHandler } from 'react-color/lib/components/common/ColorWrap';
import EditableInput from 'react-color/lib/components/common/EditableInput';
import Hue from 'react-color/lib/components/common/Hue';
import Saturation from 'react-color/lib/components/common/Saturation';
import tinycolor from 'tinycolor2';

import {
    Container,
    EditableInputContainer,
    HexField,
    HueContainer,
    HuePointer,
    RGBField,
    SaturationContainer,
    SaturationPointer,
} from './styles';

interface ColorPickerProps {
    rgb?: RGBColor;
    hex?: string;
    hsl?: HSLColor;
    onChange: ColorWrapChangeHandler;
}

const styles = {
    input: {
        border: `1px solid ${theme.colors.stroke}`,
        borderRadius: '2px',
        fontSize: theme.typography.fontSize.smallest,
        padding: '0.25rem',
        width: '80%',
    } as CSSProperties,
    label: {
        color: theme.colors.primaryText,
        display: 'block',
        fontSize: theme.typography.fontSize.smallest,
        textAlign: 'center',
        textTransform: 'capitalize',
    } as CSSProperties,
};

class ColorPicker extends Component<ColorPickerProps> {
    hexInputRef = React.createRef<any>();

    // from react-color/lib/helpers/color
    isValidHex = (hex: string) => {
        const lh = (String(hex).charAt(0) === '#') ? 1 : 0;

        return hex.length !== (4 + lh) && hex.length < (7 + lh) && tinycolor(hex).isValid();
    };

    handleFieldChange = (result: any) => {
        const { onChange, rgb } = this.props;

        if (result.hex && this.isValidHex(result.hex)) {
            onChange(result.hex);
        } else if (result.r || result.g || result.b) {
            onChange({
                a: rgb ? rgb.a : 0,
                b: result.b || (rgb ? rgb.b : 0),
                g: result.g || (rgb ? rgb.g : 0),
                r: result.r || (rgb ? rgb.r : 0),
            });
        }
    };

    componentDidMount() {
        if (this.hexInputRef.current && this.hexInputRef.current.input) {
            this.hexInputRef.current.input.select();
        }
    }

    render() {
        return (
            <Container>
                <SaturationContainer>
                    <Saturation
                        {...this.props}
                        pointer={SaturationPointer}
                    />
                </SaturationContainer>
                <HueContainer>
                    <Hue
                        {...this.props}
                        pointer={HuePointer}
                    />
                </HueContainer>
                <EditableInputContainer>
                    <HexField>
                        <EditableInput
                            onChange={ this.handleFieldChange }
                            ref={this.hexInputRef}
                            style={{ input: styles.input, label: styles.label }}
                            label="hex"
                            value={ this.props.hex!.replace('#', '') }
                        />
                    </HexField>
                    <RGBField>
                        <EditableInput
                            onChange={ this.handleFieldChange }
                            style={{ input: styles.input, label: styles.label }}
                            label="r"
                            value={ this.props.rgb!.r }
                        />
                    </RGBField>
                    <RGBField>
                        <EditableInput
                            onChange={ this.handleFieldChange }
                            style={{ input: styles.input, label: styles.label }}
                            label="g"
                            value={ this.props.rgb!.g }
                        />
                    </RGBField>
                    <RGBField>
                        <EditableInput
                            onChange={ this.handleFieldChange }
                            style={{ input: styles.input, label: styles.label }}
                            label="b"
                            value={ this.props.rgb!.b }
                        />
                    </RGBField>
                </EditableInputContainer>
            </Container>
        );
    }
}

export default CustomPicker<{}>(ColorPicker);
