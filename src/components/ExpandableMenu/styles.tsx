import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

export const Wrapper = styled.div`
    margin: 0;
`;

export const fadeIn = keyframes`
    from { opacity: 0.25;}
    to { opacity: 1; }
`;

export const ExpandModal = styled.div`
    position: absolute;
    left: 13.5rem;
    top: 3.75rem;
    background: #FFF;
    padding: .5rem;
    box-shadow: ${({ theme }) => theme.elevation.raised};
    z-index: ${({ theme }) => theme.layers.high};
    animation: ${fadeIn} 400ms ease-in;
    overflow: auto;
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

export const Header = styled.h2`
    padding: 1.25rem 0 0 1.25rem;
    margin: 0 0 .5rem;
    font-weight: ${({ theme }) => theme.typography.fontWeight.normal};
    color: ${({ theme }) => theme.colors.primaryText};
`;

export const Content = styled.div`
    margin: 0;
    padding: 0;
    overflow: auto;
`;
