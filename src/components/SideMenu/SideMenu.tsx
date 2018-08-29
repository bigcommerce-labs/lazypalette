import { Icon } from 'pattern-lab';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, RouteComponentProps } from 'react-router-dom';
import { Dispatch } from 'redux';

import { ConfigUpdateAction } from '../../actions/constants';
import { postThemeConfigData } from '../../actions/theme';
import { State } from '../../reducers/reducers';
import MoreOptions from '../MoreOptions/MoreOptions';
import { appRoutes } from '../Routes/Routes';
import ThemeHistory from '../ThemeHistory/ThemeHistory';
import ThemeSettings from '../ThemeSettings/ThemeSettings';
import ThemeVariations from '../ThemeVariations/ThemeVariations';

import { Collapsed, Tips } from './constants';
import DesignSubMenu from './DesignSubMenu';

import {
    CollapseButton,
    Container,
    ExternalNavItem,
    Footer,
    Header,
    ItemLabel,
    MenuContents,
    StyledMenuItemIcon,
    StyledStatus,
    Title,
    ToolTip,
} from './styles';

interface SideMenuProps extends RouteComponentProps<{}> {
    isCurrent: boolean;
    isPurchased: boolean;
    themeDesignSections: string[];
    settings: {[key: string]: string | boolean | number};
    themeId: string;
    themeName: string;
    configurationId: string;
    variationId: string;
    versionId: string;
    postThemeConfigData(configDataOption: ConfigUpdateAction): Dispatch<State>;
}

interface SideMenuState {
    collapsed: string;
}

const ExpandMenuRoutes = ({ route }: { route: string }) => {
    const { history, options, section, styles } = appRoutes;
    const position = { x: 248, y: 104 };

    switch (route) {
        case styles.route:
            return <ThemeVariations position={position} />;
        case history.route:
            return <ThemeHistory position={position} />;
        case options.route:
            return <MoreOptions position={position} />;
    }

    if (route.indexOf(section.route) === 0) {
        return <ThemeSettings position={position} settingsIndex={parseInt(route.split('/')[1], 10)}/>;
    }

    return null;
};

export class SideMenu extends PureComponent<SideMenuProps, SideMenuState> {
    readonly state: SideMenuState = {
        collapsed: Collapsed.Initial,
    };

    handleCollapse = () => this.setState(({collapsed}) => ({
        collapsed: `${Collapsed.Yes}`.includes(collapsed) ? Collapsed.No : Collapsed.Yes,
    }));

    editorThemeStatus = () => {
        const { isCurrent, isPurchased } = this.props;
        if (!isPurchased) {
            return 'THEME PREVIEW';
        } else if (!isCurrent) {
            return 'INACTIVE THEME';
        } else {
            return 'ACTIVE THEME';
        }
    };

    render() {
        const {
            themeDesignSections,
            themeName,
        } = this.props;
        const { home } = appRoutes;
        const { collapsed } = this.state;
        const isLoaded = themeDesignSections.length > 0;
        const status = this.editorThemeStatus();

        return (
            <>
                <ExpandMenuRoutes route={`${appRoutes.styles.route}`}/>
                <ExpandMenuRoutes route={`${appRoutes.history.route}`}/>
                <ExpandMenuRoutes route={`${appRoutes.options.route}`}/>
                {this.props.themeDesignSections.map((name, index) => (
                    <ExpandMenuRoutes key={index} route={`${appRoutes.section.route}${index}`}/>
                ))}

                <Container collapsed={collapsed}>
                    <Header>
                        <Title>
                            {themeName}
                        </Title>
                        <StyledStatus status={status}>
                            {status}
                        </StyledStatus>
                    </Header>
                    <MenuContents>
                        {isLoaded &&
                            <Route
                                path={home.path}
                                render={({ match }) => (
                                    <DesignSubMenu
                                        currentPath={match.path}
                                        sections={themeDesignSections}
                                    />
                                )}
                            />}
                    </MenuContents>
                    <Footer>
                        <ExternalNavItem
                            href=""
                        >
                            <ItemLabel>
                                View store
                            </ItemLabel>
                            <StyledMenuItemIcon>
                                <Icon glyph="externalLink" size="small" />
                            </StyledMenuItemIcon>
                        </ExternalNavItem>
                        <CollapseButton
                            collapsed={collapsed}
                            onClick={this.handleCollapse}
                        >
                            <ToolTip
                                collapsed={collapsed}
                                primaryTip={Tips.Primary}
                                secondaryTip={Tips.Secondary}
                            />
                        </CollapseButton>
                    </Footer>
                </Container>
            </>
        );
    }
}

const mapStateToProps = ({ theme, merchant }: State) => ({
    configurationId: theme.configurationId,
    isCurrent: merchant.isCurrent,
    isPurchased: theme.isPurchased,
    settings: theme.settings,
    themeDesignSections: theme.schema.map(({ name }) => name),
    themeId: theme.themeId,
    themeName: theme.themeName,
    variationId: theme.variationId,
    versionId: theme.versionId,
});

const mapDispatchToProps = {
    postThemeConfigData,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SideMenu));
