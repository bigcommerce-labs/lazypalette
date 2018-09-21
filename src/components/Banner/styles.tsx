import styled from 'styled-components';

export const StyledBanner = styled.div`
    background-color: #FFD24D;
    text-align: center;
    width: 100%;
    line-height: 2.5rem;
    font-size: 1rem;
    font-weight: 600;
    color: #303540;
`;

export const StyledIcon = styled.span`
    span {
        margin-bottom: -5px;
    }
`;

export const StyledMessage = styled.p`
    text-align: left;

    a {
        color: ${({ theme }) => theme.colors.primary};
        display: block;
        font-weight: bold;
        margin-top: 5px;
        text-decoration: none;
    }
`;

export const StyledShareableLink = styled.button`
    background: ${({ theme }) => theme.colors.warning};
    color: ${({ theme }) => theme.colors.primaryText};
    font-size: ${({ theme }) => theme.typography.fontSize.small};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold}
    font-family: ${({ theme }) => theme.typography.fontFamily.headings};
    margin: .5rem 0 .5rem 1.25rem;
    outline: none;
    border: 1px solid;
    border-radius: 2px;
    display: inline-block;
    padding: .25rem .5rem;
    line-height: 1.375rem;
    cursor: pointer;
`;
