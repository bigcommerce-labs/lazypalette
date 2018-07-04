import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Label = styled.label`
    padding: .25rem;
`;

export const Select = styled.select`
    height: 2.25rem;
    width: 100%;
    font-size: ${({ theme }) => theme.typography.fontSize.small};
    color: ${({ theme }) => theme.colors.primaryText};
    padding: .25rem 1.5rem .25rem .5rem;
    background-color: #FFF;
    border: 1px solid ${({ theme }) => theme.colors.stroke};
    cursor: pointer;
`;
