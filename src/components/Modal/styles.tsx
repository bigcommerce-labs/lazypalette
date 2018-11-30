import styled from 'styled-components';

interface OverlayProps {
    isTransparent?: boolean;
}

export const Close = styled.div`
    cursor: pointer;
    text-align: center;
    width: 2rem;
    height: 2rem;
    margin-right: .25rem;
    display: flex;
    justify-content: center;
    align-items: center;

    :hover {
      cursor: pointer;
      background: ${({ theme }) => theme.colors.darkHover};
      border-radius: 50%;
    }
`;

Close.defaultProps = {
    theme: {
        colors: {
            darkHover: '#D3D9E5',
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
    opacity: ${({ isTransparent }) => isTransparent ? 0 : 0.45};
    background: #000000;
    z-index: ${({ theme }) => theme.layers.higher};
`;

Overlay.defaultProps = {
    theme: {
        layers: {
            higher: 100,
        },
    },
};

export const Content = styled.div`
    color: ${({ theme }) => theme.colors.primaryText};
    line-height: 1.5rem;
    font-size: ${({ theme }) => theme.typography.fontSize.small};
    font-weight: ${({ theme }) => theme.typography.fontWeight.normal};
    margin: 0;
    padding: 0;
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
            fontWeight: {
                normal: 400,
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
    background-color: ${({ theme }) => theme.colors.empty};
    border: 1px solid ${({ theme }) => theme.colors.guideText};
    border-radius: 4px;
    box-shadow: ${({ theme }) => theme.elevation.floating};
    box-sizing: border-box;
    overflow: auto;
    padding: 1.5rem;
    position: relative;
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
