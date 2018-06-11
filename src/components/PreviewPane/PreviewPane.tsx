import React from 'react';
import styled from 'styled-components';

const StyledPreviewPane = styled.div`
  background: ${({ theme }) => theme.colors.background};
  box-shadow: ${({ theme }) => theme.elevation.raised};
  flex: auto;
  height: 100%;
`;

const PreviewPane = () => <StyledPreviewPane />;

export default PreviewPane;
