export enum NameSpace {
  Data = 'DATA',
  User = 'USER',
}

export enum ApiRoute {
  Coupons = '/coupons',
  Orders = '/orders',
  Promo = '/promo',
  Cameras = '/cameras/',
  SimilarCameras = '/similar',
  Reviews = '/reviews',
}

export enum Path {
  Main = '/',
  Catalog = '/catalog',
  Cart = '/cart',
  Product = '/product/:id',
}

export enum PhoneNumberCode {
  PlusCode = '+7',
  NoPlusCode = '8',
}

export enum DocumentTitle {
  Catalog = 'Каталог',
  Loading = 'Загрузка',
  ErrorServer = 'Ошибка загрузки',
  ErrorRoute = '404',
}

export enum SortType {
  ReviewCount = 'reviewCount',
  Price = 'price',
}

export enum SortDirection {
  Up = 'Up',
  Down = 'Down',
}

export enum CameraCategoryRussian {
  PhotoCamera = 'Фотоаппарат',
  VideoCamera = 'Видеокамера',
}

export enum CameraTypeRussian {
  Digital = 'Цифровая',
  Film = 'Плёночная',
  Snapshot = 'Моментальная',
  Collection = 'Коллекционная',
}

export enum CameraLevelRussian {
  Zero = 'Нулевой',
  NonProfessional = 'Любительский',
  Professional = 'Профессиональный',
}

export enum FilterCameraCategory {
  None = 'none',
  PhotoCamera = 'photocamera',
  VideoCamera = 'videocamera',
}

export enum FilterCameraType {
  Digital = 'digital',
  Film = 'film',
  Snapshot = 'snapshot',
  Collection = 'collection',
}

export enum FilterCameraLevel {
  Zero = 'zero',
  NonProfessional = 'non-professional',
  Professional = 'professional',
}

export enum CameraUpperCountForDiscount {
  Low = 2,
  Medium = 5,
  High = 10,
}

export enum CameraCountDiscountValue {
  Low = 3,
  Medium = 5,
  High = 10,
  Highest = 15,
}

export enum CameraUpperSummaryPriceForDiscount {
  Low = 10000,
  Medium = 20000,
  High = 30000,
}

export enum CameraSummaryPriceDiscountValue {
  Low = 1,
  Medium = 2,
  High = 3,
}

export const DEFAULT_DOCUMENT_TITLE = 'Фотошоп';

export const PHONE_NUMBER_WITH_PLUS_LENGTH = 12;

export const PRODUCT_PATH = '/product/';

export const SCROLL_UP_COORD = 0;

export const REVIEWS_COUNT_DEFAULT = 3;

export const ESCAPE_KEY = 'Escape';


