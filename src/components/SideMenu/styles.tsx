import { Theme } from 'pattern-lab';
import { NavLink } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

export const activeClassName = 'nav-item-active';

export const fadeIn = keyframes`
    0% {
        width: 13.5rem;
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
        width: 13.5rem;
        opacity: 1;
        visibility: visible;
    }
`;

interface CollapsedProps {
    collapsed?: boolean;
}

const getSideMenuStyles = ({collapsed}: CollapsedProps) => {
    if (collapsed === undefined) {
        return `
            width: 16.5rem;
            visibility: visible;
    `;
    } else if (collapsed) {
        return `
            width: 1rem;
            visibility: hidden;
            animation: ${fadeIn} 250ms linear;
        `;
    } else {
        return `
            width: 16.5rem;
            visibility: visible;
            animation: ${fadeOut} 250ms linear;
        `;
    }
};

export const Container = styled.nav.attrs<CollapsedProps>({})`
    display: flex;
    flex-direction: column;
    position: relative;
    justify-content: stretch;
    margin: 0;
    width: 16.5rem;

    ${props => getSideMenuStyles(props)};
`;

export const Header = styled.div`
    flex-grow: 0;
    margin: 1.5rem 1.25rem 1.25rem 1.5rem;
`;

export const MenuContents = styled.div`
    flex: 1;
    flex-grow: 1;
    margin: 0;
    overflow-y: auto;

    &::-webkit-scrollbar {
        -webkit-appearance: none;

        &:vertical {
            width: 11px;
        }
    }

    &::-webkit-scrollbar-thumb {
        border-radius: 8px;
        border: 2px solid ${({ theme: { colors } }) => colors.background};
        background-color: rgba(0, 0, 0, .5);
    }

    &::-webkit-scrollbar-track {
        background-color: ${({ theme: { colors } }) => colors.background};
        border-radius: 8px;
    }
`;

MenuContents.defaultProps = {
    theme: {
        colors: {
            background: '#FFFFFF',
        },
    },
};

export const Footer = styled.div`
    flex-grow: 0;
    flex-shrink: 1;
    margin: 1rem 1.25rem 1.5rem 1.5rem;
    z-index: ${({ theme }) => theme.layers.high};
`;

export const HiddenTitle = styled.div`
    color: transparent;
    font-size: ${({ theme }) => theme.typography.fontSize.larger};
    line-height: 2rem;
    margin: 0 0 0.5rem 0;
    min-height: 2rem;
`;

HiddenTitle.defaultProps = {
    theme: {
        typography: {
            fontSize: {
                larger: '20px',
            },
        },
    },
};

interface TitleProps {
    longTitle: boolean;
}

export const Title = styled.div.attrs<TitleProps>({
    style: ({ longTitle, theme }: { longTitle: boolean, theme: Theme }) => ({
        fontSize: longTitle ? theme.typography.fontSize.large : theme.typography.fontSize.larger,
        lineHeight: longTitle ? '1.5rem' : '2rem',
    }),
})`
    color: ${({ theme }) => theme.colors.primaryText};
    margin: 0 0 0.5rem 0;
    min-height: 2rem;
`;
export const TitleTooltip = styled.div`
    max-width: 15rem;
`;

interface NavProps {
    activeClassName: string;
    disabled?: boolean;
    divider?: boolean;
}

export const NavItem = styled(NavLink)
    .attrs<NavProps>({
    activeClassName,
})`
    ${({ disabled, divider, theme }) => `
        align-items: center;
        color: ${theme.colors.primaryText};
        display: flex;
        justify-content: space-between;
        padding: .375rem 0 .375rem 0;
        margin: 0 .75rem 0 .5rem;
        opacity: ${disabled ? 0.5 : 1}
        overflow: hidden;
        pointer-events: ${disabled ? 'none' : 'auto'};
        text-decoration: none;

        :hover {
          background: ${theme.colors.backgroundHover};
          border-radius: 2px;
        }

        &:visited {
            color: ${theme.colors.primaryText};
        }

        &.${activeClassName} {
            font-weight: ${theme.typography.fontWeight.bold};
        }
    `}
`;

NavItem.defaultProps = {
    theme: {
        colors: {
            primaryText: '#FFFFFF',
        },
        typography: {
            fontWeight: {
                bold: '600',
            },
        },
    },
};

export const ExternalNavItem = styled.a`
    ${({ theme }) => `
        align-items: center;
        color: ${theme.colors.primaryText};
        display: flex;
        overflow: hidden;
        padding-right: 0.5rem;
        text-decoration: none;
        width: max-content;

        :hover {
          text-decoration: underline;
        }

        &:visited {
            color: ${theme.colors.primaryText};
        }

        &.${activeClassName} {
            color: ${theme.colors.primaryText};
            font-weight: ${theme.typography.fontWeight.bold};
        }
    `}
`;

