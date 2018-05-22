import { theme } from 'pattern-lab';
import { Status } from './Status';
import styled, { StyledComponentClass } from 'styled-components';
import { colors } from '../../styleConstants';

const { colors: patternLabColors } = theme;
const defaultBorderColor = colors.lightBlueMagentaishGray;
const defaultBorderColorOnHover = colors.darkBlueMagentaishGray;
const immutableBorderColorOnFocus = 'none';
const immutableBorderColorOnHover = 'none';
const immutableInputBackgroundColor = colors.cyanishWhite;
const mutableInputBackgroundColor = colors.white;
const statuslessImmutableBorderColor = colors.cyanBluishWhite;
const warningBorderColor = colors.lightBrilliantOrangeYellow;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Label = styled.label`
    padding: 5px;
`;

interface SmallProps {
    required: boolean;
}

export const Small = styled.small`
    float: right;
    color: ${(props: SmallProps) => props.required ? colors.lightBrilliantRedOrange : 'initial'};
`;

const getBackgroundColor = (props: TextInputProps) => {
    if (props.readonly || props.disabled) {
        return immutableInputBackgroundColor;
    } else {
        return mutableInputBackgroundColor;
    }
};

const getBorderColor = (props: TextInputProps) => {
    if (props.status !== Status.Undefined) {
        switch (props.status) {
            case Status.Invalid: return patternLabColors.status.error;
            case Status.Valid: return patternLabColors.status.success;
            default: return defaultBorderColor;
        }
    } else if (props.warning) {
        return warningBorderColor;
    } else if (props.readonly || props.disabled) {
        return statuslessImmutableBorderColor;
    } else {
        return defaultBorderColor;
    }
};

const getBorderColorOnHover = (props: TextInputProps) => {
    if (props.readonly || props.disabled) {
        return immutableBorderColorOnHover;
    } else {
        return defaultBorderColorOnHover;
    }
};

const getBorderColorOnFocus = (props: TextInputProps) => {
    if (props.readonly || props.disabled) {
        return immutableBorderColorOnFocus;
    } else {
        return patternLabColors.brand.primary;
    }
};

interface TextInputProps {
    disabled?: boolean;
    pattern?: string | RegExp;
    placeholder?: string;
    readonly?: boolean;
    status?: Status;
    warning?: boolean;
}

export const TextInput: StyledComponentClass<any, any> = styled.input.attrs<TextInputProps>({
    pattern: (props: TextInputProps) => props.pattern,
    placeholder: (props: TextInputProps) => props.placeholder,
    readOnly: (props: TextInputProps) => props.readonly,
    type: 'text',
}) `
    cursor: ${(props: TextInputProps) => props.disabled ? 'not-allowed' : 'text'};
    background-color: ${(props: TextInputProps) => getBackgroundColor(props)};
    border: 1px solid ${(props: TextInputProps) => getBorderColor(props)};
    border-radius: 2px;
    box-sizing: border-box;
    height: 35px;
    padding: 10px;
    width: 300px;

    :hover {
      border-color: ${(props: TextInputProps) => getBorderColorOnHover(props)}
    }

    :focus {
      border-color: ${(props: TextInputProps) => getBorderColorOnFocus(props)}
      outline: none;
    }
  `;
