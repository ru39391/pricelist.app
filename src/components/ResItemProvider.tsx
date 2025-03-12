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
    existableList,
    linkedList,
    handleListOptions,
    toggleLinkedItems
  } = useResLinkz();

  const {
    linkedDataConfig,
    handleDataConfig
  } = useResLinks();

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
      handleListOptions,
      toggleLinkedItems,


      linkedDataConfig,
      handleDataConfig,
    }}>
      <ResItem />
    </ResItemContext.Provider>
  );
};

export default ResItemProvider;
