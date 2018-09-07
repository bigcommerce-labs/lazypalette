import styled from 'styled-components';

interface ContainerProps {
    isChanged: boolean;
}

export const Container = styled.div.attrs<ContainerProps>({})`
    margin-left: auto;
    display: flex;
    justify-content: flex-end;
    width: 25rem;
    > div {
        margin-left: 1rem;
    }
`;
