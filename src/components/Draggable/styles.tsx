import styled from 'styled-components';

interface WrapperProps {
    dragging: boolean;
}

export const Wrapper = styled.div.attrs<WrapperProps>({})`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: hidden;
    pointer-events: ${({ dragging }) => dragging ? 'auto' : 'none'};
    z-index: ${({ theme }) => theme.layers.high};
`;

Wrapper.defaultProps = {
    theme: {
        layers: {
            high: 100,
        },
    },
};
