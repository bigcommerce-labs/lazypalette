import styled from 'styled-components';

export const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const Label = styled.label`
  color: ${({ theme }) => theme.colors.primaryText};
  white-space: nowrap;
`;

export const Input = styled.input.attrs({
    type: 'color',
})``;
