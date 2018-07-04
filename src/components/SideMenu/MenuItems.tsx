import React, { Component } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import ThemeSettings from '../ThemeSettings/ThemeSettings';
import ThemeVariations from '../ThemeVariations/ThemeVariations';

import { activeClassName, NavItem, StyledMenuItems } from './styles';

interface MenuItem {
    label: string;
    path: string;
}

interface MenuItemsProps extends RouteComponentProps<{}> {
    items: MenuItem[];
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
    isPathActive = (path: string) => (
        this.props.location.pathname === `${this.props.currentPath}${path}`
    );

    toggleLink = (path: string) => (
        this.isPathActive(path) ? this.props.currentPath : `${this.props.currentPath}${path}`
    );

    render() {
        return (
            <StyledMenuItems>
                {this.props.items.map(({ path, label }) => (
                    <li key={path}>
                        <ExpandMenuRoutes route={path}/>
                        <NavItem
                            to={this.toggleLink(path)}
                            exact
                            isActive={(match, location) => this.isPathActive(path)}
                            activeClassName={activeClassName}>
                            {label}
                        </NavItem>
                    </li>
                ))}
            </StyledMenuItems>
        );
    }
}

export default withRouter(MenuItems);
