import styled from 'styled-components';

interface ContainerProps {
    isChanged: boolean;
}

export const Container = styled.div.attrs<ContainerProps>({})`
    margin-left: auto;
    padding-right: 1rem;
    display: flex;
    justify-content: space-between;
    width: ${({ isChanged }) => isChanged ? '15rem' : '8.25rem'};
`;
