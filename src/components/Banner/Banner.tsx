import clipboardCopy from 'clipboard-copy';
import { theme, Icon } from 'pattern-lab';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { HeaderMenuMessages } from '../HeaderMenu/constants';
import ConfirmModal from '../Modal/ConfirmModal/ConfirmModal';
import Tooltip from '../Tooltip/Tooltip';

import { ToastType } from '../../actions/constants';
import { State } from '../../reducers/reducers';
import { trackCopyPrivateLink } from '../../services/analytics';

import {
    BannerLinks,
    CopyButtonText,
    CopyMessage,
    MaintenanceMessage,
    PrelaunchMessage,
    TooltipEnd,
    TooltipLead,
    TooltipLink,
} from './constants';
import { StyledBanner, StyledIcon, StyledLink, StyledMessage, StyledShareableLink } from './styles';

interface BannerProps {
    isChanged: boolean;
    isDownForMaintenance: boolean;
    isPrelaunchStore: boolean;
    previewCode: string;
    shopPath: string;
    createNotification(autoDismiss: boolean, message: string, type: string): Dispatch<State>;
}

interface BannerState {
    isUnsavedOpen: boolean;
}

export class Banner extends PureComponent<BannerProps> {
    readonly state: BannerState = {
        isUnsavedOpen: false,
    };

    handleLinkClick = () => {
        const { isChanged } = this.props;

        if (isChanged) {
            this.setState({ isUnsavedOpen: true });
        } else {
            this.handleModalLink();
        }
    };

    handleShareableClick = () => {
        const { createNotification, previewCode, shopPath } = this.props;

        trackCopyPrivateLink(CopyButtonText);
        clipboardCopy(`${shopPath}/?guestTkn=${previewCode}`);
        createNotification(true, CopyMessage, ToastType.Success);
    };

    handleModalCancel = () => this.setState({ isUnsavedOpen: false });

    handleModalLink = () => window.location.assign(BannerLinks.GettingStarted);

    render() {
        const { isDownForMaintenance, isPrelaunchStore } = this.props;

        if (!isDownForMaintenance && !isPrelaunchStore) {
            return null;
        }

        const { isUnsavedOpen } = this.state;
        const message = isDownForMaintenance ? MaintenanceMessage : PrelaunchMessage;

        return (
            <StyledBanner>
                {message} {(!isDownForMaintenance && isPrelaunchStore) &&
                    <Tooltip
                        clickable
                        message={
                            <StyledMessage>
                                <p>{TooltipLead}</p>
                                <StyledLink onClick={this.handleLinkClick}>
                                    {TooltipLink}
                                </StyledLink>
                                <p>{TooltipEnd}</p>
                            </StyledMessage>
                        }
                    >
                        <StyledIcon>
                            <Icon
                                glyph={'help'}
                                primaryColor={theme.colors.primaryText}
                                size={'large'}
                            />
                        </StyledIcon>
                    </Tooltip>
                }
                {!isDownForMaintenance &&
                    <StyledShareableLink onClick={this.handleShareableClick}>
                        {CopyButtonText}
                    </StyledShareableLink>
                }
                {isUnsavedOpen &&
                    <ConfirmModal
                        primaryAction={this.handleModalLink}
                        primaryActionText={HeaderMenuMessages.ModalAction}
                        secondaryAction={this.handleModalCancel}
                        overlayClose={this.handleModalCancel}
                        title={HeaderMenuMessages.ModalTitle}
                    >
                        {HeaderMenuMessages.UnsavedModalBody}
                    </ConfirmModal>
                }
            </StyledBanner>
        );
    }
}

const mapStateToProps = (state: State) => ({
    isChanged: state.theme.isChanged,

});

export default connect(mapStateToProps)(Banner);
