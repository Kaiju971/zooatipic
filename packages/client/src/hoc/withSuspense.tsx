import React, { ReactElement, Suspense } from 'react';
import LazyLoading from '../routeLoader';

const withSuspense = (
  Component: React.FunctionComponent<any>,
): ReactElement => (
  <Suspense fallback={<LazyLoading />}>
    <Component />
  </Suspense>
);

export default withSuspense;
