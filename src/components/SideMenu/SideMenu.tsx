import { theme as patternLabTheme, Icon } from 'pattern-lab';
import React, { PureComponent } from 'react';
import { BulletList } from 'react-content-loader';
import Dotdotdot from 'react-dotdotdot';

import { connect } from 'react-redux';
import { withRouter, Route, RouteComponentProps } from 'react-router-dom';
import { Dispatch } from 'redux';

import { ConfigUpdateAction } from '../../actions/constants';
import { StoreFeatures } from '../../actions/merchant';
import { collapseSideMenu, CollapseSideMenuAction } from '../../actions/sideMenu';
import { postThemeConfigData } from '../../actions/theme';
import { State } from '../../reducers/reducers';
import { ThemeSchema, ThemeSchemaEntry } from '../../reducers/theme';
import { trackCollapseSideMenu, trackViewLiveStore } from '../../services/analytics';
import MoreOptions from '../MoreOptions/MoreOptions';
import { appRoutes } from '../Routes/Routes';
import ThemeHistory from '../ThemeHistory/ThemeHistory';
import ThemeSettings from '../ThemeSettings/ThemeSettings';
import ThemeVariations from '../ThemeVariations/ThemeVariations';
import Tooltip from '../Tooltip/Tooltip';

import { ThemeStatus, Tips } from './constants';
import DesignSubMenu from './DesignSubMenu';

import {
    CollapseButton,
    Container,
    ExternalNavItem,
    Footer,
    FooterLabel,
    Header,
    HiddenTitle,
    MenuContents,
    SideMenuLoadingContainer,
    StyledExternalLiveStore,
    StyledStatus,
    Title,
    TitleTooltip
} from './styles';

interface SideMenuProps extends RouteComponentProps<{}> {
    activeThemeId: string;
    collapsed?: boolean;
    isPurchased: boolean;
    features: StoreFeatures;
    queryParams: string;
    themeDesignSections: ThemeSchema;
    settings: {[key: string]: string | boolean | number};
    themeId: string;
    themeName: string;
    configurationId: string;
    variationId: string;
    versionId: string;
    collapseSideMenu(collapsed: boolean): CollapseSideMenuAction;
    postThemeConfigData(configDataOption: ConfigUpdateAction): Dispatch<State>;
}

interface SideMenuState {
    longTitle: boolean;
    showTooltip: boolean;
    titleRendered: boolean;
}

const ExpandMenuRoutes = ({ route }: { route: string }) => {
    const { history, options, section, styles } = appRoutes;

    switch (route) {
        case styles.route:
            return <ThemeVariations />;
        case history.route:
            return <ThemeHistory />;
        case options.route:
            return <MoreOptions />;
    }

    if (route.indexOf(section.route) === 0) {
        return <ThemeSettings settingsIndex={parseInt(route.split('/')[1], 10)}/>;
    }

    return null;
};

export class SideMenu extends PureComponent<SideMenuProps, SideMenuState> {
    readonly state: SideMenuState = {
        longTitle: false,
        showTooltip: false,
        titleRendered: false,
    };

    titleRef = React.createRef<any>();

    handleCollapse = () => {
        const collapsed = this.props.collapsed !== true;
        this.props.collapseSideMenu(collapsed);
        trackCollapseSideMenu(collapsed);
    };

    editorThemeStatus = () => {
        const { activeThemeId, isPurchased, themeId } = this.props;

        if (!isPurchased) {
            return ThemeStatus.preview;
        } else if (activeThemeId !== themeId) {
            return ThemeStatus.inactive;
        } else {
            return ThemeStatus.active;
        }
    };

    checkTitleLength = () => {
        const longHeight = 16 * 2 * 3; // 16 px rem size * 2 rem line height * 3 lines
        if (this.titleRef.current && this.props.themeName) {
            const { height } = this.titleRef.current.getBoundingClientRect();
            this.setState({ longTitle: (height > longHeight), titleRendered: true });
        }
    };

    componentDidMount() {
        this.checkTitleLength();
    }

    componentDidUpdate() {
        this.checkTitleLength();
    }

