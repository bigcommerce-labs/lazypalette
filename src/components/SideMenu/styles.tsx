import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const activeClassName = 'nav-item-active';

export const BackLink = styled.div`
    color: ${({ theme }) => theme.colors.primaryText};
    font-size: ${({ theme }) => theme.typography.fontSize.larger};
    margin-bottom: 1.75rem;
    margin-left: 1.75rem;
`;

interface NavProps {
    activeClassName: string;
}

export const NavItem = styled(NavLink)
    .attrs<NavProps>({
    activeClassName,
})`
    ${({ theme }) => `
        color: ${theme.colors.primaryText};
        display: block;
        height: 2.25rem;
        overflow: hidden;
        padding-left: .5rem;
        text-decoration: none;

        &:visited {
            color: ${theme.colors.primaryText};
        }

        &.${activeClassName} {
            font-weight: ${theme.typography.fontWeight.bold};
        }
    `}
`;

export const StyledSideMenu = styled.nav`
    height: 100%;
    padding-top: 1.75rem;
    width: 13.5rem;
    background: ${({ theme }) => theme.colors.background};
`;

export const StyledMenuItems = styled.ul`
    font-size: ${({ theme }) => theme.typography.fontSize.small};
    line-height: 2.25rem;
    list-style-type: none;
    margin-left: 2.5rem;
    margin-top: 0;
    padding-left: 0;
    vertical-align: top;
`;
