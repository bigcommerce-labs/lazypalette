import { theme } from 'pattern-lab';
import styled from 'styled-components';

export const Wrapper = styled.div`
    margin: 0;
`;

interface ButtonProps {
    border?: boolean;
    classType?: string;
}

export const Button = styled.button.attrs<ButtonProps>({})`
    height: 2rem;
    border-radius: 2px;
    border: ${({ border }) => border ? `1px solid ${theme.colors.primary}` : 'none'};
    padding: ${({ border }) => border ? '0 .75em' : '0'};
    font-size: .75rem;
    cursor: pointer;

    ${({ classType, border }) => {
        const isPrimary = classType === 'primary';

        return `
            background-color: ${isPrimary ? theme.colors.primary : '#FFF'};
            color: ${isPrimary ? '#FFF' : theme.colors.primary};

            :hover {
                background-color: ${isPrimary ? theme.colors.brandPrimary : theme.colors.background};
                ${!border && `
                    background-color: transparent;
                `}
                border-color: ${isPrimary ? theme.colors.brandPrimary : theme.colors.primary};
                text-decoration: ${border ? 'none' : 'underline'};
            }

            :focus {
                outline: none !important;
            }

            :disabled {
                background-color: ${isPrimary ? theme.colors.primary : '#FFF'};
                opacity: 0.5;
                cursor: not-allowed;
            }
        `;
    }}
`;
