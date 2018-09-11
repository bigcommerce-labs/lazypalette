import styled from 'styled-components';

export const List = styled.ul`
    cursor: pointer;
    list-style: none;
    padding: 0;
    margin: 0 1rem 0 1.5rem;
    width: 20rem;
`;

export const HistoryEntry = styled.li`
    margin: 0 0 2rem 0;
`;

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

export const EntryDescription = styled.div`
    color: ${({theme}) => theme.colors.primaryText };
    line-height: 1.5rem;
    margin: 0 0 .25rem 0;
    position: relative;
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold };
`;

EntryDescription.defaultProps = {
    theme: {
        colors: {
            primaryText: '#FFFFFF',
        },
        typography: {
            fontWeight: {
                bold: 600,
            },
        },
    },
};

export const EntryVersion = styled.div`
    color: ${({theme}) => theme.colors.secondaryText };
    line-height: 1.5rem;
`;

EntryVersion.defaultProps = {
    theme: {
        colors: {
            secondaryText: '#FFFFFF',
        },
    },
};
