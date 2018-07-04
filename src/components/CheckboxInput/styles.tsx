import styled from 'styled-components';

export const Container = styled.div`
    position: relative;
`;

export const Input = styled.input.attrs({
    type: 'checkbox',
})`
    ${({ theme }) => `
        opacity: 0;

        :not(:checked) + label:after {
            opacity: 0;
        }

        :not(:checked) + label {
            background: #FFF;
            border: 1px solid ${theme.colors.guideText};
            box-sizing: border-box;
        }
    `}
`;

export const Label = styled.label`
    ${({ theme }) => `
        cursor: pointer;
        position: absolute;
        width: 1.25rem;
        height: 1.25rem;
        top: 25%;
        left: 0;
        background: ${theme.colors.primary};
        border-radius: 2px;

        :after {
            content: '';
            position: absolute;
            width: .5rem;
            height: .25rem;
            background: transparent;
            top: .25rem;
            left: .25rem;
            border: 3px solid ${theme.colors.stroke};
            border-top: none;
            border-right: none;
            transform: rotate(-45deg);
        }
    `}
`;

export const HiddenLabel = styled.label`
    padding-left: .5rem;
    line-height: 1.25rem;
    display: inline-block;
`;
