import { theme, BCPrimaryLogo, Icon } from 'pattern-lab';
import React from 'react';
import styled from 'styled-components';

import { ViewportType } from '../PreviewPane/PreviewPane';
import Tooltip from '../Tooltip/Tooltip';

export const StyledHeaderMenu = styled.nav`
    align-items: center;
    background: ${({ theme: { colors } }) => colors.empty};
    border-bottom: 1px solid ${({ theme: { colors } }) => colors.stroke};
    box-sizing: border-box;
    display: flex;
    flex-basis: 4rem;
    flex-shrink: 0;
    padding: 0 1.5rem 0 1.5rem;
`;

export const BCLogoInline = styled.div`
    cursor: pointer;
    display: inline-block;
`;

interface BCLogoProps {
    tooltip: string;
    onClick(): void;
}

export const BCLogo = (props: BCLogoProps) => (
    <Tooltip message={props.tooltip} >
        <BCLogoInline onClick={props.onClick}>
            <BCPrimaryLogo />
        </BCLogoInline>
    </Tooltip>
);

interface StyledHeaderSpanProps {
    isSelected: boolean;
}

export const StyledHeaderSpan = styled.span.attrs<StyledHeaderSpanProps>({})`
    background-color: ${({ isSelected, theme: { colors } }) => isSelected && colors.selectedBackground};
    cursor: pointer;
    display: inline-block;
    height: 2rem;
    margin-right: 0.5rem;

    :first-of-type {
        margin-left: 3.5rem
    }
`;

interface StyledPreviewItemProps {
    isRotated?: boolean;
    isSelected: boolean;
    tooltip: string;
    viewportType: ViewportType;
    onClick(): void;
}

interface StyledIconProps {
    isRotated?: boolean;
}

const StyledIcon = styled.div.attrs<StyledIconProps>({
    style: ({ isRotated }: StyledIconProps) => ({
        transform: isRotated ? 'rotate(-90deg) translate(2px,1px)' : 'none',
    }),
})`
    transform: ${(props: StyledIconProps) => props.isRotated ? 'rotate(-90deg) translate(2px,1px)' : 'none'};
    transition-duration: 0.5s;
`;

export const StyledPreviewItem = (props: StyledPreviewItemProps) => {
    return (

        <Tooltip
            message={props.tooltip}
        >
            <StyledHeaderSpan isSelected={props.isSelected} onClick={props.onClick}>
                <StyledIcon isRotated={props.isRotated || false} >
                    <Icon
                        glyph={props.viewportType.glyphName}
                        primaryColor={props.isSelected ? theme.colors.primaryText : theme.colors.primary}
                        size={'largest'}
                        data-test-id={props.viewportType.glyphName}
                    />
                </StyledIcon>
            </StyledHeaderSpan>
        </Tooltip>
    );
};
