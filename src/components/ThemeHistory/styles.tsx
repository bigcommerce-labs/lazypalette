import styled from 'styled-components';

export const List = styled.ul`
    cursor: pointer;
    list-style: none;
    padding: 0;
    margin: 0;
    height: 55vh;
    min-width: 25rem;
    overflow-y: auto;
    width:
`;

export const HistoryEntry = styled.li`
    margin: 1rem 1rem 2rem;
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

export const EntryDate = styled.div`
    color: ${({theme}) => theme.colors.primaryText };
    position: relative;
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold };
`;

EntryDate.defaultProps = {
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

export const EntryTitle = styled.div`
    color: ${({theme}) => theme.colors.secondaryText };
`;

EntryTitle.defaultProps = {
    theme: {
        colors: {
            secondaryText: '#FFFFFF',
        },
    },
};
