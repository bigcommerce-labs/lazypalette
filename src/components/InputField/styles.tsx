import { Theme } from 'pattern-lab';
import React from 'react';
import styled, { StyledComponentClass, ThemedStyledProps } from 'styled-components';

import { Status } from './Constants';

const defaultBorderColor = '#D7D6D9';
const defaultBorderColorOnHover = '#86848C';
const immutableBorderColorOnFocus = 'none';
const immutableBorderColorOnHover = 'none';
const immutableInputBackgroundColor = '#F4F5F5';
const mutableInputBackgroundColor = '#FFF';
const statuslessImmutableBorderColor = '#EDEFF3';
const warningBorderColor = '#F2CE3D';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Label = styled.label`
    padding: .3125rem .0625rem;
    color:  ${({ theme }) => theme.colors.primaryText};
`;

interface SmallProps {
    required?: boolean;
    children?: string;
}

const SmallRaw = ({ children }: ThemedStyledProps<SmallProps, Theme>) => <small>
    {children}
</small>;

export const Small = styled(SmallRaw)`
    ${props => `
        color: ${props.required ? props.theme.colors.error : 'initial'};
        font-size: .75rem;
        padding-top: .25rem;
    `}
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
            case Status.Invalid: return props.theme.colors.error;
            case Status.Valid: return props.theme.colors.success;
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
        return props.theme.colors.primary;
    }
};

interface InputFieldProps {
    theme: Theme;
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
