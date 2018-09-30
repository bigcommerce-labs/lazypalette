import styled from 'styled-components';

export const UploadButtonLabel = styled.label`
    background-color: ${({ theme }) => theme.colors.empty};
    border: 1px solid ${({ theme }) => theme.colors.primary};
    border-radius: 2px;
    box-sizing: border-box;
    color: ${({ theme }) => theme.colors.primary};
    cursor: pointer;
    display: inline-block;
    flex-shrink: 0;
    font-size: ${({ theme }) => theme.typography.fontSize.small};
    height: 2rem;
    line-height: calc(2rem - 2px);
    margin-right: 1rem;
    padding: 0 1rem;
`;

export const CheckoutImage = styled.img`
    margin: 1.25rem 0 0 0;
`;

export const CheckoutImageUploadWrapper = styled.div`
    background-color: ${({ theme }) => theme.colors.background};
    margin: 1rem 0;
    padding: 0.75rem 1rem;
`;

export const CheckoutImageInputWrapper = styled.div`
    align-items: center;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
`;

export const CheckoutImagePreviewWrapper = styled.div`
`;

export const CheckoutImageUploadError = styled.p`
    color: ${({ theme }) => theme.colors.error};
`;

export const CheckoutImageRemoveLink = styled.a`
    color: ${({ theme }) => theme.colors.primary};
    cursor: pointer;
    font-size: ${({ theme }) => theme.typography.fontSize.smaller};
`;

export const SmallText = styled.span`
    color: ${({ theme }) => theme.colors.secondaryText};
    font-size: ${({ theme }) => theme.typography.fontSize.smaller};
    line-height: 1.25rem;
`;
