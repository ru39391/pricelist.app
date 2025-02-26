import { FC } from 'react';

import ResItem from './ResItem';

import useResLinks from '../hooks/useResLinks';
import ResItemContext from '../contexts/ResItemContext';

const ResItemProvider: FC = () => {
  const {
    linkedDepts,
    linkedSubdepts,
    linkedGroups,
    linkedItems,
    existableDepts,
    existableSubdepts,
    existableGroups,
    existableItems,
    linkedDataConfig,
    resLinkHandlers
  } = useResLinks();

  return (
    <ResItemContext.Provider value={{
      linkedDepts,
      linkedSubdepts,
      linkedGroups,
      linkedItems,
      existableDepts,
      existableSubdepts,
      existableGroups,
      existableItems,
      linkedDataConfig,
      resLinkHandlers
    }}>
      <ResItem />
    </ResItemContext.Provider>
  );
};

export default ResItemProvider;
