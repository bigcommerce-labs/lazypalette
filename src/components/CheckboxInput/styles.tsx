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
  width: 1.25rem;
  height: 1.25rem;
  top: 0;
  left: 0;
  background: ${colors.lightBrilliantBlue};
  border-radius: 2px;

  :after {
    content: '';
    position: absolute;
    width: .5rem;
    height: .25rem;
    background: transparent;
    top: .25rem;
    left: .25rem;
    border: 3px solid ${colors.white};
    border-top: none;
    border-right: none;
    transform: rotate(-45deg);
  }
`;

export const HiddenLabel = styled.label`
  padding-left: .5rem;
  line-height: 1.25rem;
  display: inline-block;
`;
