import { theme } from 'pattern-lab';
import styled from 'styled-components';

import { VIEWPORT_TYPES } from './constants';
import { ViewportType } from './PreviewPane';

export const PreviewPaneContainer = styled.div`
    border-radius: 4px;
    box-shadow: ${({ theme: { elevation } }) => elevation && elevation.raised};
    display: flex;
    flex: auto;
    height: 90%;
    justify-content: center;
    margin: 0.75rem 0.75rem 0.75rem 0;
`;

interface PreviewPaneIframeProps {
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
        const borderRadius = props.viewportType === VIEWPORT_TYPES.DESKTOP ? '4px' : '30px';
        let boxShadow;
        let marginTop;
        let paddingBottom;
        let paddingLeft;
        let paddingRight;
        let paddingTop;

        switch (props.viewportType) {
            case VIEWPORT_TYPES.DESKTOP:
                boxShadow = 'none';
                marginTop = '0px';
                paddingBottom = '0px';
                paddingLeft = '0px';
                paddingRight = '0px';
                paddingTop = '0px';
                break;
            case VIEWPORT_TYPES.MOBILE:
                boxShadow = theme.elevation.raised;
                marginTop = '50px';
                paddingBottom = '10px';
                paddingLeft = '10px';
                paddingRight = '10px';
                paddingTop = '60px';
                break;
            case VIEWPORT_TYPES.TABLET:
                boxShadow = theme.elevation.raised;
                marginTop = '50px';
                paddingBottom = '20px';
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
            margin-top: ${marginTop};
            padding-bottom: ${paddingBottom};
            padding-left: ${paddingLeft};
            padding-right: ${paddingRight};
            padding-top: ${paddingTop};
        `;
    }}
`;
