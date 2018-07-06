import { Theme } from 'pattern-lab';
import styled, { StyledComponentClass } from 'styled-components';

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

interface ItemProps {
    isActive: boolean;
    theme: Theme;
}

const selectedBackground = ({ theme, ...props }: ItemProps) => {
    return props.isActive ? `background-color: ${theme.colors.selectedBackground}` : '';
};

export const Item: StyledComponentClass<any, any> = styled.li`
    cursor: pointer;
    padding: 0.5rem;
    ${(props: ItemProps) => selectedBackground(props)};
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
