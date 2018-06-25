import styled from 'styled-components';

export const PreviewPaneContainer = styled.div`
    background: ${({ theme }) => theme.colors.background};
    box-shadow: ${({ theme }) => theme.elevation.raised};
    flex: auto;
    height: 100%;
`;

export const PreviewPaneIframe = styled.iframe.attrs({
    height: '100%',
    width: '100%',
})``;
