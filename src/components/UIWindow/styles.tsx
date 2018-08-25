import styled, { keyframes } from 'styled-components';

export const Content = styled.div`
    margin: 0;
    padding: .5rem .75rem;
    overflow: auto;
`;

export const Header = styled.div`
    align-items: center;
    background-color: ${({ theme }) => theme.colors.background};
    cursor: pointer;
    cursor: move;
    display: flex;
    justify-content: space-between;
    height: 1rem;
    padding: 0.75rem 0.75rem 0.75rem 1.5rem;
    margin: 0;
    font-weight: ${({ theme }) => theme.typography.fontWeight.normal};
    color: ${({ theme }) => theme.colors.primaryText};
`;

Header.defaultProps = {
    theme: {
        colors: {
            primaryText: '#FFFFFF',
        },
        typography: {
            fontWeight: {
                bold: 200,
            },
        },
    },
};

Header.displayName = 'Header';

export const Title = styled.h4`
    margin: 0;
    font-weight: ${({ theme }) => theme.typography.fontWeight.normal};
    color: ${({ theme }) => theme.colors.primaryText};
`;

Title.defaultProps = {
    theme: {
        colors: {
            primaryText: '#FFFFFF',
        },
        typography: {
            fontWeight: {
                normal: 200,
            },
        },
    },
};

interface StyledWindowProps {
    position?: { x: number, y: number };
}

const openAnimation = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.85);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

export const StyledWindow = styled.div.attrs<StyledWindowProps>({})`
    position: absolute;
    background-color: ${({ theme }) => theme.colors.empty};
    border: 1px solid ${({ theme }) => theme.colors.guideText};
    border-radius: 6px;
    box-shadow: ${({ theme }) => theme.elevation.raised};
    overflow: auto;
    animation: ${openAnimation} 50ms linear;
    pointer-events: auto;
    z-index: ${({ theme }) => theme.layers.higher};
    ${({ position }) => {
        if (position) {
            return `
                left: ${position.x}px;
                top: ${position.y}px;
            `;
        }

        return ``;
    }}
`;

StyledWindow.defaultProps = {
    theme: {
        colors: {
            empty: '#FFFFFF',
            guideText: '#AAAAAA',
        },
        elevation: {
            raised: 1,
        },
        layers: {
            higher: 100,
        },
    },
};

export const Overlay = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: hidden;
`;
