import React from 'react';
import styled from 'styled-components';

const StyledPreviewPane = styled.div`
  background: #FFFFFF;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  flex: auto;
  height: 100%;
`;

const PreviewPane = () => <StyledPreviewPane />;

export default PreviewPane;
