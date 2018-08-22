import React, { PureComponent } from 'react';
import { connect, Dispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

import { ConfigUpdateAction } from '../../actions/constants';
import { viewportChange, ViewportChange } from '../../actions/previewPane';
import { postThemeConfigData, themeConfigReset, ThemeConfigResetAction } from '../../actions/theme';
import { State } from '../../reducers/reducers';
import { trackPublish } from '../../services/analytics';

import { VIEWPORT_TYPES } from '../PreviewPane/constants';
import { ViewportType } from '../PreviewPane/PreviewPane';
import PubShareBox from '../PubShareBox/PubShareBox';

import { BCLogo, StyledHeaderMenu, StyledIcon, StyledStatus } from './styles';

interface HeaderMenuProps {
    configurationId: string;
    displayVersion: string;
    isRotated: boolean;
    themeName: string;
    variationName: string;
    viewportType: ViewportType;
    postThemeConfigData(configDataOption: ConfigUpdateAction): void;
    themeConfigReset(): ThemeConfigResetAction;
    toggleViewport(payload: ViewportChange): void;
}

class HeaderMenu extends PureComponent<HeaderMenuProps> {
    handlePublish = () => {
        const { configurationId, themeName, variationName, displayVersion } = this.props;
        const themeDetails = `${themeName} ${variationName} v${displayVersion}`;
        const status =  confirm(`Do you want to apply “${themeDetails}” to your store?`);

        if (status) {
            trackPublish(configurationId);
            this.props.postThemeConfigData(ConfigUpdateAction.PUBLISH);
        }
    };

    handleSave = () => this.props.postThemeConfigData(ConfigUpdateAction.SAVE);

    handleReset = () => this.props.themeConfigReset();

    handleIconClick = (view: string) => () => {
        const { isRotated, toggleViewport, viewportType } = this.props;

        if (VIEWPORT_TYPES[view] === VIEWPORT_TYPES.DESKTOP) {
            return toggleViewport({ viewportType: VIEWPORT_TYPES.DESKTOP });
        }

        return toggleViewport({
            isRotated: viewportType === VIEWPORT_TYPES[view] ? !isRotated : isRotated,
            viewportType: VIEWPORT_TYPES[view],
        });
    };

    render() {
        const { isRotated, viewportType } = this.props;
        const [DESKTOP, MOBILE, TABLET] = Object.keys(VIEWPORT_TYPES);
        const viewportKeys = [DESKTOP, TABLET, MOBILE];

        return (
            <StyledHeaderMenu>
                <BCLogo />
                {viewportKeys.map(view => (
                    <StyledIcon
                        isRotated={VIEWPORT_TYPES[view] === VIEWPORT_TYPES.DESKTOP ? undefined : isRotated}
                        isSelected={viewportType === VIEWPORT_TYPES[view]}
                        key={view}
                        onClick={this.handleIconClick(view)}
                        viewportType={VIEWPORT_TYPES[view]}
                    />
                ))}
                <StyledStatus>{'ACTIVE THEME'}</StyledStatus>
                <PubShareBox
                    onPublish={this.handlePublish}
                    onSave={this.handleSave}
                    onReset={this.handleReset}
                />
            </StyledHeaderMenu>
        );
    }
}

const mapStateToProps = ({ theme, previewPane }: State): Partial<HeaderMenuProps> => ({
    configurationId: theme.configurationId,
    displayVersion: theme.displayVersion,
    isRotated: previewPane.isRotated,
    themeName: theme.themeName,
    variationName: theme.variationName,
    viewportType: previewPane.viewportType,
});

const mapDispatchToProps = (dispatch: Dispatch): Partial<HeaderMenuProps> => bindActionCreators({
    postThemeConfigData,
    themeConfigReset,
    toggleViewport: viewportChange,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(HeaderMenu);
