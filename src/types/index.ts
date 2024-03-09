export type TCustomData<T> = {
  [key: string]: T;
};

export type TSubMenuData = {
  parentId: number;
  childrenIds: number[];
}

export type TResponseDefault = {
  success: boolean;
  data: TCustomData<string | number>[];
  meta: TCustomData<string | number>;
};

export type TResponseData = {
  success: boolean[];
  data: TCustomData<TCustomData<string | number>[]>;
};
