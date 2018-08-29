import styled from 'styled-components';

interface StyledTooltipProps {
    position: { belowElement?: boolean, x: number, y: number };
}

export const StyledTooltip = styled.div.attrs<StyledTooltipProps>({
    style: ({ position }: StyledTooltipProps) => ({
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: position.belowElement ? `translateY(0.5rem)` : `translateY(-0.5rem)`,
    }),
})`
    background: ${({ theme }) => theme.colors.primaryText};
    border-radius: 4px;
    box-shadow: ${({ theme }) => theme.elevation.floating};
    color: ${({ theme }) => theme.colors.empty};
    cursor: default;
    font-size: ${({ theme }) => theme.typography.fontSize.small};
    font-weight: ${({ theme }) => theme.typography.fontWeight.thin};
    line-height: 1.5rem;
    padding: 0.5rem 1rem;
    pointer-events: auto;
    position: fixed;
    visibility: visible;
    z-index: ${({ theme }) => theme.layers.high};
}
`;

StyledTooltip.defaultProps = {
    theme: {
        colors: {
            empty: '#FFFFFF',
            primaryText: '#303540',
        },
        elevation: {
            floating: '0 2px 12px rgba(48, 53, 64, 0.2)',
        },
        layers: {
            high: 100,
        },
        typography: {
            fontSize: {
                small: '16px',
            },
            fontWeight: {
                thin: 400,
            },
        },
    },
};
