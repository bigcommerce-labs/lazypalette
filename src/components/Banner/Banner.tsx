import clipboardCopy from 'clipboard-copy';
import { theme, Icon } from 'pattern-lab';
import React from 'react';
import { Dispatch } from 'redux';

import Tooltip from '../Tooltip/Tooltip';

import { ToastType } from '../../actions/constants';
import { State } from '../../reducers/reducers';

import { CopyMessage } from './constants';
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
        ? 'Store is down for maintenance.'
        : isPrelaunchStore
            ? 'Store has not launched and is not publicly visible.'
            : '';

    const copyLink = () => {
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
                        message={
                            <StyledMessage>
                                You must launch your store from the Getting<br/>
                                Started page in order to make it public.<br/>
                                <a href="/manage/getting-started">Go to Getting Started</a>
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
                        Copy private store link
                    </StyledShareableLink>
                }
            </StyledBanner>
        );
    }
};

export default Banner;
