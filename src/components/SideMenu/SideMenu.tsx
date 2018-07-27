import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { withRouter, Route, RouteComponentProps } from 'react-router-dom';

import { ConfigUpdateAction } from '../../actions/constants';
import {
    postThemeConfigData,
    themeConfigReset,
    ThemeConfigResetAction,
} from '../../actions/theme';
import { State } from '../../reducers/reducers';

import DesignSubMenu from './DesignSubMenu';
import MenuItems from './MenuItems';
import SubMenu from './SubMenu';

import { StyledSideMenu } from './styles';

interface SideMenuProps extends RouteComponentProps<{}> {
    isChanged: boolean;
    themeDesignSections: string[];
    settings: {[key: string]: string & boolean & number};
    themeId: string;
    configurationId: string;
    variationId: string;
    versionId: string;
    postThemeConfigData(configDataOption: ConfigUpdateAction): Dispatch<State>;
    themeConfigReset(): ThemeConfigResetAction;
}

const items = [
    {
        disabled: false,
        label: 'Design',
        path: 'design',
    },
    {
        disabled: true,
        label: 'Pages',
        path: 'pages',
    },
    {
        disabled: true,
        label: 'Apps',
        path: 'apps',
    },
    {
        disabled: true,
        label: 'History',
        path: 'history',
    },
];

const routes = [
    {
        path: 'pages',
        submenu_title: 'Pages',
    },
    {
        path: 'apps',
        submenu_title: 'Apps',
    },
    {
        path: 'history',
        submenu_title: 'History',
    },
];

class SideMenu extends PureComponent<SideMenuProps> {
    handleSave = () => {
        this.props.postThemeConfigData(ConfigUpdateAction.SAVE);
    };

    render() {
        const { isChanged, themeDesignSections, themeConfigReset: resetTheme } = this.props;

        return (
            <StyledSideMenu>
                <Route
                    path="/"
                    exact
                    render={({ match }) => (
                        <MenuItems
                            items={items.map(({disabled, label, path}) => ({disabled, label, path}))}
                            currentPath={match.path}
                            showArrows={true}
                        />
                    )}
                />
                <Route
                    path="/design/"
                    render={({ match }) => (
                        <DesignSubMenu
                            handleSave={this.handleSave}
                            resetTheme={resetTheme}
                            isChanged={isChanged}
                            sections={themeDesignSections}
                            currentPath={match.path}
                        />
                    )}
                />
                {routes.map(route => (
                    <Route
                        key={route.path}
                        path={`/${route.path}/`}
                        render={({match}) => (
                            <SubMenu title={route.submenu_title} currentPath={match.path} showArrows={true}/>
                        )}
                    />
                ))}
            </StyledSideMenu>
        );
    }
}

const mapStateToProps = ({ theme }: State) => ({
    configurationId: theme.configurationId,
    isChanged: theme.isChanged,
    settings: theme.settings,
    themeDesignSections: theme.schema.map(({ name }) => name),
    themeId: theme.themeId,
    variationId: theme.variationId,
    versionId: theme.versionId,
});

const mapDispatchToProps = {
    postThemeConfigData,
    themeConfigReset,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SideMenu));
