import styled from 'styled-components';

const StyledHeaderMenu =  styled.nav`
  flex-basis: 100%;
  margin: .75rem 0 0;
  padding: 0 0 .75rem 2rem;
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.colors.stroke};
`;

export default StyledHeaderMenu;
