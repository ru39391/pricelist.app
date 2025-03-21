import { FC, Suspense, lazy } from 'react';

import Wrapper from '../components/Wrapper';

const ResItemProvider = lazy(() => import('../components/ResItemProvider'));

const Resource: FC = () => {
  return (
    <Wrapper>
      <Suspense><ResItemProvider /></Suspense>
    </Wrapper>
  )
};

export default Resource;
