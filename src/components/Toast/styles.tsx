import styled, { keyframes } from 'styled-components';

import { ToastTimeout, ToastType } from '../../actions/constants';

interface ContainerProps {
    autoDismiss?: boolean;
}

export const delayOut = keyframes`
    from { opacity: 1; }
    to { opacity: 0; top: -4rem; }
`;

const delayOutDuration = 250;

export const Container = styled.div.attrs<ContainerProps>({})`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%
    display: flex;
    opacity: 1;
    justify-content: center;
    animation: ${delayOut} ${delayOutDuration}ms linear;
    animation-delay: calc(${ToastTimeout.Duration}ms - ${delayOutDuration}ms);
    animation-fill-mode: forwards;

    ${({ autoDismiss }) => autoDismiss === false && `
        animation: none;
    `};
`;

export const slideIn = keyframes`
    from { top: -4rem; }
    to { top: .5rem; }
`;

interface ToastBoxProps {
    type?: string;
}

export const ToastBox = styled.div.attrs<ToastBoxProps>({})`
    position: relative;
    top: .5rem;
    display: flex;
    background-color: ${({ theme }) => theme.colors.primaryText};
    color: ${({ theme }) => theme.colors.empty};
    font-weight: ${({ theme }) => theme.typography.fontWeight.normal};
    font-size: .875rem;
    padding: .75rem .25rem .75rem .75rem;
    border-radius: 2px;
    box-shadow: ${({ theme }) => theme.elevation.raised};
    animation: ${slideIn} 250ms linear;

    ${({ theme, type }) => type === ToastType.Invalid && `
        background-color: ${theme.colors.error};
    `}
`;

export const CloseIcon = styled.div`
    text-decoration: none;
    cursor: pointer;
    margin-left: 1.5rem;

    :after {
        content: '✕';
        color: ${({ theme }) => theme.colors.empty};
        padding: .25rem .5rem;

        :visited, :hover, :active {
            color: ${({ theme }) => theme.colors.primaryText};
        }
    }
`;
