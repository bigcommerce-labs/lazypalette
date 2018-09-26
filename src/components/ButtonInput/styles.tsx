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
    box-sizing: border-box;
    border: ${({ border, theme }) => border ? `1px solid ${theme.colors.primary}` : 'none'};
    padding: ${({ border }) => border ? '0 1rem' : '0'};
    font-family: ${({ theme }) => theme.typography.fontFamily.sans };
    font-size: 1rem;
    cursor: pointer;

    ${({ border, classType, theme }) => {
        const isPrimary = classType === 'primary';

        return `
            background-color: ${isPrimary ? theme.colors.primary : '#FFF'};
            color: ${isPrimary ? '#FFF' : theme.colors.primary};

            :hover {
                background-color: ${isPrimary ? theme.colors.primaryHover : theme.colors.secondaryHover};
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
            }
        `;
    }}
`;

Button.defaultProps = {
    theme: {
        colors: {
            background: '#F5F7FA',
            brandPrimary: '#273A8A',
            primary: '#3F69FE',
        },
        typography: {
            fontFamily: {
                sans: '"Source Sans Pro", "Helvetica Neue", Arial, sans-serif',
            },
        },
    },
};
