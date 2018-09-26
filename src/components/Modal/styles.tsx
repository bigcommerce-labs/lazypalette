import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface OverlayProps {
    isTransparent?: boolean;
}

export const Close = styled.div`
    cursor: pointer;
    text-align: center;
    width: 2.5rem;

    :after {
        content: '✕';
        color: ${({ theme }) => theme.colors.primaryText};
    }
`;

Close.defaultProps = {
    theme: {
        colors: {
            background: '#000000',
            primaryText: '#AAAAAA',
        },
    },
};

export const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow-y: auto;
    z-index: ${({ theme }) => theme.layers.higher};
`;

Container.defaultProps = {
    theme: {
        layers: {
            higher: 100,
        },
    },
};

export const Overlay = styled.div.attrs<OverlayProps>({})`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow-y: auto;
    opacity: ${({ isTransparent }) => isTransparent ? 0 : 0.8};
    background: ${({ theme }) => theme.colors.empty};
    z-index: ${({ theme }) => theme.layers.higher};
`;

Overlay.defaultProps = {
    theme: {
        colors: {
            empty: '#FFFFFF',
        },
        layers: {
            higher: 100,
        },
    },
};

export const Content = styled.div`
    color: ${({ theme }) => theme.colors.primaryText};
    line-height: 1.5rem;
    font-size: ${({ theme }) => theme.typography.fontSize.small};
    margin: 0;
    padding: 0;
    overflow: auto;
`;

Content.defaultProps = {
    theme: {
        colors: {
            primaryText: '#AAAAAA',
        },
        typography: {
            fontSize: {
                small: '16px',
            },
        },
    },
};

export const Header = styled.div`
    align-items: stretch;
    display: flex;
    flex-shrink: 0;
    justify-content: space-between;
    line-height: 2rem;
    margin: 0 -0.75rem 1rem 0;
    padding: 0;
`;

export const Title = styled.h3`
    color: ${({ theme }) => theme.colors.primaryText};
    font-size: ${({ theme }) => theme.typography.fontSize.larger};
    font-weight: ${({ theme }) => theme.typography.fontWeight.normal};
    margin: 0;
`;

Title.defaultProps = {
    theme: {
        colors: {
            primaryText: '#303540',
        },
        typography: {
            fontSize: {
                larger: '24px',
            },
            fontWeight: {
                normal: 600,
            },
        },
    },
};

export const ModalBox = styled.div`
    box-sizing: border-box;
    position: relative;
    background-color: ${({ theme }) => theme.colors.empty};
    padding: 1.5rem;
    border: 1px solid ${({ theme }) => theme.colors.guideText};
    box-shadow: ${({ theme }) => theme.elevation.floating};
    overflow: auto;
    width: 30rem;
    z-index: ${({ theme }) => theme.layers.highest};
`;

ModalBox.defaultProps = {
    theme: {
        colors: {
            empty: '#FFFFFF',
            guideText: '#ABB1BE',
        },
        elevation: {
            floating: '0 2px 12px rgba(48, 53, 64, 0.2)',
        },
        layers: {
            highest: 500,
        },
    },
};

export const NavItem = styled(Link)`
    position: absolute;
    right: 1rem;
    top: .5rem;
    text-decoration: none;
    text-shadow: 0 1px 0 ${({ theme }) => theme.colors.background};

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
            background: '#F5F7FA',
            primaryText: '#303540',
        },
    },
};

export const ModalBody = styled.div`
`;

export const ConfirmButtons = styled.div`
    display: inline-flex;
    justify-content: flex-end;
`;

export const ConfirmButton = styled.div`
    margin-left: 1rem;
`;

export const ModalView = styled.div`
    max-width: 35rem;
`;

export const ModalFooter = styled.div`
    display: flex;
    justify-content: flex-end;
    margin: 1.5rem 0 0 0;
`;
