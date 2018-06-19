import styled from 'styled-components';

export const List = styled.ul`
  width: 56.25rem;
  height: 15.25rem;
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

export const Item = styled.li`
  margin: .5rem 0;
  cursor: pointer;
`;

export const Title = styled.div`
  color: ${({ theme }) => theme.colors.secondaryText};
  font-weight: ${({ theme }) => theme.typography.fontWeight.normal};
`;

interface ThumbProps {
    previewPath: string;
}

export const Thumb = styled.div`
  width: 15.5rem;
  height: 11rem;
  margin-top: .5rem;
  background: url("${({ previewPath }: ThumbProps) => previewPath}") left top/cover no-repeat;
`;
