import { theme, Icon } from 'pattern-lab';
import React, { Component } from 'react';
import Dotdotdot from 'react-dotdotdot';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { trackSectionOpen } from '../../services/analytics';

import {
    activeClassName,
    ExternalHelpItem,
    HelpLabel,
    ItemLabel,
    ListItem,
    NavItem,
    StyledExternalLink,
    StyledMenuItems,
} from './styles';

interface MenuItem {
    disabled?: boolean;
    divider?: boolean;
    externalLink?: boolean;
    label: string;
    path: string;
}

interface MenuItemsProps extends RouteComponentProps<{}> {
    items: MenuItem[];
    showArrows?: boolean;
    currentPath: string;
}

class MenuItems extends Component<MenuItemsProps, {}> {
    static defaultProps = {
        showArrows: false,
    };

    isPathActive = (path: string) => (
        this.props.location.pathname === `${this.props.currentPath}${path}`
    );

    toggleLink = (path: string) => (
        this.isPathActive(path) ? this.props.currentPath : `${this.props.currentPath}${path}`
    );

    handleClick = (label: string) => (
        trackSectionOpen(label)
    );

    render() {
        return (
            <StyledMenuItems>
                {this.props.items.map(({ disabled, divider, externalLink, path, label }) => {
                    const isActive = this.isPathActive(path);

                    return (
                        <ListItem
                            divider={divider}
                            isActive={isActive}
                            key={path}
                        >
                            {externalLink ?
                                <ExternalHelpItem
                                    href={path}
                                    target="_blank"
                                >
                                    <HelpLabel>
                                        {label}
                                    </HelpLabel>
                                    <StyledExternalLink>
                                        <Icon glyph="externalLink" size="small" />
                                    </StyledExternalLink>
                                </ExternalHelpItem>

                                : <NavItem
                                    activeClassName={activeClassName}
                                    disabled={disabled}
                                    exact
                                    isActive={(match, location) => this.isPathActive(path)}
                                    key={path}
                                    onClick={() => this.handleClick(label)}
                                    replace
                                    to={this.toggleLink(path)}
                                >
                                    <ItemLabel>
                                        <Dotdotdot clamp={2}>
                                            {label}
                                        </Dotdotdot>
                                    </ItemLabel>
                                    {this.props.showArrows &&
                                        <Icon
                                            primaryColor={isActive
                                                ? theme.colors.primaryText
                                                : theme.colors.guideText}
                                            glyph="chevronRight"
                                            size="small"
                                        />
                                    }
                                </NavItem>}
                        </ListItem>
                    );
                })}
            </StyledMenuItems>
        );
    }
}

export default withRouter(MenuItems);
