import { theme } from 'pattern-lab';
import styled, { StyledComponentClass } from 'styled-components';

import { Status } from '../Status';

const { colors } = theme;
const defaultBorderColor = '#d7d6d9';
const defaultBorderColorOnHover = '#86848c';
const immutableBorderColorOnFocus = 'none';
const immutableBorderColorOnHover = 'none';
const immutableInputBackgroundColor = '#f4f5f5';
const mutableInputBackgroundColor = '#ffffff';
const statuslessImmutableBorderColor = '#edeff3';
const warningBorderColor = '#f2ce3d';

const getBackgroundColor = (props: StyledTextInputProps) => {
    if (props.readonly || props.disabled) {
        return immutableInputBackgroundColor;
    } else {
        return mutableInputBackgroundColor;
    }
};

const getBorderColor = (props: StyledTextInputProps) => {
    if (props.status !== Status.Undefined) {
        switch (props.status) {
            case Status.Invalid: return colors.status.error;
            case Status.Valid: return colors.status.success;
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

const getBorderColorOnHover = (props: StyledTextInputProps) => {
    if (props.readonly || props.disabled) {
        return immutableBorderColorOnHover;
    } else {
        return defaultBorderColorOnHover;
    }
};

const getBorderColorOnFocus = (props: StyledTextInputProps) => {
    if (props.readonly || props.disabled) {
        return immutableBorderColorOnFocus;
    } else {
        return colors.brand.primary;
    }
};

interface StyledTextInputProps {
    disabled?: boolean;
    pattern?: string | RegExp;
    placeholder?: string;
    readonly?: boolean;
    status?: Status;
    warning?: boolean;
}

const StyledTextInput: StyledComponentClass<any, any> = styled.input.attrs<StyledTextInputProps>({
    pattern: (props: StyledTextInputProps) => props.pattern,
    placeholder: (props: StyledTextInputProps) => props.placeholder,
    readOnly: (props: StyledTextInputProps) => props.readonly,
    type: 'text',
}) `
    cursor: ${(props: StyledTextInputProps) => props.disabled ? 'not-allowed' : 'text'};
    background-color: ${(props: StyledTextInputProps) => getBackgroundColor(props)};
    border: 1px solid ${(props: StyledTextInputProps) => getBorderColor(props)};
    border-radius: 2px;
    box-sizing: border-box;
    height: 35px;
    padding: 10px;
    width: 300px;

    :hover {
      border-color: ${(props: StyledTextInputProps) => getBorderColorOnHover(props)}
    }

    :focus {
      border-color: ${(props: StyledTextInputProps) => getBorderColorOnFocus(props)}
      outline: none;
    }
  `;

export default StyledTextInput;
