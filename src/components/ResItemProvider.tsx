import { FC } from 'react';

import ResItem from './ResItem';

import useResLinks from '../hooks/useResLinks';
import useResLinkz from '../hooks/useResLinks_';
import ResItemContext from '../contexts/ResItemContext';

import {
  TYPES,
  DEPT_KEY,
  SUBDEPT_KEY,
  GROUP_KEY,
  ITEM_KEY,
} from '../utils/constants';


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
    resLinkHandlers,
    handleDataConfig
  } = useResLinks();
  const {
    existableList,
    linkedList,
    handleListOptions
  } = useResLinkz();

  return (
    <ResItemContext.Provider value={{
      linkedItemsData: {
        linkedDepts: linkedList[TYPES[DEPT_KEY]],
        linkedSubdepts: linkedList[TYPES[SUBDEPT_KEY]],
        linkedGroups: linkedList[TYPES[GROUP_KEY]],
        linkedItems: linkedList[TYPES[ITEM_KEY]],
        existableDepts: existableList[TYPES[DEPT_KEY]],
        existableSubdepts: existableList[TYPES[SUBDEPT_KEY]],
        existableGroups: existableList[TYPES[GROUP_KEY]],
        existableItems: existableList[TYPES[ITEM_KEY]],
      },
      linkedDataConfig,
      resLinkHandlers,
      handleDataConfig,
      handleListOptions
    }}>
      <ResItem />
    </ResItemContext.Provider>
  );
};

export default ResItemProvider;
