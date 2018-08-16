import styled from 'styled-components';

export const Container = styled.div`
    background: ${({ theme }) => theme.colors.empty};
    border-radius: 0px;
    box-shadow: ${({ theme }) => theme.elevation.raised};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0.75rem 0.75rem 0 0;
    height: calc(100% - 6rem);
    width: calc(100% - 15.5rem);
`;

export const Heading = styled.h1`
    color: ${({ theme }) => theme.colors.primaryText};
`;

export const Body = styled.p`
    color: ${({ theme }) => theme.colors.primaryText};
    font-size: ${({ theme }) => theme.typography.fontSize.small};
`;
