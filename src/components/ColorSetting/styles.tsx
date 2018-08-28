import styled from 'styled-components';

export const Container = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

interface SelectedColorProps {
    color: string;
}
export const SelectedColor = styled.div.attrs<SelectedColorProps>({}) `
  background: ${(props: SelectedColorProps) => `${props.color}`};
  border: 1px solid ${({ theme }) => theme.colors.stroke};
  border-radius: 3px;
  box-sizing: border-box;
  cursor: pointer;
  flex-shrink: 0;
  height: 1.5rem;
  width: 1.5rem;
`;

export const ColorText = styled.div`
    color: ${({ theme }) => theme.colors.secondaryText};
    flex-grow: 1;
    font-size: ${({ theme }) => theme.typography.fontSize.smaller};
    margin-right: 0.5rem;
    text-align: right;
`;

export const Label = styled.label`
  color: ${({ theme }) => theme.colors.primaryText};
`;
