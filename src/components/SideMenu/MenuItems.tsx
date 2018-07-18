import { Icon } from 'pattern-lab';
import React, { Component } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import ThemeSettings from '../ThemeSettings/ThemeSettings';
import ThemeVariations from '../ThemeVariations/ThemeVariations';

import { activeClassName, NavItem, StyledMenuItems, StyledMenuItemIcon } from './styles';

interface MenuItem {
    disabled?: boolean;
    label: string;
    path: string;
}

interface MenuItemsProps extends RouteComponentProps<{}> {
    items: MenuItem[];
    showArrows?: boolean;
    currentPath: string;
}

const ExpandMenuRoutes = ({ route }: { route: string }) => {
    if (route === 'theme') {
        return <ThemeVariations/>;
    }

    if (route.startsWith('style/')) {
        return <ThemeSettings settingsIndex={parseInt(route.split('/')[1], 10)}/>;
    }

    return null;
};

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
                {this.props.items.map(({ disabled, path, label }) => (
                    <li key={path}>
                        <ExpandMenuRoutes route={path}/>
                        <NavItem
                            to={this.toggleLink(path)}
                            exact
                            isActive={(match, location) => this.isPathActive(path)}
                            activeClassName={activeClassName}
                            disabled={disabled}>
                            {label}
                            {this.props.showArrows &&
                                <StyledMenuItemIcon>
                                    <Icon glyph="chevronRight" size="large" />
                                </StyledMenuItemIcon>
                            }
                        </NavItem>
                    </li>
                ))}
            </StyledMenuItems>
        );
    }
}

export default withRouter(MenuItems);
