import React from 'react';

import { StyledBanner } from './styles';

interface BannerProps {
    message: string;
}

const Banner = (props: BannerProps) => {
    return (
        <StyledBanner>
            {props.message}
        </StyledBanner>
    );
};

export default Banner;
