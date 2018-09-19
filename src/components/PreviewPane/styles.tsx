import styled from 'styled-components';

import { VIEWPORT_TYPES } from './constants';
import { ViewportType } from './PreviewPane';

interface PreviewPaneContainerProps {
    showBorder: boolean;
}

export const PreviewPaneContainer = styled.div.attrs<PreviewPaneContainerProps>({})`
    display: flex;
    flex: auto;
    justify-content: center;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    width: 0;

    ${({ showBorder, theme }) => {
        if (showBorder) {
            return `
                background: ${theme.colors.empty};
                border-radius: 8px;
                box-shadow: ${theme.elevation.raised};
                margin: 1.5rem 0.75rem 1.5rem 0;
            `;
        } else {
            return `
                margin: 1.5rem 0.75rem 0 0;
            `;
        }
    }}
`;

PreviewPaneContainer.defaultProps = {
    theme: {
        colors: {
            empty: '#FFFFFF',
        },
        elevation: {
            raised: 100,
        },
    },
};

interface PreviewPaneIframeProps {
    isFetching: boolean;
    isRotated: boolean;
    viewportType: ViewportType;
}

export const PreviewPaneIframe = styled.iframe.attrs<PreviewPaneIframeProps>({
    height: (props: PreviewPaneIframeProps) =>
        props.isRotated
            ? props.viewportType.viewportWidth
            : props.viewportType.viewportHeight,
    width: (props: PreviewPaneIframeProps) =>
        props.isRotated
            ? props.viewportType.viewportHeight
            : props.viewportType.viewportWidth,
})`
    ${({ isFetching, isRotated, theme, viewportType }) => {
        const borderRadius = viewportType === VIEWPORT_TYPES.DESKTOP ? '0px' : '30px';
        let boxShadow;
        let paddingBottom;
        let paddingLeft;
        let paddingRight;
        let paddingTop;

        switch (viewportType) {
            case VIEWPORT_TYPES.DESKTOP:
                boxShadow = 'none';
                paddingBottom = '0px';
                paddingLeft = '0px';
                paddingRight = '0px';
                paddingTop = '0px';
                break;
            case VIEWPORT_TYPES.MOBILE:
                boxShadow = theme.elevation.raised;
                paddingBottom = '50px';
                paddingLeft = '10px';
                paddingRight = '10px';
                paddingTop = '60px';
                break;
            case VIEWPORT_TYPES.TABLET:
                boxShadow = theme.elevation.raised;
                paddingBottom = '50px';
                paddingLeft = '20px';
                paddingRight = '20px';
                paddingTop = '65px';
                break;
        }

        if (isRotated) {
            [paddingBottom, paddingLeft] = [paddingLeft, paddingBottom];
            [paddingRight, paddingTop] = [paddingTop, paddingRight];
        }

        return `
            background-color: ${viewportType === VIEWPORT_TYPES.DESKTOP ? theme.colors.empty : theme.colors.stroke}
            border: 0px;
            border-radius: ${borderRadius};
            box-shadow: ${boxShadow};
            max-height: calc(100% - ${paddingTop});
            min-width: ${isRotated ? viewportType.viewportHeight : viewportType.viewportWidth};
            opacity: ${isFetching ? 0.5 : 1};
            padding: ${paddingTop} ${paddingRight} ${paddingBottom} ${paddingLeft};
            overflow: scroll;
            -webkit-overflow-scrolling: touch;
        `;
    }}
`;

PreviewPaneIframe.defaultProps = {
    theme: {
        colors: {
            empty: '#FFFFFF',
            stroke: '#CFD6E5',
        },
        elevation: {
            raised: '0 1px 6px rgba(48, 53, 64, 0.2)',
        },
    },
};
