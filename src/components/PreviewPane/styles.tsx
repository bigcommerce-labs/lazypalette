import { theme } from 'pattern-lab';
import styled from 'styled-components';

import { VIEWPORT_TYPES } from './constants';
import { ViewportType } from './PreviewPane';

export const PreviewPaneContainer = styled.div`
    background: ${({ theme: { colors } }) => colors && colors.empty};
    border-radius: 0px;
    box-shadow: ${({ theme: { elevation } }) => elevation && elevation.raised};
    display: flex;
    flex: auto;
    height: calc(100% - 6rem);
    justify-content: center;
    margin: 0.75rem 0.75rem 0 0;
    overflow: hidden;
    width: 0;
`;

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
    background-color: #F2F2F2;
    border: 0px;
    ${(props: PreviewPaneIframeProps) => {
        return `
                min-width: ${props.isRotated ? props.viewportType.viewportHeight : props.viewportType.viewportWidth};
                opacity: ${props.isFetching ? 0.5 : 1};
                `;
    }}

    ${(props: PreviewPaneIframeProps) => {
        const borderRadius = props.viewportType === VIEWPORT_TYPES.DESKTOP ? '0px' : '30px';
        let boxShadow;
        let marginBottom;
        let marginTop;
        let paddingBottom;
        let paddingLeft;
        let paddingRight;
        let paddingTop;

        switch (props.viewportType) {
            case VIEWPORT_TYPES.DESKTOP:
                boxShadow = 'none';
                marginBottom = '0px';
                marginTop = '0px';
                paddingBottom = '0px';
                paddingLeft = '0px';
                paddingRight = '0px';
                paddingTop = '0px';
                break;
            case VIEWPORT_TYPES.MOBILE:
                boxShadow = theme.elevation.raised;
                marginBottom = '3rem';
                marginTop = '3rem';
                paddingBottom = '50px';
                paddingLeft = '10px';
                paddingRight = '10px';
                paddingTop = '60px';
                break;
            case VIEWPORT_TYPES.TABLET:
                boxShadow = theme.elevation.raised;
                marginBottom = '3rem';
                marginTop = '3rem';
                paddingBottom = '50px';
                paddingLeft = '20px';
                paddingRight = '20px';
                paddingTop = '65px';
                break;
        }

        if (props.isRotated) {
            [paddingBottom, paddingLeft] = [paddingLeft, paddingBottom];
            [paddingRight, paddingTop] = [paddingTop, paddingRight];
        }

        return `
            border-radius: ${borderRadius};
            box-shadow: ${boxShadow};
            margin-bottom: ${marginBottom};
            margin-top: ${marginTop};
            max-height: calc(100% - ${paddingTop} - ${marginTop});
            padding-bottom: ${paddingBottom};
            padding-left: ${paddingLeft};
            padding-right: ${paddingRight};
            padding-top: ${paddingTop};
        `;
    }}
`;
