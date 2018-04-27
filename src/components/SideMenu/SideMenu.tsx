import React, { Component } from 'react';
import styled from 'styled-components';

import { colors } from '../../style-constants';

const StyledSideMenu = styled.nav`
  background-color: ${colors.app_background};
  height: 100%;
  width: 216px;
`;

class SideMenu extends Component {
  render() {
    return (
      <StyledSideMenu />
    );
  }
}

export default SideMenu;
