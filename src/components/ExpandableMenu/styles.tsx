import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { theme } from 'pattern-lab';

import { colors } from '../../styleConstants';

export const Wrapper = styled.div`
  position: relative;
  margin: 0;
`;

export const fadeIn = keyframes`
  from { left: 6.25rem;  opacity: 0.25;}
  to { left: 10.625rem; opacity: 1; }
`;

export const ExpandModal = styled.div`
  position: absolute;
  left: 10.625rem;
  background: ${colors.white};
  padding: .625rem;
  box-shadow: ${theme.elevation.raised};
  z-index: 999;
  animation: ${fadeIn} 300ms ease-in;
  overflow: scroll;
`;

export const NavItem = styled(Link)`
  position: absolute;
  right: .9375rem;
  top: .625rem;
  text-decoration: none;
  text-shadow: 0 1px 0 ${colors.white};

  &:after {
    content: '✕';
  }
`;

export const Header = styled.h2`
  padding: 1.25rem 0 0 1.25rem;
  margin: 0 0 .625rem;
  font-weight: 400;
  color: #333843;
`;
