import React, { Component } from 'react';
import styled from 'styled-components';

import { colors } from '../../style-constants';

const StyledHeaderMenu = styled.nav`
  background-color: ${colors.app_background};
  flex-basis: 100%;
  height: 75px;
  padding-bottom: 30px;
  width: 100%;
`;

class HeaderMenu extends Component {
  render() {
    return (
      <StyledHeaderMenu />
    );
  }
}

export default HeaderMenu;
