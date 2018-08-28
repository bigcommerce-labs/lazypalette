import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface OverlayProps {
    isTransparent?: boolean;
}

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

export const Content = styled.div`
    margin: 0;
    padding: 0;
    overflow: auto;
`;

export const Header = styled.h3`
    padding: 1.25rem 0 0 .5rem;
    margin: 0 0 .5rem;
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    color: ${({ theme }) => theme.colors.primaryText};
`;

export const ModalBox = styled.div`
    position: relative;
    background-color: ${({ theme }) => theme.colors.empty};
    padding: .5rem .75rem;
    border: 1px solid ${({ theme }) => theme.colors.guideText};
    box-shadow: ${({ theme }) => theme.elevation.floating};
    overflow: auto;
    z-index: ${({ theme }) => theme.layers.highest};
`;

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

export const ConfirmBody = styled.div`
    padding-left: .5rem;
`;

export const ConfirmButtons = styled.div`
    display: inline-flex;
    justify-content: space-between;
    width: 7rem;
`;

export const Confirm = styled.div`
    max-width: 35rem;
`;

export const ConfirmFooter = styled.div`
    display: flex;
    justify-content: flex-end;
    padding: 1.5rem .5rem .5rem
`;
