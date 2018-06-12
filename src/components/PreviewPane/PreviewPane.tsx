import React from 'react';
import styled from 'styled-components';
import { theme } from 'pattern-lab';

const StyledPreviewPane = styled.div`
  background: #FFFFFF;
  box-shadow: ${theme.elevation.raised};
  flex: auto;
  height: 100%;
`;

const PreviewPane = () => <StyledPreviewPane />;

export default PreviewPane;
