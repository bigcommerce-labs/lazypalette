import { BCPrimaryLogo } from 'pattern-lab';
import React, { Component } from 'react';
import { connect, Dispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

import { ConfigUpdateAction } from '../../actions/constants';
import { viewportChange, ViewportChange } from '../../actions/previewPane';
import { postThemeConfigData } from '../../actions/theme';
import { State } from '../../reducers/reducers';
import { ThemeVariations, ThemeVariationsEntry } from '../../reducers/theme';
import { trackPublish } from '../../services/analytics';

import { VIEWPORT_TYPES } from '../PreviewPane/constants';
import { ViewportType } from '../PreviewPane/PreviewPane';
import PubShareBox from '../PubShareBox/PubShareBox';

import { BCLogo, StyledHeaderMenu, StyledIcon } from './styles';

interface HeaderMenuProps {
    configurationId: string;
    displayVersion: string;
    isRotated: boolean;
    themeName: string;
    variationName: string;
    variations: ThemeVariations;
    viewportType: ViewportType;
    postThemeConfigData(configDataOption: ConfigUpdateAction): void;
    toggleViewport(payload: ViewportChange): void;
}

interface HeaderState {
    canPublish: boolean;
}

class HeaderMenu extends Component <HeaderMenuProps, HeaderState> {

    readonly state: HeaderState = {
        canPublish: false,
    };

    handlePublish = () => {
        const { configurationId, themeName, variationName, displayVersion } = this.props;
        const themeDetails = `${themeName} ${variationName} v${displayVersion}`;
        const status =  confirm(`Do you want to apply “${themeDetails}” to your store?`);

        if (status) {
            trackPublish(configurationId);
            this.props.postThemeConfigData(ConfigUpdateAction.PUBLISH);
        }
    };

    componentDidUpdate(prevProps: HeaderMenuProps) {
        let canPublish = false;
        const { configurationId, variations } = this.props;

        const currentVariation = this.props.variations.filter((variation: ThemeVariationsEntry) => {
            return variation.isCurrent;
        });

        if (variations.length > 0) {
            if (currentVariation.length > 0) {
                canPublish = currentVariation[0].configurationId !== configurationId;
            } else {
                canPublish = true;
            }
        }
        if (canPublish !== this.state.canPublish) {
            this.setState({canPublish});
        }
    }

    render() {
        const { isRotated, toggleViewport, viewportType } = this.props;

        return (
            <StyledHeaderMenu>
                <BCLogo>
                    <BCPrimaryLogo />
                </BCLogo>
                <StyledIcon
                    isSelected={viewportType === VIEWPORT_TYPES.DESKTOP}
                    onClick={() => toggleViewport({ viewportType: VIEWPORT_TYPES.DESKTOP })}
                    viewportType={VIEWPORT_TYPES.DESKTOP}
                />
                <StyledIcon
                    isRotated={isRotated}
                    isSelected={viewportType === VIEWPORT_TYPES.TABLET}
                    onClick={() => toggleViewport({
                        isRotated: viewportType === VIEWPORT_TYPES.TABLET ? !isRotated : isRotated,
                        viewportType: VIEWPORT_TYPES.TABLET,
                    })}
                    viewportType={VIEWPORT_TYPES.TABLET}
                />
                <StyledIcon
                    isRotated={isRotated}
                    isSelected={viewportType === VIEWPORT_TYPES.MOBILE}
                    onClick={() => toggleViewport({
                        isRotated: viewportType === VIEWPORT_TYPES.MOBILE ? !isRotated : isRotated,
                        viewportType: VIEWPORT_TYPES.MOBILE,
                    })}
                    viewportType={VIEWPORT_TYPES.MOBILE}
                />
                <PubShareBox onPublish={this.handlePublish} canPublish={this.state.canPublish}/>
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
    variations: theme.variations,
    viewportType: previewPane.viewportType,
});

const mapDispatchToProps = (dispatch: Dispatch): Partial<HeaderMenuProps> => bindActionCreators({
    postThemeConfigData,
    toggleViewport: viewportChange,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(HeaderMenu);
