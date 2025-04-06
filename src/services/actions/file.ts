import { ID_KEY, FILE_UPLOADING_ERROR_MSG } from '../../utils/constants';
import {
  getFileUploading,
  getFileUploadingSucceed,
  getFileUploadingFailed,
  removeItems,
  resetList
} from '../slices/file-slice';
import { setFormHidden } from '../slices/form-slice';
import type { TPricelistData, TItemsArrData, TItemsArr } from '../../types';
import type { TAppThunk, TAppDispatch } from '../../services/store';

const validateFileData = (data: TPricelistData): Promise<{ isSucceed: boolean; }> => {
  const isSucceed = Object.values(data).map((item: TItemsArr) => Boolean(item)).every((item: boolean) => item);

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ isSucceed });
    }, 200);
  });
}

const validateParserData = (items: TItemsArr): Promise<{ isSucceed: boolean; arr: TItemsArr; }> => {
  const arr = items.filter(item => Boolean(item));

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ isSucceed: arr.length > 0, arr });
    }, 200);
  });
}

const handleFile = (data: TPricelistData): TAppThunk<void> => async (dispatch: TAppDispatch) => {
  dispatch(getFileUploading({ isLoading: true }));

  try {
    const { isSucceed } = await validateFileData(data);

    if(isSucceed) {
      dispatch(getFileUploadingSucceed(data));
    } else {
      dispatch(getFileUploadingFailed({ errorMsg: FILE_UPLOADING_ERROR_MSG }));
    }
  } catch(error) {
    dispatch(getFileUploadingFailed({ errorMsg: FILE_UPLOADING_ERROR_MSG }));
  } finally {
    dispatch(getFileUploading({ isLoading: false }));
  }
};

const removeFileItems = ({ type, items }: TItemsArrData): TAppThunk<void> => async (dispatch: TAppDispatch) => {
  dispatch(getFileUploading({ isLoading: true }));

  try {
    const { isSucceed, arr } = await validateParserData(items);

    if(isSucceed) {
      dispatch(removeItems({ key: type, items: arr }));
      dispatch(setFormHidden());
    } else {
      dispatch(getFileUploadingFailed({ errorMsg: FILE_UPLOADING_ERROR_MSG }));
    }
  } catch(error) {
    dispatch(getFileUploadingFailed({ errorMsg: FILE_UPLOADING_ERROR_MSG }));
  } finally {
    dispatch(getFileUploading({ isLoading: false }));
  }
};

const resetFileList = (): TAppThunk<void> => async (dispatch: TAppDispatch) => {
  dispatch(getFileUploading({ isLoading: true }));

  try {
    const { isSucceed } = await validateParserData([{ [ID_KEY]: 1 }]);

    if(isSucceed) {
      dispatch(resetList());
      dispatch(setFormHidden());
    }
  } catch(error) {
    dispatch(getFileUploadingFailed({ errorMsg: FILE_UPLOADING_ERROR_MSG }));
  } finally {
    dispatch(getFileUploading({ isLoading: false }));
  }
};

export {
  handleFile,
  removeFileItems,
  resetFileList
}
