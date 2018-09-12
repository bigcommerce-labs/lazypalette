import styled from 'styled-components';

export const ImageSizeModal = styled.div``;

export const StyledContainer = styled.div`
    background: ${({ theme }) => theme.colors.background}
    padding: 1rem 1rem 0.5rem 1rem;
    margin: 1rem 0;
`;

export const SizeModal = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const StyledImageLock = styled.div`
    margin-top: 1.75rem;
    cursor: pointer;

    span {
        height: 1.5rem;
        border-radius: 2px;
        width: 1.5rem;
        padding-top: .25rem;
        padding-bottom: .25rem;
    }

    span:hover {
        background: ${({ theme }) => theme.colors.stroke };
    }
`;

export const Axis = styled.div`;
    width: 40%;
    position: relative;
`;

export const DimensionMessage = styled.p`;
    font-size; : ${({ theme }) => theme.typography.fontSize.smaller };
    margin: .5rem 0 .25rem 0;
`;
