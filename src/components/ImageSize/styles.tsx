import styled from 'styled-components';

export const ImageSizeModal = styled.div`
  width: 14.0625rem;
  padding: .625rem;
`;

export const SizeModal = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: .75rem;
`;

export const Axis = styled.div`
  width: 40%;
  position: relative;

  &:first-child:after {
    content: 'x';
    color: ${({ theme }) => theme.colors.primary};
    position: absolute;
    top: 2.3125rem;
    left: 6.625rem;
  }
`;
