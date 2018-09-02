import styled from 'styled-components';

interface ContainerProps {
    isChanged: boolean;
}

export const Container = styled.div.attrs<ContainerProps>({})`
    display: flex;
    flex-grow: 1;
    justify-content: flex-end;
`;

export const ButtonWrapper = styled.div`
    margin: 0 0 0 1rem;
`;
