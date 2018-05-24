import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

import { colors } from '../../styleConstants';

const Wrapper = styled.div`
  position: relative;
  margin: 0;
`;

const fadeIn = keyframes`
  from { left: -50px;  opacity: 0.25;}
  to { left: 0; opacity: 1; }
`;

const MenuModal = styled.div`
  position: absolute;
  top: 20px
  width: 900px;
  height: 300px;
  padding: 10px;
  box-shadow: 0px 4px 10px rgba(0,0,0,0.25);
  z-index: 999;
  animation: ${fadeIn} 300ms ease-in;
`;

const NavItem = styled(Link)`
  position: absolute;
  right: 15px;
  top: 10px;
  text-decoration: none;
  text-shadow: 0 1px 0 ${colors.white};

  &:after {
    content: '✕';
  }
`;

const Header = styled.h2`
  padding: 20px 0 0 20px;
  margin: 0 0 10px;
  font-weight: 400;
  color: #333843;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  color: #919596;
`;

const Item = styled.li`
  margin: 10px 25px;
  cursor: pointer;
`;

const Title = styled.div`
  color: ${colors.midGray};
  font-weight: 400;
`;

const Thumb = styled.div`
  width: 250px;
  height: 175px;
  margin-top: 10px;
  background: url("${props => props.theme}") left top/cover no-repeat;
`;

export { Header, Item, List, MenuModal, NavItem, Thumb, Title, Wrapper };
