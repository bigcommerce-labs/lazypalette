import styled from 'styled-components';

export const StyledApp = styled.div`
    background: ${({ theme: { colors } }) => colors.background};
    align-content: flex-start;
    display: flex;
    flex-direction: column;
    height: 100%;
    position: fixed;
    width: 100%;
`;

export const Viewport = styled.div`
    display: flex;
    flex-direction: row;
    flex-grow: 1;
`;
