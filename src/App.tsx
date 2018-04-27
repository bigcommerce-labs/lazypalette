import React, { Component } from 'react';
import styled from 'styled-components';

import HeaderMenu from './components/HeaderMenu/HeaderMenu';
import PreviewPane from './components/PreviewPane/PreviewPane';
import SideMenu from './components/SideMenu/SideMenu';

const StyledApp = styled.div`
  align-content: flex-start;
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  position: fixed;
  width: 100%;
`;

class App extends Component {
  render() {
    return (
      <StyledApp>
        <HeaderMenu />
        <SideMenu />
        <PreviewPane />
      </StyledApp>
    );
  }
}

export default App;
