import styled from 'styled-components';

import { colors } from '../../styleConstants';

const StyledHeaderMenu =  styled.nav`
  flex-basis: 100%;
  margin: 12px 0 0;
  padding: 0 0 12px 32px;
  width: 100%;
  border-bottom: 1px solid ${colors.darkGray};
`;

export default StyledHeaderMenu;
