import React, { Component } from 'react';
import styled from 'styled-components';

const StyledHeaderMenu = styled.nav`
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
