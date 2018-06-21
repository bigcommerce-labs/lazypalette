import styled from 'styled-components';

export const ImageSizeModal = styled.div`
  padding: .5rem;
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
    color: ${({ theme }) => theme.colors.primaryText};
    position: absolute;
    top: 2.5rem;
    left: 10.25rem;
  }
`;
