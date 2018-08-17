import { theme, BCPrimaryLogo, Icon } from 'pattern-lab';
import React from 'react';
import styled from 'styled-components';

import { ViewportType } from '../PreviewPane/PreviewPane';

export const StyledHeaderMenu = styled.nav`
    align-items: center;
    background: ${({ theme: { colors } }) => colors.empty};
    border-bottom: 1px solid ${({ theme: { colors } }) => colors.stroke};
    display: flex;
    flex-basis: 4rem;
    flex-shrink: 0;
    padding: 0 1.5rem 0 1.5rem;
`;

export const BCLogoInline = styled.div`
    display: inline-block;
`;

export const BCLogo = () => (
    <BCLogoInline>
        <BCPrimaryLogo />
    </BCLogoInline>
);

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
                data-test-id={props.viewportType.glyphName}
            />
        </StyledHeaderSpan>
    );
};
