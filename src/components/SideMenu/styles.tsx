import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import { colors } from '../../style-constants';

export const activeClassName = 'nav-item-active';

interface NavProps {
  activeClassName: string;
}

export const NavItem = styled(NavLink)
  .attrs<NavProps>({
  activeClassName,
})`
  text-decoration: none;
  display: block;
  width: 150px;
  height: 36px;
  padding-left: 10px;
  color: ${colors.menu_text};

  &:visited {
    color: ${colors.menu_text};
  }

  &.${activeClassName} {
    font-weight: 600;
    background-color: ${colors.highlight_background}
  }
`;
