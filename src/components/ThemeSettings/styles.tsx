import { theme } from 'pattern-lab';
import styled from 'styled-components';

export const List = styled.ul`
    width: 20rem;
    list-style: none;
    padding: 0;
    margin: 0 1rem 0 1.5rem;

    > :first-child > * {
        margin-top: 0;
    }
`;

export const Item = styled.li`
    line-height: 1.5rem;
    margin: 0 0 .5rem 0;
    max-width: 20rem;
`;

export const Heading = styled.div`
    color: ${theme.colors.primaryText};
    font-weight: ${theme.typography.fontWeight.bold};
    line-height: 1.5rem;
    margin: 2.5rem 0 0.5rem 0;
`;

export const Paragraph = styled.p`
    color: ${theme.colors.secondaryText};
    font-size: ${theme.typography.fontSize.smaller};
    line-height: 1.25rem;
    margin: 0 0 0.5rem 0;
`;
