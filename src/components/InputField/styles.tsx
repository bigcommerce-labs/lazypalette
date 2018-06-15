import { theme } from 'pattern-lab';
import { Status } from './Constants';
import styled, { StyledComponentClass } from 'styled-components';
import { colors } from '../../styleConstants';

const { colors: patternLabColors } = theme;
const defaultBorderColor = colors.stroke;
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
    padding: .3125rem .0625rem;
    color: colors.primary;
`;

interface SmallProps {
    required: boolean;
}

export const Small = styled.small`
    color: ${(props: SmallProps) => props.required ? colors.lightBrilliantRedOrange : 'initial'};
    font-size: .75rem;
    padding-top: .25rem;
`;

const getBackgroundColor = (props: InputFieldProps) => {
    if (props.readonly || props.disabled) {
        return immutableInputBackgroundColor;
    } else {
        return mutableInputBackgroundColor;
    }
};

const getBorderColor = (props: InputFieldProps) => {
    if (props.status !== Status.Undefined) {
        switch (props.status) {
            case Status.Invalid: return patternLabColors.error;
            case Status.Valid: return patternLabColors.success;
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

const getBorderColorOnHover = (props: InputFieldProps) => {
    if (props.readonly || props.disabled) {
        return immutableBorderColorOnHover;
    } else {
        return defaultBorderColorOnHover;
    }
};

const getBorderColorOnFocus = (props: InputFieldProps) => {
    if (props.readonly || props.disabled) {
        return immutableBorderColorOnFocus;
    } else {
        return patternLabColors.primary;
    }
};

interface InputFieldProps {
    disabled?: boolean;
    readonly?: boolean;
    status?: Status;
    warning?: boolean;
}

export const InputField: StyledComponentClass<any, any> = styled.input`
    cursor: ${(props: InputFieldProps) => props.disabled ? 'not-allowed' : 'text'};
    background-color: ${(props: InputFieldProps) => getBackgroundColor(props)};
    border: 1px solid ${(props: InputFieldProps) => getBorderColor(props)};
    border-radius: 2px;
    box-sizing: border-box;
    height: 2.1875rem;
    padding: .625rem;
    width: 100%;

    :hover {
      border-color: ${(props: InputFieldProps) => getBorderColorOnHover(props)}
    }

    :focus {
      border-color: ${(props: InputFieldProps) => getBorderColorOnFocus(props)}
      outline: none;
    }
  `;