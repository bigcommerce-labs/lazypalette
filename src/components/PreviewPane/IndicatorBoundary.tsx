import React, { SFC } from 'react';

import { ErrorIndicator } from '../ErrorIndicator/ErrorIndicator';

interface IndicatorBoundaryProps {
    children: JSX.Element;
    errors: Error[];
    isFetching: boolean;
    clearErrors(): void;
}

export const IndicatorBoundary: SFC = (props: IndicatorBoundaryProps): JSX.Element => {
    if (props.errors.length > 0) {
        return <ErrorIndicator errors={props.errors} clearErrors={props.clearErrors} />;
    } else {
        return props.children;
    }
};
