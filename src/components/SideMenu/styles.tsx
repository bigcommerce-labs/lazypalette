import { Theme } from 'pattern-lab';
import { NavLink } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

import { ExpandModal } from '../ExpandableMenu/styles';

import { Collapsed } from './constants';

export const activeClassName = 'nav-item-active';

export const Container = styled.div`
    position: relative;
    margin: 0;
    height: 100%;
`;

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

export const fadeIn = keyframes`
    0% {
        width: 11.5rem;
        opacity: 1;
        visibility: visible;
        padding-left: 1.5rem;
    }
    25% {
        width: 10rem;
        opacity: .33;
    }
    50% {
        width: 7rem;
        opacity: .33;
        visibility: hidden;
    }
    100% {
        width: 1rem;
        opacity: 1;
        visibility: hidden;
    }
`;

export const fadeOut = keyframes`
    0% {
        width: 1rem;
        opacity: 1;
        visibility: hidden;
        padding-left: 0;
        padding-right: 0;
    }
    50% {
        width: 6rem;
        opacity: .33;
        visibility: hidden;
        padding-left: 0;
        padding-right: 0;
    }
    75% {
        width: 10rem;
        opacity: 0.33;
    }
    100% {
        width: 11.5rem;
        opacity: 1;
        visibility: visible;
    }
`;

const getSideMenuStyles = ({collapsed}: CollapsedProps) => {
    if (collapsed === Collapsed.Yes) {
        return `
            width: 1rem;
            visibility: hidden;
            animation: ${fadeIn} 250ms linear;
        `;
    } else if (collapsed === Collapsed.No) {
        return `
            padding-left: 1.5rem;
            padding-right: 1.5rem;
            width: 11.5rem;
            visibility: visible;
            animation: ${fadeOut} 250ms linear;
        `;
    }

    return `
        padding-left: 1.5rem;
        padding-right: 1.5rem;
        width: 11.5rem;
        visibility: visible;
    `;
};

interface CollapsedProps {
    collapsed: string;
}

export const slideIn = keyframes`
    from { left: 14.5rem; }
    to { left: 1rem; }
`;

export const slideOut = keyframes`
    from { left: 1rem; }
    to { left: 14.5rem; }
`;

export const StyledSideMenu = styled.nav.attrs<CollapsedProps>({})`
    position: relative;
    padding-top: 1.5rem;
    height: 100%;

    ${props => getSideMenuStyles(props)};

    ${ExpandModal} {
        ${props => props.collapsed === Collapsed.Yes && `
            left: 1rem;
            visibility: visible;
            animation: ${slideIn} 250ms linear !important;
        `};
        ${props => props.collapsed === Collapsed.No && `
            left: 14.5rem;
            visibility: visible;
            animation: ${slideOut} 250ms linear !important;
        `};
    }
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
    position: relative;
    top: 0.25rem;
`;

export const DesignMenuButtons = styled.div`
    display: flex;
    justify-content: space-around;
`;

interface CollapsedStyles extends CollapsedProps {
    theme: Theme;
}

export const fadeBtnIn = keyframes`
    from {
        left: 10rem;
        right: 1rem;
    }

    to {
        left: 3rem;
        right: 0;
    }
`;

export const fadeBtnOut = keyframes`
    from {
        left: 3rem;
        right: 0;
    }

    to {
        left: 12rem;
        right: 1rem;
    }
`;

const getCollapseStyles = ({collapsed, theme}: CollapsedStyles) => {
    if (collapsed === Collapsed.Yes) {
        return `
            left: 3rem;
            background: ${theme.colors.primary};
            box-shadow: ${theme.elevation.raised};
            animation: ${fadeBtnIn} 250ms linear;

            :after {
                content: '»';
                color: ${theme.colors.empty};
            }

            :hover {
                background: ${theme.colors.brandPrimary};
            }

            :hover:after {
                color: ${theme.colors.empty};
            }
        `;
    } else if (collapsed === Collapsed.No) {
        return `
            right: 1rem;
            background: ${theme.colors.empty};
            animation: ${fadeBtnOut} 250ms linear;
        `;
    }

    return `
        right: 1rem;
        background: ${theme.colors.empty};
    `;
};

export const CollapseButton = styled.button.attrs<CollapsedProps>({})`
    position: absolute;
    bottom: 5rem;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    border: 1px solid ${({ theme }) => theme.colors.stroke};
    cursor: pointer;
    padding-bottom: .25rem;
    visibility: visible;

    :after {
        font-size: 1.25rem;
        font-weight: ${({ theme }) => theme.typography.fontWeight.thin};
        content: '«';
        color: ${({ theme }) => theme.colors.secondaryText};
    }

    :hover {
        background: ${({ theme }) => theme.colors.selectedBackground};
    }

    :hover:after {
        color: ${({ theme }) => theme.colors.primaryText};
    }

    :focus {
        outline: none !important;
    }

    ${props => getCollapseStyles(props)};
`;

interface ToolTipProps {
    key: string;
    primaryTip: string;
    secondaryTip: string;
}

export const delayIn = keyframes`
    from { opacity: 0; }

    to { opacity: 1; }
`;

export const ToolTip = styled.span.attrs<ToolTipProps>({})`
    opacity 0;
    background: ${({ theme }) => theme.colors.primaryText};
    color: ${({ theme }) => theme.colors.empty};
    border-radius: 6px;
    position: absolute;
    top: -3.5rem;
    left: 0;
    width: 10rem;
    z-index: ${({ theme }) => theme.layers.highest};
    box-shadow: ${({ theme }) => theme.elevation.raised};

    :after {
        font-size: 1rem;
        font-weight: ${({ theme }) => theme.typography.fontWeight.thin};
        line-height: 3rem;
    }

    ${CollapseButton}:hover & {
        :after {
            content: "${props => props.primaryTip}";
        }
        animation: ${delayIn} 250ms linear;
        animation-delay: 500ms;
        animation-fill-mode: forwards;

        ${props => props.key === Collapsed.Yes && `
            :after {
                content: "${props.secondaryTip}";
            }
        `};
    }
`;
