import { theme } from 'pattern-lab';
import styled from 'styled-components';

export const List = styled.ul`
    min-width: 25rem;
    max-height: 55vh;
    list-style: none;
    padding: 0;
    margin: 0;
`;

export const Item = styled.li`
    margin: .5rem 1.5rem;
    cursor: pointer;
`;

export const Title = styled.div`
    color: ${theme.colors.primaryText};
    font-weight: ${theme.typography.fontWeight.normal};
`;

export const Heading = styled.h3`
    color: ${theme.colors.primaryText};
    font-weight: ${theme.typography.fontWeight.bold};
    font-size: ${theme.typography.fontSize.large};
`;
