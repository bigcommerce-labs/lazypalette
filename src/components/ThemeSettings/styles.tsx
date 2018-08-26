import { theme } from 'pattern-lab';
import styled from 'styled-components';

export const List = styled.ul`
    width: 20rem;
    max-height: 55vh;
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
