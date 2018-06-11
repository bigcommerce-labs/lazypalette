import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  padding: .3125rem;
`;

export const Select = styled.select`
  height: 2.1875rem;
  width: 100%;
  font-size: .9375rem;
  color: ${({ theme }) => theme.colors.primaryText};
  padding: .375rem 1.5625rem .375rem .5rem;
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.stroke};
  cursor: pointer;
`;
