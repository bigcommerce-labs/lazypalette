import styled from 'styled-components';

export const PreviewPaneContainer = styled.div`
    box-shadow: ${({ theme }) => theme.elevation.raised};
    flex: auto;
    height: 90%;
    border-radius: 4px;
    margin: 0.75rem 0.75rem 0.75rem 0;
`;

export const PreviewPaneIframe = styled.iframe.attrs({
    height: '100%',
    width: '100%',
})`
    border-radius: 4px;
    border: 0px;
`;
