import styled from 'styled-components';

export const UploadButtonLabel = styled.label`
    height: 2rem;
    border-radius: 2px;
    border: 1px solid ${({ theme }) => theme.colors.primary};
    padding: 0 0.75em;
    font-size: 0.75rem;
    cursor: pointer;
    display: inline-block;
    color: ${({ theme }) => theme.colors.primary};
    margin-right: 1rem;
`;

export const CheckoutImageUploadWrapper = styled.div`
    margin: 1rem 0;
`;

export const CheckoutImageInputWrapper = styled.div`
    margin: 1rem 0;
`;

export const CheckoutImagePreviewWrapper = styled.div``;

export const CheckoutImageUploadError = styled.p`
    color: ${({ theme }) => theme.colors.error};
`;

export const CheckoutImageRemoveLink = styled.a`
    color: ${({ theme }) => theme.colors.error};
`;
