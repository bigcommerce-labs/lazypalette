import styled from 'styled-components';

import { colors } from '../../styleConstants';

export const ImageSizeModal = styled.div`
  width: 225px;
  padding: 10px;
`;

export const SizeModal = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 12px;
`;

export const Axis = styled.div`
  width: 40%;
  position: relative;

  &:first-child:after {
    content: 'x';
    color: ${colors.primary};
    position: absolute;
    top: 37px;
    left: 106px;
  }
`;
