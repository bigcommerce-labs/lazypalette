import React from 'react';

import { StyledBanner, StyledShareablePreviewCode } from './styles';

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
                {message}
                {!props.isDownForMaintenance &&
                    <StyledShareablePreviewCode>
                        Share your site with preview code: {previewCode}
                    </StyledShareablePreviewCode>
                }
            </StyledBanner>
        );
    }
};

export default Banner;
