import { Theme } from 'pattern-lab';
import styled from 'styled-components';

import { Sign, Status } from './constants';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Label = styled.label`
    padding: 0 0 .5rem;
    color:  ${({ theme }) => theme.colors.primaryText};
    line-height: 1rem;
`;

interface BorderRadiusProps {
    value: string;
    theme: Theme;
}

const getBorderRadius = ({value, theme}: BorderRadiusProps) => {
    const defaultRadius = 'border-radius: 2px';

    if (value === Sign.Plus) {
        return `
            ${defaultRadius};
            border-top-left-radius: 0px;
            border-bottom-left-radius: 0px;
        `;
    } else if (value === Sign.Minus) {
        return `
            ${defaultRadius};
            border-top-right-radius: 0px;
            border-bottom-right-radius: 0px;
        `;
    }

    return `
        ${defaultRadius};
    `;
};

interface ButtonProps {
    value: string;
}

export const Button = styled.input.attrs<ButtonProps>({})`
    height: 2rem;
    border: 1px solid ${({ theme }) => theme.colors.stroke};
    ${props => getBorderRadius(props)};
    padding: 0 0 .25rem;
    font-size: 1.5rem;
    cursor: pointer;
    background-color: ${({ theme }) => theme.colors.empty};
    color: ${({ theme }) => theme.colors.primary};
    width: 2.5rem;

    :hover {
        border-color: ${({ theme }) => theme.colors.primary};
    }

    :focus {
        outline: none !important;
    }

    :disabled, :disabled:hover {
        background-color: ${({ theme }) => theme.colors.empty};
        border: 1px solid ${({ theme }) => theme.colors.stroke};
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

interface BorderProps {
    status?: string;
    theme: Theme;
}

const getBorder = ({status, theme}: BorderProps) => {
    if (status === Status.Invalid) {
        return `
            border: 1px solid ${theme.colors.error};
        `;
    }

    return `
        border: 1px solid ${theme.colors.stroke};
        border-left: none;
        border-right: none;
    `;
};

interface InputProps {
    status?: string;
}

export const Input = styled.input.attrs<InputProps>({})`
    cursor: text;
    background-color: ${({ theme }) => theme.colors.empty};
    ${props => getBorder(props)};
    box-sizing: border-box;
    height: 2rem;
    padding: .25rem;
    font-size: 0.75rem;
    text-align: center;
    width: 2.5rem;

    :focus {
        border-color: ${({ theme }) => theme.colors.stroke};
        outline: none;
    }

    :disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    ::-webkit-inner-spin-button, ::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
`;

export const InputBox = styled.div`
    display: flex;
`;

interface SmallProps {
    required?: boolean;
}

export const Small = styled.small.attrs<SmallProps>({})`
    ${({ required, theme }) => `
        color: ${required ? theme.colors.error : 'initial'};
        font-size: ${theme.typography.fontSize.smallest};
        padding-top: .25rem;
    `}
`;
