import { theme, Icon } from 'pattern-lab';
import React from 'react';
import styled from 'styled-components';

import { ViewportType } from '../PreviewPane/PreviewPane';

export const StyledHeaderMenu = styled.nav`
    background: ${({ theme: { colors } }) => colors.empty};
    flex-basis: 100%;
    padding: .75rem 0 .75rem 2rem;
    width: 100%;
    border-bottom: 1px solid ${({ theme: { colors } }) => colors.stroke};
`;

export const BCLogo = styled.div`
    display: inline-block;
`;

interface StyledHeaderSpanProps {
    isRotated: boolean;
    isSelected: boolean;
}

export const StyledHeaderSpan = styled.span`
    background-color: ${({ isSelected, theme: { colors } }) => isSelected && colors.selectedBackground};
    cursor: pointer;
    display: inline-block;
    padding: 4px;
    transform: ${(props: StyledHeaderSpanProps) => props.isRotated ? 'rotate(-90deg)' : 'none'};
    transition-duration: 0.5s;

    :first-of-type {
        margin-left: 50px;
    }
`;

interface StyledIconProps {
    isRotated?: boolean;
    isSelected: boolean;
    viewportType: ViewportType;
    onClick(): void;
}

export const StyledIcon = (props: StyledIconProps) => {
    return (
        <StyledHeaderSpan isRotated={props.isRotated || false} isSelected={props.isSelected} onClick={props.onClick}>
            <Icon
                glyph={props.viewportType.glyphName}
                primaryColor={props.isSelected ? theme.colors.primary : undefined}
                size={'larger'}
            />
        </StyledHeaderSpan>
    );
};
