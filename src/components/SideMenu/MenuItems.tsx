import { theme, Icon } from 'pattern-lab';
import React, { Component } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { trackSectionOpen } from '../../services/analytics';

import {
    activeClassName,
    ExternalNavItem,
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
                                <ExternalNavItem
                                    href={path}
                                    target="_blank"
                                >
                                    <ItemLabel>
                                        {label}
                                    </ItemLabel>
                                    <StyledExternalLink>
                                        <Icon glyph="externalLink" size="small" />
                                    </StyledExternalLink>
                                </ExternalNavItem>

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
                                        {label}
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
