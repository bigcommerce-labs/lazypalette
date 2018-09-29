import styled from 'styled-components';

export const ModalParagraph = styled.div`
    color: ${({ theme }) => theme.colors.primaryText};
    line-height: 1.5rem;
    font-size: ${({ theme }) => theme.typography.fontSize.small};
    margin: 0 0 1.5rem 0;

    &:last-child {
        margin: 0;
    }
`;

ModalParagraph.defaultProps = {
    theme: {
        colors: {
            primaryText: '#FFFFFF',
        },
        typography: {
            fontSize: {
                small: '12px',
            },
        },
    },
};

export const List = styled.ul`
    cursor: pointer;
    width: 20rem;
    list-style: none;
    padding: 0;
    margin: 0 1rem 0 1.5rem;
`;

export const Item = styled.li`
    color: ${({theme}) => theme.colors.primaryText};
    line-height: 1.5rem;
    margin: 0 0 .5rem 0;

    :hover {
      text-decoration: underline
    }
`;

Item.defaultProps = {
    theme: {
        colors: {
            primaryText: '#FFFFFF',
        },
    },
};

export const Link = styled.a`
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
`;

Link.defaultProps = {
    theme: {
        colors: {
            primary: '#FFFFFF',
        },
    },
};

export const ExternalLink = styled.div`
    display: inline-block;
    margin: 0 0 0 0.25rem;
    position: relative;
    top: 0.125rem;
`;
