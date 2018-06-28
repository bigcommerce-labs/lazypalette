import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

interface SelectedColorProps {
  color: string;
}

export const SelectedColor = styled.div.attrs<SelectedColorProps>({}) `
  background: ${(props: SelectedColorProps) => `${props.color}`};
  border-radius: 3px;
  height: 1.5rem;
  width: 1.5rem;
  cursor: pointer;
  margin: 1px;
  align-self: center;
  flex-shrink: 0;
  border: 1px solid ${({ theme }) => theme.colors.stroke};
`;

export const Label = styled.label`
  padding: .25rem 0;
  color: ${({ theme }) => theme.colors.primaryText};
  white-space: nowrap;
`;

export const SketchPickerModal = styled.div`
  position: absolute;
  right: 1rem;
`;
