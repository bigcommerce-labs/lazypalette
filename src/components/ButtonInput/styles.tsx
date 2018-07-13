import { theme } from 'pattern-lab';
import styled from 'styled-components';

export const Wrapper = styled.div`
    margin: 0;
`;

interface ButtonProps {
    classType?: string;
}

export const Button = styled.button.attrs<ButtonProps>({})`
    height: 2rem;
    border-radius: 2px;
    border: 1px solid ${theme.colors.primary};
    padding: 0 .75em;
    font-size: .75rem;
    cursor: pointer;

    ${({ classType }) => {
        const isPrimary = classType === 'primary';

        return `
            background-color: ${isPrimary ? theme.colors.primary : '#FFF'};
            color: ${isPrimary ? '#FFF' : theme.colors.primary};

            :hover {
                background-color: ${isPrimary ? theme.colors.brandPrimary : theme.colors.background};
                border-color: ${isPrimary ? theme.colors.brandPrimary : theme.colors.primary};
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
