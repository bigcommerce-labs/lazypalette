import styled from 'styled-components';

export const Container = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    justify-content: center;
    width: 11rem;
`;

export const HueContainer = styled.div`
    height: 1rem;
    margin-bottom: 0.5rem;
    position: relative;
    width: 100%;
`;

export const SaturationContainer = styled.div`
    height: 10rem;
    margin-bottom: 0.5rem;
    position: relative;
    width: 100%;
`;

export const EditableInputContainer = styled.div`
    display: flex;
    flex-direction: row;
    position: relative;
    width: 100%;
`;

export const HexField = styled.div`
    flex: 2;
    margin-right: 0.5rem
`;

export const RGBField = styled.div`
    flex: 1;
    margin-right: 0.5rem
`;

export const HuePointer = styled.div`
    width: 0.75rem;
    height: 0.75rem;
    box-shadow: ${({ theme }) => `0 0 0 1.5px ${theme.colors.empty}, inset 0 0 1px 1px ${theme.colors.stroke};`}
    border-radius: 50%;
    cursor: hand;
    transform: translate(-0.375rem, 0.125rem);
`;

HuePointer.defaultProps = {
    theme: {
        colors: {
            empty: '#FFFFFF',
            stroke: '#AAAAAA',
        },
    },
};

export const SaturationPointer = styled.div`
    width: 0.75rem;
    height: 0.75rem;
    box-shadow: ${({ theme }) => `0 0 0 1.5px ${theme.colors.empty}, inset 0 0 1px 1px ${theme.colors.stroke};`}
    border-radius: 50%;
    cursor: hand;
    transform: translate(-0.375rem, -0.375rem);
`;

SaturationPointer.defaultProps = {
    theme: {
        colors: {
            empty: '#FFFFFF',
            stroke: '#AAAAAA',
        },
    },
};
