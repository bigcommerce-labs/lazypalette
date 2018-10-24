import styled from 'styled-components';

export const Container = styled.div`
    align-items: flex-start;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

interface SelectedColorProps {
    color: string;
    focus: boolean;
}
export const SelectedColor = styled.div.attrs<SelectedColorProps>({}) `
    background: ${(props: SelectedColorProps) => `${props.color}`};
    border-radius: 3px;
    box-sizing: border-box;
    cursor: pointer;
    flex-shrink: 0;
    height: 1.5rem;
    width: 1.5rem;


    ${({ focus, theme }) => {
        const strokeColor = focus ? theme.colors.primary : theme.colors.stroke;
        const borderShadow = focus ? '8px' : '0';

        return `
            border: 1px solid ${strokeColor};
            box-shadow: 0 0 ${borderShadow} ${strokeColor};
        `;
    }}

`;

export const ColorText = styled.div`
    color: ${({ theme }) => theme.colors.secondaryText};
    flex-grow: 1;
    font-size: ${({ theme }) => theme.typography.fontSize.smaller};
    margin-right: 0.5rem;
    text-align: right;
`;

export const Label = styled.label`
    color: ${({ theme }) => theme.colors.primaryText};

    :focus {
        outline: none !important;
    }
`;
