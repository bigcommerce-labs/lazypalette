import { theme, Icon } from 'pattern-lab';
import React, { Component } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import {
    activeClassName,
    ExternalNavItem,
    ItemLabel,
    ListItem,
    NavItem,
    StyledMenuItems,
    StyledMenuItemIcon
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

    render() {
        return (
            <StyledMenuItems>
                {this.props.items.map(({ disabled, divider, externalLink, path, label }) => {
                    const isActive = this.isPathActive(path);

                    return (
                        <ListItem divider={divider} isActive={isActive}>
                            {externalLink ?
                                <ExternalNavItem
                                    href={path}
                                    target="_blank"
                                >
                                    <ItemLabel>
                                        {label}
                                    </ItemLabel>
                                    <StyledMenuItemIcon>
                                        <Icon glyph="externalLink" size="small" />
                                    </StyledMenuItemIcon>
                                </ExternalNavItem>

                                : <NavItem
                                    to={this.toggleLink(path)}
                                    exact
                                    key={path}
                                    isActive={(match, location) => this.isPathActive(path)}
                                    activeClassName={activeClassName}
                                    disabled={disabled}>
                                    <ItemLabel>
                                        {label}
                                    </ItemLabel>
                                    {this.props.showArrows &&
                                        <StyledMenuItemIcon>
                                            <Icon
                                                primaryColor={isActive
                                                    ? theme.colors.primaryText
                                                    : theme.colors.guideText}
                                                glyph="chevronRight"
                                                size="large"
                                            />
                                        </StyledMenuItemIcon>
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
