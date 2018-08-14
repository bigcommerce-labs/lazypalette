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

import { StyledSideMenu } from './styles';

interface SideMenuProps extends RouteComponentProps<{}> {
    isChanged: boolean;
    themeDesignSections: string[];
    settings: {[key: string]: string & boolean & number};
    themeId: string;
    themeName: string;
    configurationId: string;
    variationId: string;
    versionId: string;
    postThemeConfigData(configDataOption: ConfigUpdateAction): Dispatch<State>;
    themeConfigReset(): ThemeConfigResetAction;
}

class SideMenu extends PureComponent<SideMenuProps> {
    handleSave = () => {
        this.props.postThemeConfigData(ConfigUpdateAction.SAVE);
    };

    render() {
        const { isChanged, themeDesignSections, themeName, themeConfigReset: resetTheme } = this.props;
        const isLoaded = themeDesignSections.length > 0;

        return (
            <StyledSideMenu>
                {isLoaded &&
                  <Route
                      path="/"
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
