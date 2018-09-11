import { theme, Icon } from 'pattern-lab';
import React from 'react';

import Tooltip from '../Tooltip/Tooltip';

import { StyledBanner, StyledIcon, StyledMessage, StyledShareablePreviewCode } from './styles';

interface BannerProps {
    isDownForMaintenance: boolean;
    isPrelaunchStore: boolean;
    previewCode: string;
}

const Banner = (props: BannerProps) => {
    const { isDownForMaintenance, isPrelaunchStore, previewCode } = props;
    const addBanner = isDownForMaintenance || isPrelaunchStore;
    const message = isDownForMaintenance
        ? 'Store is down for maintenance.'
        : isPrelaunchStore
            ? 'Store has not launched and is not publicly visible.'
            : '';

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
                {!isDownForMaintenance &&
                    <StyledShareablePreviewCode>
                        Share your site with preview code: {previewCode}
                    </StyledShareablePreviewCode>
                }
            </StyledBanner>
        );
    }
};

export default Banner;
