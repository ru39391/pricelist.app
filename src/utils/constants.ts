import type {
  TCustomData,
  // TPricelistKeys,
  // TPricelistTypes,
  THandledItemKeys
} from '../types';

const DEFAULT_DOC_TITLE = 'Управление услугами';

const CATEGORY_TITLE = 'Категория';
const NO_ITEMS_TITLE = 'Подходящих записей не найдено';
const NO_FILE_ITEMS_TITLE = 'Обновлённых записей не найдено';
const FILE_ITEMS_TITLE = 'Найдены обновлённые записи: ';
const NOT_EMPTY_CATEGORY = 'Категория содержит следующие элементы: ';
const EMPTY_CATEGORY = 'Выбранные категории не содержат услуг';

const PARSER_TITLE = 'Парсер';
const CMS_TITLE = 'К управлению сайтом';
const ADD_TITLE = 'Добавить';
const EDIT_TITLE = 'Редактировать';
const REMOVE_TITLE = 'Удалить';
const CLEAR_TITLE = 'Очистить';
const SAVE_TITLE = 'Сохранить';
const APPLY_TITLE = 'Применить обновления';
const ADD_CATEGORY_TITLE = 'Добавить раздел';
const EDIT_ITEM_TITLE = 'Изменить данные';
const NO_GROUP_TITLE = 'Без группы';

const REMOVE_CONFIRM_MSG = 'Вы действительно хотите';
const CONFIRM_MSG = 'Подтвердите выполнение действия';
const PARSER_CONFIRM_MSG = 'Удаление не затронет существующие элементы - лишь исключит позицию из обрабатываемого списка';

const FETCHING_ERROR_MSG = 'При получении списка услуг произошла ошибка';
const RESOURCES_ERROR_MSG = 'Ошибка при получении списка ресурсов';
const FILE_UPLOADING_ERROR_MSG = 'Ошибка при обработке файла';

const CREATE_ITEM_SUCCESS_MSG = 'Записи успешно созданы';
const CREATE_ITEM_WARNING_MSG = 'Не удалось сохранить некоторые записи';
const CREATE_ITEM_ERROR_MSG = 'При создании элементов произошла ошибка, повторите попытку позже';

const UPDATE_ITEM_SUCCESS_MSG = 'Записи успешно обновлены';
const UPDATE_ITEM_WARNING_MSG = 'Не удалось обновить некоторые записи';
const UPDATE_ITEM_ERROR_MSG = 'При обновлении элементов произошла ошибка, повторите попытку позже';

const REMOVE_ITEM_SUCCESS_MSG = 'Записи успешно удалены';
const REMOVE_ITEM_WARNING_MSG = 'Не удалось удалить некоторые записи';
const REMOVE_ITEM_ERROR_MSG = 'При удалении элементов произошла ошибка, повторите попытку позже';

const ACTION_ERROR_MSG = 'Передан некорректный тип обработчика';
const DATA_ERROR_MSG = 'Переданы некорректные данные: проверьте, правильно ли заполнены поля формы';

const NOT_CREATED_KEY = 'Ещё не создан';
const NOT_UPDATED_KEY = 'Обновления не производились';

const INDEX_KEY = 'index';
const ID_KEY = 'item_id';
const NAME_KEY = 'name';
const PRICE_KEY = 'price';
const DEPT_KEY = 'dept';
const SUBDEPT_KEY = 'subdept';
const GROUP_KEY = 'group';
const ROW_INDEX_KEY = 'id';

const IS_COMPLEX_ITEM_KEY = 'isComplexItem';
const IS_COMPLEX_KEY = 'isComplex';
const COMPLEX_KEY = 'complex';
const IS_VISIBLE_KEY = 'isVisible';

const CREATEDON_KEY = 'createdon';
const UPDATEDON_KEY = 'updatedon';
const QUANTITY_KEY = 'quantity';

const ITEM_KEY = 'items';
const RES_KEY = 'res';
const RESLINKS_KEY = 'reslinks';
const PARSER_KEY = 'parser';
const RES_ID_KEY = 'id';
const PARENT_KEY = 'parent';
const TEMPLATE_KEY = 'template';
const IS_PARENT_KEY = 'isParent';
const CATEGORY_KEY = 'category';
const LABEL_KEY = 'label';
const CHILDREN_KEY = 'children';

const ADD_ACTION_KEY = 'add';
const EDIT_ACTION_KEY = 'edit';
const REMOVE_ACTION_KEY = 'remove';

const CREATED_KEY = 'created';
const UPDATED_KEY = 'updated';
const REMOVED_KEY = 'removed';

const IS_COMPLEX_DATA_KEY = 'isComplexData';
const IS_GROUP_IGNORED_KEY = 'isGroupIgnored';
const IS_GROUP_USED_KEY = 'isGroupUsed';

const TITLES: TCustomData<string> = {
  [DEPT_KEY]: 'Отделения',
  [SUBDEPT_KEY]: 'Специализации',
  [GROUP_KEY]: 'Группы услуг',
  [ITEM_KEY]: 'Услуги',
  [PARENT_KEY]: 'Родительский ресурс',
  [TEMPLATE_KEY]: 'Шаблон',
  [IS_PARENT_KEY]: CATEGORY_TITLE
};

const SORT_CAPTION = 'Порядок сортировки';