export const ExternalHelpItem = styled.a`
    ${({ theme }) => `
        align-items: center;
        color: ${theme.colors.primaryText};
        display: flex;
        padding: .25rem 0 .25rem 0;
        margin: 0 .75rem 0 .5rem;
        overflow: hidden;
        text-decoration: none;

        :hover {
          background: ${theme.colors.backgroundHover};
          border-radius: 2px;
        }

        &:visited {
            color: ${theme.colors.primaryText};
        }

        &.${activeClassName} {
            color: ${theme.colors.primaryText};
            font-weight: ${theme.typography.fontWeight.bold};
        }
    `}
`;

ExternalNavItem.defaultProps = {
    theme: {
        colors: {
            primaryText: '#FFFFFF',
        },
        typography: {
            fontWeight: {
                bold: '600',
            },
        },
    },
};

interface ListItemProps {
    divider?: boolean;
    isActive: boolean;
}

export const ListItem = styled.li.attrs<ListItemProps>({})`
    border-left: 0.25rem solid;
    border-left-color: ${({ isActive, theme }) => isActive ? theme.colors.primary : `transparent`}

    span:last-child {
      margin-right: .25rem;
    }

    ${({ divider, theme }) => {
        if (divider) {
            return `
                margin-top: 2rem;
                position: relative;

                :before {
                    border-top: 1px solid ${theme.colors.stroke};
                    content: "";
                    height: 1px;
                    left: 1.25rem;
                    position: absolute;
                    top: -1rem;
                    width: calc(100% - 2.5rem);
                }`;
        }

        return ``;
    }
}`;

ListItem.defaultProps = {
    theme: {
        colors: {
            stroke: '#FFFFFF',
        },
    },
};

export const ItemLabel = styled.span`
    flex-basis: 90%;
    flex-grow: 0;
    margin-left: .75rem;
`;

export const FooterLabel = styled.span`
    flex-grow: 0;
`;

export const HelpLabel = styled.span`
    flex-grow: 0;
    margin-left: .75rem;
`;

export const StyledMenuItems = styled.ul`
    font-size: ${({ theme }) => theme.typography.fontSize.small};
    list-style-type: none;
    margin: 0;
    overflow-y: auto;
    padding: 0;
    vertical-align: top;
`;

StyledMenuItems.defaultProps = {
    theme: {
        typography: {
            fontSize: {
                small: '12px',
            },
        },
    },
};

export const StyledExternalLink = styled.div`
    color: ${({ theme }) => theme.colors.guideText};
    display: inline-block;
    line-height: 1rem;
    margin: 0.25rem 0 0 0.25rem;
`;

StyledExternalLink.defaultProps = {
    theme: {
        colors: {
            guideText: '#FFFFFF',
        },
    },
};

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
    if (collapsed === true) {
        return `
            left: 3rem;
            background: ${theme.colors.primary};
            border: 1px solid ${theme.colors.primary};
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
    } else if (collapsed === false) {
        return `
            right: 1rem;
            background: ${theme.colors.empty};
            border: 1px solid ${theme.colors.stroke};
            animation: ${fadeBtnOut} 250ms linear;
        `;
    } else {
        return `
            right: 1rem;
            background: ${theme.colors.empty};
            border: 1px solid ${theme.colors.stroke};
        `;
    }

    return `
        right: 1rem;
        background: ${theme.colors.empty};
    `;
};

export const CollapseButton = styled.button.attrs<CollapsedProps>({})`
    position: absolute;
    bottom: 1.5rem;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
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

CollapseButton.defaultProps = {
    theme: {
        colors: {
            brandPrimary: '#FFFFFF',
            empty: '#FFFFFF',
            primaryText: '#FFFFFF',
            secondaryText: '#FFFFFF',
            selectedBackground: '#FFFFFF',
            stroke: '#FFFFFF',
        },
        elevation: {
            raised: '0 1px 6px rgba(48, 53, 64, 0.2)',
        },
        typography: {
            fontWeight: {
                thin: '600',
            },
        },
    },
};

interface StyledStatusProps {
    status: string;
}

export const StyledStatus = styled.div.attrs<StyledStatusProps>({})`
  background: ${({ theme }) => theme.colors.empty};
  font-size: ${({ theme }) => theme.typography.fontSize.smallest};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  border: 1px solid;
  border-radius: 2px;
  display: inline-block;
  box-sizing: border-box;
  padding: 0 .5rem;
  height: 1.25rem;
  line-height: calc(1.25rem - 2px);

  ${({ status, theme }) => {
        if (status === 'ACTIVE THEME') {
            return `
        color: ${theme.colors.success};
        border: 1px solid ${theme.colors.success};
      `;
        } else {
            return `
        color: ${theme.colors.secondaryText};
        border: 1px solid ${theme.colors.guideText};
      `;
        }
    }}
`;

StyledStatus.defaultProps = {
    theme: {
        colors: {
            empty: '#FFFFFF',
            guideText: '#FFFFFF',
            secondaryText: '#FFFFFF',
            success: '#FFFFFF',
        },
        typography: {
            fontSize: {
                smallest: '12px',
            },
            fontWeight: {
                bold: '600',
            },
        },
    },
};
