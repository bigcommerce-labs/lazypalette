import styled from 'styled-components';
import { theme } from 'pattern-lab';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

interface SelectedColorProps {
  color: any;
}

export const SelectedColor = styled.div.attrs<SelectedColorProps>({}) `
  background: ${(props: SelectedColorProps) => `rgba(
    ${props.color.r},
    ${props.color.g},
    ${props.color.b},
    ${props.color.a}
  )`};
  border-radius: 3px;
  height: 1.5rem;
  width: 1.5rem;
  cursor: pointer;
  margin: 1px;
  align-self: center;
  flex-shrink: 0;
`;

export const Label = styled.label`
  padding: .25rem 0rem;
  color: ${theme.colors.primaryText};
  white-space: nowrap;
`;

export const SketchPickerModal = styled.div`
  position: absolute;
  right: 1rem;
`;
