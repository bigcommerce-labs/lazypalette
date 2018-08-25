import { Icon } from 'pattern-lab';
import React, { Component } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { activeClassName, ListItem, NavItem, StyledMenuItems, StyledMenuItemIcon } from './styles';

interface MenuItem {
    disabled?: boolean;
    divider?: boolean;
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
                {this.props.items.map(({ disabled, divider, path, label }) => (
                    <ListItem divider={divider}>
                        <NavItem
                            to={this.toggleLink(path)}
                            exact
                            key={path}
                            isActive={(match, location) => this.isPathActive(path)}
                            activeClassName={activeClassName}
                            disabled={disabled}>
                            <div>
                                {label}
                            </div>
                            {this.props.showArrows &&
                                <StyledMenuItemIcon>
                                    <Icon glyph="chevronRight" size="small" />
                                </StyledMenuItemIcon>
                            }
                        </NavItem>
                    </ListItem>
                ))}
            </StyledMenuItems>
        );
    }
}

export default withRouter(MenuItems);
