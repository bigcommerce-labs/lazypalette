import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import { colors } from '../../styleConstants';

export const activeClassName = 'nav-item-active';

export const BackLink = styled.div`
  color: #34343B;
  font-size: 1.5rem;
  margin-bottom: 1.875rem;
  margin-left: 1.75rem;
`;

interface NavProps {
  activeClassName: string;
}

export const NavItem = styled(NavLink)
  .attrs<NavProps>({
  activeClassName,
})`
  color: ${colors.darkBlueGray};
  display: block;
  height: 2.25rem;
  overflow: hidden;
  padding-left: .625rem;
  text-decoration: none;
  width: 9.375rem;

  &:visited {
    color: ${colors.darkBlueGray};
  }

  &.${activeClassName} {
    font-weight: 600;
    background-color: ${colors.white}
  }
`;

export const StyledSideMenu = styled.nav`
  height: 100%;
  padding-top: 1.875rem;
  width: 13.5rem;
  background: #F6F7F9;
`;

export const StyledMenuItems = styled.ul`
  font-size: .9375rem;
  line-height: 2.25rem;
  list-style-type: none;
  margin-left: 2.875rem;
  margin-top: 0;
  padding-left: 0;
  vertical-align: top;
`;
