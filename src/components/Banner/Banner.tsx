import clipboardCopy from 'clipboard-copy';
import { theme, Icon } from 'pattern-lab';
import React from 'react';
import { Dispatch } from 'redux';

import Tooltip from '../Tooltip/Tooltip';

import { ToastType } from '../../actions/constants';
import { State } from '../../reducers/reducers';
import { trackCopyPrivateLink } from '../../services/analytics';

import { CopyButtonText, CopyMessage, MaintenanceMessage, PrelaunchMessage, TooltipMessage } from './constants';
import { StyledBanner, StyledIcon, StyledMessage, StyledShareableLink } from './styles';

interface BannerProps {
    isDownForMaintenance: boolean;
    isPrelaunchStore: boolean;
    previewCode: string;
    shopPath: string;
    createNotification(autoDismiss: boolean, message: string, type: string): Dispatch<State>;
}

const Banner = (props: BannerProps) => {
    const { createNotification, isDownForMaintenance, isPrelaunchStore, previewCode, shopPath } = props;
    const addBanner = isDownForMaintenance || isPrelaunchStore;
    const message = isDownForMaintenance
        ? MaintenanceMessage
        : isPrelaunchStore
            ? PrelaunchMessage
            : '';

    const copyLink = () => {
        trackCopyPrivateLink(CopyButtonText);
        clipboardCopy(`${shopPath}/?guestTkn=${previewCode}`);
        createNotification(true, CopyMessage, ToastType.Success);
    };

    if (!addBanner) {
        return null;
    } else {
        return (
            <StyledBanner>
                {message} {(!isDownForMaintenance && isPrelaunchStore) &&
                    <Tooltip
                        clickable={true}
                        message={
                            <StyledMessage>
                                {TooltipMessage}
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
                {!props.isDownForMaintenance &&
                    <StyledShareableLink onClick={copyLink}>
                        {CopyButtonText}
                    </StyledShareableLink>
                }
            </StyledBanner>
        );
    }
};

export default Banner;
