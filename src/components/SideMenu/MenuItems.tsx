import { LocationDescriptor } from 'history';
import { theme, Icon } from 'pattern-lab';
import React, { Component } from 'react';
import Dotdotdot from 'react-dotdotdot';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { trackHelp, trackSectionOpen } from '../../services/analytics';

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

    handleSectionClick = (label: string) => (
        trackSectionOpen(label)
    );

    handleHelpClick = (label: string) => (
        trackHelp(label)
    );

    render() {
        return (
            <StyledMenuItems>
                {this.props.items.map(({ disabled, divider, externalLink, path, label }) => {
                    const isActive = this.isPathActive(path);
                    const locationDescriptor: LocationDescriptor = {
                        pathname: this.toggleLink(path),
                        search: this.props.location.search,
                    };

                    return (
                        <ListItem
                            divider={divider}
                            isActive={isActive}
                            key={path}
                        >
                            {externalLink ?
                                <ExternalHelpItem
                                    href={path}
                                    onClick={() => this.handleHelpClick(label)}
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
                                    onClick={() => this.handleSectionClick(label)}
                                    replace
                                    to={locationDescriptor}
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
