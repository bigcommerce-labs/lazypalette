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
    minHeight?: string;
    position?: { x: number, y: number };
    size?: { width: number, height: number };
}

export const ExpandModal = styled.div.attrs<ExpandModalProps>({
    style: ({ minHeight, position, size }: ExpandModalProps) => ({
        left: position ? `${position.x}px` : undefined,
        maxHeight: size ? `${size.height}px` : '31rem',
        minHeight: minHeight ? minHeight : '10.5rem',
        top: position ? `${position.y}px` : undefined,
    }),
})`
    border-radius: 6px;
    position: absolute;
    display: flex;
    flex-direction: column;
    background: #FFF;
    padding: 0rem;
    box-shadow: ${({ theme }) => theme.elevation.floating};
    animation: ${openAnimation} 100ms ease-out;
    pointer-events: auto;
    visibility: visible;
}}
`;

ExpandModal.defaultProps = {
    theme: {
        elevation: {
            floating: '0 2px 12px rgba(48, 53, 64, 0.2)',
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
    flex-shrink: 0;
    justify-content: space-between;
    line-height: 3.5rem;
    margin: 0;
    font-weight: ${({ theme }) => theme.typography.fontWeight.normal};
    color: ${({ theme }) => theme.colors.primaryText};
`;

Header.defaultProps = {
    theme: {
        colors: {
            background: '#F5F7FA',
            primaryText: '#AAAAAA',
        },
        typography: {
            fontWeight: {
                normal: 400,
            },
        },
    },
};

export const Title = styled.h2`
    flex-grow: 1;
    margin: 0;
    padding: 0 0 0 1.5rem;
    font-weight: ${({ theme }) => theme.typography.fontWeight.normal};
    color: ${({ theme }) => theme.colors.primaryText};
`;

Title.defaultProps = {
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
    flex-shrink: 1;
    flex-grow: 1;
    margin: 0.5rem 0 0 0;
    padding: 1.5rem 0 0 0;
    overflow-x: hidden;
    overflow-y: auto;
`;

export const ResizeHandle = styled.div`
    cursor: pointer;
    cursor: ns-resize;
    flex-shrink: 0;

    > div {
        opacity: 0;
        transition-duration: 150ms
    }

    &:hover {
        > div {
            opacity: 1;
            transition-duration: 150ms
        }
    }
`;

export const ResizeIcon = styled.div`
    height: 1.5rem;
    margin: 0 auto;
    width: 1rem;
`;
