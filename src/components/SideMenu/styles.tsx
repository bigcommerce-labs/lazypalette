import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const activeClassName = 'nav-item-active';

export const Title = styled.div`
    color: ${({ theme }) => theme.colors.primaryText};
    font-size: ${({ theme }) => theme.typography.fontSize.larger};
    line-height: 2rem;
    margin-bottom: 1rem;
`;

interface NavProps {
    activeClassName: string;
    disabled?: boolean;
}

export const NavItem = styled(NavLink)
    .attrs<NavProps>({
    activeClassName,
})`
    ${({ disabled, theme }) => `
        color: ${theme.colors.primaryText};
        display: flex;
        height: 2.25rem;
        justify-content: space-between;
        opacity: ${disabled ? 0.5 : 1}
        overflow: hidden;
        pointer-events: ${disabled ? 'none' : 'auto'};
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
    padding-top: 1.5rem;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    width: 11.5rem;
`;

export const StyledMenuItems = styled.ul`
    font-size: ${({ theme }) => theme.typography.fontSize.small};
    line-height: 1.5rem;
    list-style-type: none;
    margin-top: 0;
    padding-left: 0;
    vertical-align: top;
`;

export const StyledMenuItemIcon = styled.span`
    color: ${({ theme }) => theme.colors.guideText};
    float: right;
    position: relative;
    top: 0.25rem;
`;

export const DesignMenuButtons = styled.div`
    display: flex;
    justify-content: space-around;
`;