const CAPTIONS: TCustomData<string> = {
  [ROW_INDEX_KEY]: '№',
  [ID_KEY]: 'ID',
  [NAME_KEY]: 'Название',
  [PRICE_KEY]: 'Цена, руб.',
  [DEPT_KEY]: 'Отделение',
  [SUBDEPT_KEY]: 'Специализация',
  [GROUP_KEY]: 'Группа',
  [IS_COMPLEX_ITEM_KEY]: 'Входит в комплекс',
  [IS_COMPLEX_KEY]: 'Комплекс услуг',
  [COMPLEX_KEY]: 'Услуги в комплексе',
  [IS_VISIBLE_KEY]: 'Показывать на сайте',
  [CREATEDON_KEY]: 'Дата создания',
  [UPDATEDON_KEY]: 'Дата обновления',
  [QUANTITY_KEY]: 'Количество',
};

const HANDLED_ITEMS_CAPTIONS: Record<THandledItemKeys, string> = {
  [CREATED_KEY]: 'Новые записи',
  [UPDATED_KEY]: 'Изменённые записи',
  [REMOVED_KEY]: 'Удалённые записи',
};

// : Record<TPricelistKeys, TPricelistTypes>
const TYPES = {
  [DEPT_KEY]: `${DEPT_KEY}s`,
  [SUBDEPT_KEY]: `${SUBDEPT_KEY}s`,
  [GROUP_KEY]: `${GROUP_KEY}s`,
  [ITEM_KEY]: 'pricelist'
} as const;

const LINKED_RES_PARAMS: TCustomData<string> = {
  [IS_COMPLEX_DATA_KEY]: 'Комплексный выбор',
  [IS_GROUP_IGNORED_KEY]: 'Игнорировать группы',
  [IS_GROUP_USED_KEY]: 'Сохранить группировку',
  [ADD_ACTION_KEY]: 'Выбрать все группы',
  [REMOVE_ACTION_KEY]: 'Отменить выбор групп'
}

const ROOT_PATH = import.meta.env.VITE_ROOT_PATH;
const SITE_URL = import.meta.env.VITE_SITE_URL;
const API_URL = import.meta.env.VITE_API_URL;
const CMS_URL = 'manager';

const PAGE_COUNTER = 15;

export {
  DEFAULT_DOC_TITLE,
  CREATE_ITEM_SUCCESS_MSG,
  CREATE_ITEM_WARNING_MSG,
  CREATE_ITEM_ERROR_MSG,
  UPDATE_ITEM_SUCCESS_MSG,
  UPDATE_ITEM_WARNING_MSG,
  UPDATE_ITEM_ERROR_MSG,
  REMOVE_ITEM_SUCCESS_MSG,
  REMOVE_ITEM_WARNING_MSG,
  REMOVE_ITEM_ERROR_MSG,
  FETCHING_ERROR_MSG,
  RESOURCES_ERROR_MSG,
  FILE_UPLOADING_ERROR_MSG,
  ACTION_ERROR_MSG,
  DATA_ERROR_MSG,
  NOT_CREATED_KEY,
  NOT_UPDATED_KEY,
  PARSER_TITLE,
  CMS_TITLE,
  ADD_TITLE,
  EDIT_TITLE,
  REMOVE_TITLE,
  CLEAR_TITLE,
  SAVE_TITLE,
  APPLY_TITLE,
  ADD_CATEGORY_TITLE,
  EDIT_ITEM_TITLE,
  NO_GROUP_TITLE,
  REMOVE_CONFIRM_MSG,
  PARSER_CONFIRM_MSG,
  CONFIRM_MSG,
  CATEGORY_TITLE,
  NO_ITEMS_TITLE,
  NO_FILE_ITEMS_TITLE,
  FILE_ITEMS_TITLE,
  NOT_EMPTY_CATEGORY,
  EMPTY_CATEGORY,
  RES_KEY,
  RESLINKS_KEY,
  PARSER_KEY,
  RES_ID_KEY,
  PARENT_KEY,
  TEMPLATE_KEY,
  IS_PARENT_KEY,
  CATEGORY_KEY,
  LABEL_KEY,
  CHILDREN_KEY,
  INDEX_KEY,
  ITEM_KEY,
  ADD_ACTION_KEY,
  EDIT_ACTION_KEY,
  REMOVE_ACTION_KEY,
  ID_KEY,
  NAME_KEY,
  PRICE_KEY,
  DEPT_KEY,
  SUBDEPT_KEY,
  GROUP_KEY,
  IS_COMPLEX_ITEM_KEY,
  IS_COMPLEX_KEY,
  COMPLEX_KEY,
  IS_VISIBLE_KEY,
  CREATEDON_KEY,
  UPDATEDON_KEY,
  QUANTITY_KEY,
  ROW_INDEX_KEY,
  SORT_CAPTION,
  CAPTIONS,
  CREATED_KEY,
  UPDATED_KEY,
  REMOVED_KEY,
  HANDLED_ITEMS_CAPTIONS,
  TITLES,
  TYPES,
  SITE_URL,
  API_URL,
  CMS_URL,
  ROOT_PATH,
  PAGE_COUNTER,
  IS_COMPLEX_DATA_KEY,
  IS_GROUP_IGNORED_KEY,
  IS_GROUP_USED_KEY,
  LINKED_RES_PARAMS
};
