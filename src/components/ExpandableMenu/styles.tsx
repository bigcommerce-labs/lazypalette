import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

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
  background: ${({ theme }) => theme.colors.background};
  padding: .625rem;
  box-shadow: ${({ theme }) => theme.elevation.raised};
  z-index: 999;
  animation: ${fadeIn} 300ms ease-in;
  overflow: auto;
`;

export const NavItem = styled(Link)`
  position: absolute;
  right: .9375rem;
  top: .625rem;
  text-decoration: none;
  text-shadow: 0 1px 0 ${({ theme }) => theme.colors.background};

  &:after {
    content: '✕';
  }
`;

export const Header = styled.h2`
  padding: 1.25rem 0 0 1.25rem;
  margin: 0 0 .625rem;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.secondaryText};
`;
