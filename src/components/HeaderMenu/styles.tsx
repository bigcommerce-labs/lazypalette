import styled from 'styled-components';

import { colors } from '../../styleConstants';

const StyledHeaderMenu =  styled.nav`
  flex-basis: 100%;
  margin: .75rem 0 0;
  padding: 0 0 .75rem 2rem;
  width: 100%;
  border-bottom: 1px solid ${colors.darkGray};
`;

export default StyledHeaderMenu;
