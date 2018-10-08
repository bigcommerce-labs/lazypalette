import styled, { StyledComponentClass } from 'styled-components';

export const List = styled.ul`
    padding: 0rem 1.5rem 0rem 1.5rem;
    width: 18.75rem;
    list-style: none;
    margin: 0;
`;

export const Item: StyledComponentClass<any, any> = styled.li`
    cursor: pointer;
    margin-bottom: 2rem;
`;

export const Title = styled.div`
    color: ${({ theme }) => theme.colors.secondaryText};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    font-size: ${({ theme }) => theme.typography.fontSize.small};
    margin-bottom: 0.5rem;
`;

Title.defaultProps = {
    theme: {
        colors: {
            secondaryText: '#72767F',
        },
        typography: {
            fontSize: {
                small: '16px',
            },
            fontWeight: {
                bold: 600,
            },
        },
    },
};

interface ThumbProps {
    previewPath: string;
}

export const Thumb = styled.div.attrs<ThumbProps>({})`
    background: url("${({ previewPath }: ThumbProps) => previewPath}") left top/cover no-repeat;
    height: 10rem;
    transition: all .25s cubic-bezier(.25,.46,.45,.94);

    :hover {
        transform: scale(1.1);
    }
`;

Thumb.defaultProps = {
    previewPath: '',
};

interface ThumbWrapperProps {
    isActive: boolean;
}

export const ThumbWrapper = styled.div.attrs<ThumbWrapperProps>({})`
    border: 2px solid ${({ isActive, theme }) => isActive ? theme.colors.primary : theme.colors.empty };
    height: 10rem;
    overflow: hidden;
`;

ThumbWrapper.defaultProps = {
    isActive: false,
    theme: {
        colors: {
            empty: '#FFFFFF',
            primary: '#3F69FE',
        },
    },
};

export const EntryActive = styled.div`
    background: ${({theme}) => theme.colors.success};
    border-radius: 16px;
    bottom: 0;
    display: inline-block;
    height: 1.25rem;
    left: 0.5rem;
    margin-top: -1rem;
    position: relative;
    top: 0.25rem;
    width: 1.25rem;

    :after {
        content: '';
        position: absolute;
        width: .5rem;
        height: .25rem;
        background: transparent;
        top: .3125rem;
        left: .3125rem;
        border: 2px solid ${({theme}) => theme.colors.empty};
        border-top: none;
        border-right: none;
        transform: rotate(-45deg);
    }
`;

EntryActive.defaultProps = {
    theme: {
        colors: {
            empty: '#FFFFFF',
            success: '#AAAAAA',
        },
    },
};
