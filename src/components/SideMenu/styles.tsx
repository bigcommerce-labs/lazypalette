import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import { colors } from '../../styleConstants';

const activeClassName = 'nav-item-active';

interface NavProps {
  activeClassName: string;
}

const NavItem = styled(NavLink)
  .attrs<NavProps>({
  activeClassName,
})`
  color: ${colors.darkBlueGray};
  display: block;
  height: 36px;
  overflow: hidden;
  padding-left: 10px;
  text-decoration: none;
  width: 150px;

  &:visited {
    color: ${colors.darkBlueGray};
  }

  &.${activeClassName} {
    font-weight: 600;
    background-color: ${colors.white}
  }
`;

export { activeClassName, NavItem };
