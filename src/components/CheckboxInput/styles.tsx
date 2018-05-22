import styled from 'styled-components';
import { colors } from '../../styleConstants';

export const Container = styled.div`
  position: relative;
`;

export const Input = styled.input.attrs({
    type: 'checkbox',
})`
  :not(:checked) + label:after {
    opacity: 0;
  }

  :not(:checked) + label {
    background: ${colors.white};
    border: 1px solid ${colors.blueMagentaishGray};
    box-sizing: border-box;
  }
`;

export const Label = styled.label`
  cursor: pointer;
  position: absolute;
  width: 20px;
  height: 20px;
  top: 0;
  left: 0;
  background: ${colors.lightBrilliantBlue};
  border-radius: 2px;

  :after {
    content: '';
    position: absolute;
    width: 9px;
    height: 4px;
    background: transparent;
    top: 5px;
    left: 4px;
    border: 3px solid ${colors.white};
    border-top: none;
    border-right: none;
    transform: rotate(-45deg);
  }
`;

export const HiddenLabel = styled.label`
  padding: 2px 5px 2px 10px;
  display: inline-block;
`;
