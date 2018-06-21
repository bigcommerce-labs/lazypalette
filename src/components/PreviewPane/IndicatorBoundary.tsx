import React, { SFC } from 'react';
import { ErrorIndicator } from '../ErrorIndicator/ErrorIndicator';
import { LoadingIndicator } from '../LoadingIndicator/LoadingIndicator';

interface IndicatorBoundaryProps {
  children: JSX.Element;
  isError: boolean;
  isFetching: boolean;
}

export const IndicatorBoundary: SFC = (props: IndicatorBoundaryProps): JSX.Element => {
  if (props.isError) {
    return <ErrorIndicator />;
  } else if (props.isFetching) {
    return <LoadingIndicator />;
  } else {
    return props.children;
  }
};
