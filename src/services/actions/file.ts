import { FILE_UPLOADING_ERROR_MSG } from '../../utils/constants';
import {
  getFileUploading,
  getFileUploadingSucceed,
  getFileUploadingFailed
} from '../slices/file-slice';
import type { TCustomData } from '../../types';
import type { TAppThunk, TAppDispatch } from '../../services/store';

const handleFile = (data: TCustomData<TCustomData<string | number>[]>): TAppThunk<void> => (dispatch: TAppDispatch) => {
  const isDataValid = Object.values(data).map((item: TCustomData<string | number>[]) => Boolean(item)).every((item: boolean) => item);

  dispatch(getFileUploading());
  if(isDataValid) {
    dispatch(getFileUploadingSucceed(data));
  } else {
    dispatch(getFileUploadingFailed({ errorMsg: FILE_UPLOADING_ERROR_MSG }));
  }
};

export {
  handleFile
}
