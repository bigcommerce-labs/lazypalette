import styled from 'styled-components';

export const Container = styled.div`
  margin: 0;
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
`;