    render() {
        const {
            collapsed,
            isPurchased,
            themeDesignSections,
            themeName,
        } = this.props;
        const { home } = appRoutes;
        const { longTitle, titleRendered } = this.state;
        const isLoaded = themeDesignSections.length > 0;
        const status = this.editorThemeStatus();

        const visibleThemeDesignSections = themeDesignSections.map((section, index) => ({...section, index}))
            .filter(this.isSectionVisible);

        return (
            <>
                <ExpandMenuRoutes route={`${appRoutes.styles.route}`}/>
                <ExpandMenuRoutes route={`${appRoutes.history.route}`}/>
                <ExpandMenuRoutes route={`${appRoutes.options.route}`}/>
                {visibleThemeDesignSections.map(({name, index}) => (
                    <ExpandMenuRoutes key={index} route={`${appRoutes.section.route}${index}`}/>
                ))}

                <Container collapsed={collapsed}>
                    <Header>
                        {!isLoaded &&
                            <BulletList
                                primaryColor={patternLabTheme.colors.backgroundHover}
                                secondaryColor={patternLabTheme.colors.stroke}
                                width={200}
                                height={60}
                            />}

                        {titleRendered
                            ? <Tooltip message={longTitle ? <TitleTooltip>{themeName}</TitleTooltip> : undefined}>
                                <Title
                                    longTitle={longTitle}
                                >
                                    <Dotdotdot clamp={longTitle ? 4 : 3}>
                                        {themeName}
                                    </Dotdotdot>
                                </Title>
                            </Tooltip>
                            : <HiddenTitle innerRef={this.titleRef}>
                                {themeName}
                            </HiddenTitle>
                        }

                        {isLoaded &&
                            <Tooltip clickable={true} message={status.tooltip}>
                                <StyledStatus status={status.label}>
                                    {status.label}
                                </StyledStatus>
                            </Tooltip>
                        }
                    </Header>
                    <MenuContents>
                        {!isLoaded &&
                            <SideMenuLoadingContainer>
                                <BulletList
                                    primaryColor={patternLabTheme.colors.backgroundHover}
                                    secondaryColor={patternLabTheme.colors.stroke}
                                    width={200}
                                    height={200}
                                />
                            </SideMenuLoadingContainer>}

                        {isLoaded &&
                            <Route
                                path={home.path}
                                render={({ match }) => (
                                    <DesignSubMenu
                                        currentPath={match.path}
                                        isPreview={!isPurchased}
                                        sections={visibleThemeDesignSections}
                                    />
                                )}
                            />}
                    </MenuContents>
                    <Footer>
                        <ExternalNavItem onClick={trackViewLiveStore}
                            href="/"
                            target="_blank"
                        >
                            <FooterLabel>
                                View live store
                            </FooterLabel>
                            <StyledExternalLiveStore>
                                <Icon glyph="externalLink" size="small" />
                            </StyledExternalLiveStore>
                        </ExternalNavItem>
                        <Tooltip
                            hideDelay={0}
                            message={collapsed ? Tips.Secondary : Tips.Primary}
                        >
                            <CollapseButton
                                collapsed={collapsed}
                                onClick={this.handleCollapse}
                            >
                            </CollapseButton>
                        </Tooltip>
                    </Footer>
                </Container>
            </>
        );
    }

    private isSectionVisible = (section: ThemeSchemaEntry) => {
        const { enable } = section;
        const { features } = this.props;

        if (enable && features && enable in features) {
            return features[enable];
        }

        return true;
    };
}

// TODO Remove queryParam after addressing the routing
// merchant.queryParam is updated when we update the location.search value.
// We have merchant.queryParam in mapStateToProps just so that it re-renders SideMenu when this value changes.

const mapStateToProps = ({ theme, merchant, sideMenu }: State) => ({
    activeThemeId: merchant.activeThemeId,
    collapsed: sideMenu.collapsed,
    configurationId: theme.configurationId,
    features: merchant.features,
    isPurchased: theme.isPurchased,
    queryParams: merchant.queryParams,
    settings: theme.settings,
    themeDesignSections: theme.schema,
    themeId: theme.themeId,
    themeName: theme.themeName,
    variationId: theme.variationId,
    versionId: theme.versionId,
});

const mapDispatchToProps = {
    collapseSideMenu,
    postThemeConfigData,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SideMenu));
