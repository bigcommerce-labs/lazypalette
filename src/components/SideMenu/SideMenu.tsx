import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { withRouter, Route, RouteComponentProps } from 'react-router-dom';

import { postThemeConfigData, ThemeConfigPostData } from '../../actions/theme';
import { State } from '../../reducers/reducers';

import DesignSubMenu from './DesignSubMenu';
import MenuItems from './MenuItems';
import SubMenu from './SubMenu';

import { StyledSideMenu } from './styles';

interface SideMenuProps extends RouteComponentProps<{}> {
    themeDesignSections: string[];
    settings: {[key: string]: string & boolean & number};
    themeId: string;
    configurationId: string;
    variationId: string;
    versionId: string;
    postThemeConfigData(configData: ThemeConfigPostData): Dispatch<State>;
}

const items = [
    {
        label: 'Design',
        path: 'design',
    },
    {
        label: 'Pages',
        path: 'pages',
    },
    {
        label: 'Apps',
        path: 'apps',
    },
    {
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

class SideMenu extends Component<SideMenuProps, {}> {
    handleSave = () => {
        const configData: ThemeConfigPostData = {
            configurationId: this.props.configurationId,
            preview: false,
            publish: false,
            reset: false,
            settings: {...this.props.settings},
            themeId: this.props.themeId,
            variationId: this.props.variationId,
            versionId: this.props.versionId,
        };
        this.props.postThemeConfigData(configData);
    };

    render() {
        return (
            <StyledSideMenu>
                <Route
                    path="/"
                    exact
                    render={({ match }) => (
                        <MenuItems
                            items={items.map(({label, path}) => ({label, path}))}
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
                            sections={this.props.themeDesignSections}
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

const mapStateToProps = (state: State) => {
    return {
        configurationId: state.theme.configurationId,
        settings: state.theme.settings,
        themeDesignSections: state.theme.schema.map(({ name }) => name),
        themeId: state.theme.themeId,
        variationId: state.theme.variationId,
        versionId: state.theme.versionId,
    };
};

const mapDispatchToProps = {
    postThemeConfigData,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SideMenu));
