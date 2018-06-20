import styled from 'styled-components';

export const List = styled.ul`
  width: 56.25rem;
  height: 15.3125rem;
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  color: ${({ theme }) => theme.colors.secondaryText};
`;

export const Item = styled.li`
  margin: .625rem 1.5625rem;
  cursor: pointer;
`;

export const Title = styled.div`
  color: ${({ theme }) => theme.colors.secondaryText};
  font-weight: 400;
`;

interface ThumbProps {
    previewPath: string;
}

export const Thumb = styled.div`
  width: 15.625rem;
  height: 10.9375rem;
  margin-top: .625rem;
  background: url("${({ previewPath }: ThumbProps) => previewPath}") left top/cover no-repeat;
`;
