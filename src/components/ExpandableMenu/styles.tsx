import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

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

interface ExpandModalProps {
    position?: { x: number, y: number };
}

export const ExpandModal = styled.div.attrs<ExpandModalProps>({})`
    border-radius: 6px;
    position: absolute;
    background: #FFF;
    padding: 0rem;
    box-shadow: ${({ theme }) => theme.elevation.raised};
    animation: ${openAnimation} 100ms ease-out;
    overflow: auto;
    pointer-events: auto;
    visibility: visible;

    ${({ position }) => position && `
                left: ${position.x}px;
                top: ${position.y}px;
    `}}
`;

ExpandModal.defaultProps = {
    theme: {
        elevation: {
            raised: '0 1px 6px rgba(48, 53, 64, 0.2)',
        },
        layers: {
            high: 50,
        },
    },
};

export const NavItem = styled(Link)`
    text-align: center;
    text-decoration: none;
    text-shadow: 0 1px 0 ${({ theme }) => theme.colors.background};
    width: 3.5rem;

    :after {
        content: '✕';
        color: ${({ theme }) => theme.colors.primaryText};

        :visited, :hover, :active {
            color: ${({ theme }) => theme.colors.primaryText};
        }
    }
`;

NavItem.defaultProps = {
    theme: {
        colors: {
            background: '#000000',
            primaryText: '#AAAAAA',
        },
    },
};

export const Header = styled.div`
    align-items: stretch;
    background-color: ${({ theme }) => theme.colors.background};
    cursor: pointer;
    cursor: move;
    display: flex;
    justify-content: space-between;
    line-height: 3.5rem;
    margin: 0;
    font-weight: ${({ theme }) => theme.typography.fontWeight.normal};
    color: ${({ theme }) => theme.colors.primaryText};
`;

export const Title = styled.h2`
    flex-grow: 1;
    margin: 0;
    padding: 0 0 0 1.5rem;
    font-weight: ${({ theme }) => theme.typography.fontWeight.normal};
    color: ${({ theme }) => theme.colors.primaryText};
`;

Header.defaultProps = {
    theme: {
        colors: {
            primaryText: '#AAAAAA',
        },
        typography: {
            fontWeight: {
                normal: 400,
            },
        },
    },
};

export const Content = styled.div`
    margin: 0;
    padding: 0;
    overflow: auto;
`;
