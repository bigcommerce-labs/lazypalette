import styled from 'styled-components';

import { colors } from '../../styleConstants';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  padding: 5px;
`;

export const Select = styled.select`
  height: 35px;
  width: 100%;
  font-size: 15px;
  color: ${colors.primary};
  padding: 6px 25px 6px 8px;
  background-color: ${colors.white};
  border: 1px solid ${colors.stroke};
  cursor: pointer;
`;
