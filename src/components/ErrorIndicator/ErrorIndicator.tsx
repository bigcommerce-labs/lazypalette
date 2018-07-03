import React, { SFC } from 'react';

import ButtonInput from '../ButtonInput/ButtonInput';

import { Wrapper } from './styles';

interface ErrorIndicatorProps {
    errors: Error[];
    clearErrors(): void;
}

export const ErrorIndicator: SFC<ErrorIndicatorProps> = ({ clearErrors, errors }): JSX.Element => {
    return (
        <Wrapper>
            {errors.map(error => (
                <p key={error.toString()}>{error.toString()}</p>
            ))}
            <ButtonInput onClick={clearErrors}>
                OK
            </ButtonInput>
        </Wrapper>
    );
};
