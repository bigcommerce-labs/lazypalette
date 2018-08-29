import React from 'react';

import { StyledBanner, StyledShareableLink } from './styles';

interface BannerProps {
    isDownForMaintenance: boolean;
    isPrelaunchStore: boolean;
}

const Banner = (props: BannerProps) => {
    const { isDownForMaintenance, isPrelaunchStore } = props;
    const addBanner = isDownForMaintenance || isPrelaunchStore;
    const message = isDownForMaintenance
        ? 'Store is down for maintenance'
        : isPrelaunchStore
            ? 'Store has not launched and is not publicly visible'
            : '';

    if (!addBanner) {
        return null;
    } else {
        return (
            <StyledBanner>
                {message}
                {!props.isDownForMaintenance &&
                    <StyledShareableLink>
                        Copy private store link
                    </StyledShareableLink>
                }
            </StyledBanner>
        );
    }
};

export default Banner;
