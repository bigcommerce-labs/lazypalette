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
    border-radius: 6px;
    position: absolute;
    left: 14.5rem;
    top: 3.75rem;
    background: #FFF;
    padding: 0rem;
    box-shadow: ${({ theme }) => theme.elevation.raised};
    z-index: ${({ theme }) => theme.layers.high};
    animation: ${fadeIn} 400ms ease-in;
    overflow: auto;
    visibility: visible;
`;

export const NavItem = styled(Link)`
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

export const Header = styled.div`
    align-items: center;
    background-color: ${({ theme }) => theme.colors.background};
    display: flex;
    justify-content: space-between;
    line-height: 2rem;
    padding: 0.75rem 0.75rem 0.75rem 1.5rem;
    margin: 0;
    font-weight: ${({ theme }) => theme.typography.fontWeight.normal};
    color: ${({ theme }) => theme.colors.primaryText};
`;

export const Title = styled.h2`
    margin: 0;
    font-weight: ${({ theme }) => theme.typography.fontWeight.normal};
    color: ${({ theme }) => theme.colors.primaryText};
`;

export const Content = styled.div`
    margin: 0;
    padding: 0;
    overflow: auto;
`;
