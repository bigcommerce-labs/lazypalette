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

import { appRoutes } from '../Routes/Routes';

import { Collapsed } from './constants';
import DesignSubMenu from './DesignSubMenu';

import { CollapseButton, Container, StyledSideMenu } from './styles';

interface SideMenuProps extends RouteComponentProps<{}> {
    isChanged: boolean;
    themeDesignSections: string[];
    settings: {[key: string]: string | boolean | number};
    themeId: string;
    themeName: string;
    configurationId: string;
    variationId: string;
    versionId: string;
    postThemeConfigData(configDataOption: ConfigUpdateAction): Dispatch<State>;
    themeConfigReset(): ThemeConfigResetAction;
}

interface SideMenuState {
    collapsed: string;
}

export class SideMenu extends PureComponent<SideMenuProps, SideMenuState> {
    readonly state: SideMenuState = { collapsed: Collapsed.Initial };

    handleSave = () => {
        this.props.postThemeConfigData(ConfigUpdateAction.SAVE);
    };

    handleCollapse = () => this.setState(({collapsed}) => ({
        collapsed: `${Collapsed.Yes}`.includes(collapsed) ? Collapsed.No : Collapsed.Yes,
    }));

    render() {
        const {
            isChanged,
            themeDesignSections,
            themeName,
            themeConfigReset: resetTheme,
        } = this.props;
        const { home } = appRoutes;
        const { collapsed } = this.state;
        const isLoaded = themeDesignSections.length > 0;

        return (
            <Container>
                <StyledSideMenu collapsed={collapsed}>
                    {isLoaded &&
                        <Route
                            path={home.path}
                            render={({ match }) => (
                                <DesignSubMenu
                                    currentPath={match.path}
                                    handleSave={this.handleSave}
                                    isChanged={isChanged}
                                    resetTheme={resetTheme}
                                    sections={themeDesignSections}
                                    themeName={themeName}
                                />
                            )}
                        />}
                </StyledSideMenu>
                <CollapseButton
                    collapsed={collapsed}
                    onClick={this.handleCollapse}
                />
            </Container>
        );
    }
}

const mapStateToProps = ({ theme }: State) => ({
    configurationId: theme.configurationId,
    isChanged: theme.isChanged,
    settings: theme.settings,
    themeDesignSections: theme.schema.map(({ name }) => name),
    themeId: theme.themeId,
    themeName: theme.themeName,
    variationId: theme.variationId,
    versionId: theme.versionId,
});

const mapDispatchToProps = {
    postThemeConfigData,
    themeConfigReset,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SideMenu));
