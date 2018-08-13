import styled from 'styled-components';

export const Content = styled.div`
    margin: 0;
    padding: 0;
    overflow: auto;
`;

export const Header = styled.h3`
    padding: 1.25rem 0 0 .5rem;
    margin: 0 0 .5rem;
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    color: ${({ theme }) => theme.colors.primaryText};
`;

Header.defaultProps = {
    theme: {
        colors: {
            primaryText: '#FFFFFF',
        },
        typography: {
            fontWeight: {
                bold: 200,
            },
        },
    },
};

interface StyledWindowProps {
    position?: { x: number, y: number };
}

export const StyledWindow = styled.div.attrs<StyledWindowProps>({})`
    position: absolute;
    background-color: ${({ theme }) => theme.colors.empty};
    padding: .5rem .75rem;
    border: 1px solid ${({ theme }) => theme.colors.guideText};
    box-shadow: ${({ theme }) => theme.elevation.raised};
    overflow: auto;
    ${({ position }) => {
        if (position) {
            return `
                left: ${position.x}px;
                top: ${position.y}px;
            `;
        }

        return ``;
    }}
`;

StyledWindow.defaultProps = {
    theme: {
        colors: {
            empty: '#FFFFFF',
            guideText: '#AAAAAA',
        },
        elevation: {
            raised: 1,
        },
    },
};
