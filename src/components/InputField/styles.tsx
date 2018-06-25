import { Theme } from 'pattern-lab';
import React from 'react';
import styled, { StyledComponentClass, ThemedStyledProps } from 'styled-components';

import { Status } from './Constants';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Label = styled.label`
    padding: .25rem 0;
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
    ${({ required, theme }) => `
        color: ${required ? theme.colors.error : 'initial'};
        font-size: ${theme.typography.fontSize.smallest};
        padding-top: .25rem;
    `}
`;

const getBackgroundColor = ({ theme, ...props }: InputFieldProps) => {
    if (props.readonly || props.disabled) {
        return theme.colors.background;
    } else {
        return '#FFF';
    }
};

const getBorderColor = ({ theme, ...props }: InputFieldProps) => {
    if (props.status !== Status.Undefined) {
        switch (props.status) {
            case Status.Invalid:
                return theme.colors.error;
            case Status.Valid:
                return theme.colors.success;
            default:
                return theme.colors.stroke;
        }
    } else if (props.warning) {
        return theme.colors.warning;
    } else if (props.readonly || props.disabled) {
        return theme.colors.selectedBackground;
    } else {
        return theme.colors.stroke;
    }
};

const getBorderColorOnHover = ({ theme, ...props }: InputFieldProps) => {
    if (props.readonly || props.disabled) {
        return 'none';
    } else {
        return theme.colors.secondaryText;
    }
};

const getBorderColorOnFocus = ({ theme, ...props }: InputFieldProps) => {
    if (props.readonly || props.disabled) {
        return 'none';
    } else {
        return theme.colors.primary;
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
    height: 2rem;
    padding: .5rem;
    width: 100%;

    :hover {
        border-color: ${(props: InputFieldProps) => getBorderColorOnHover(props)}
    }

    :focus {
        border-color: ${(props: InputFieldProps) => getBorderColorOnFocus(props)}
        outline: none;
    }
  `;
