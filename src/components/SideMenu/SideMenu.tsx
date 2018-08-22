import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { withRouter, Route, RouteComponentProps } from 'react-router-dom';

import { ConfigUpdateAction } from '../../actions/constants';
import { postThemeConfigData } from '../../actions/theme';
import { State } from '../../reducers/reducers';

import { appRoutes } from '../Routes/Routes';

import { Collapsed, Tips } from './constants';
import DesignSubMenu from './DesignSubMenu';

import {
    CollapseButton,
    Container,
    StyledSideMenu,
    ToolTip,
} from './styles';

interface SideMenuProps extends RouteComponentProps<{}> {
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

export class SideMenu extends PureComponent<SideMenuProps, SideMenuState> {
    readonly state: SideMenuState = { collapsed: Collapsed.Initial };

    handleCollapse = () => this.setState(({collapsed}) => ({
        collapsed: `${Collapsed.Yes}`.includes(collapsed) ? Collapsed.No : Collapsed.Yes,
    }));

    render() {
        const {
            themeDesignSections,
            themeName,
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
                                    sections={themeDesignSections}
                                    themeName={themeName}
                                />
                            )}
                        />}
                </StyledSideMenu>
                <CollapseButton
                    collapsed={collapsed}
                    onClick={this.handleCollapse}
                >
                    <ToolTip
                        key={collapsed}
                        primaryTip={Tips.Primary}
                        secondaryTip={Tips.Secondary}
                    />
                </CollapseButton>
            </Container>
        );
    }
}

const mapStateToProps = ({ theme }: State) => ({
    configurationId: theme.configurationId,
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
