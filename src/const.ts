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
  Basket = '/basket',
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

export enum FilterCameraCategory {
  None = 'none',
  PhotoCamera = 'photocamera',
  VideoCamera = 'videocamera',
}

export enum FilterCameraType {
  None = 'none',
  Digital = 'digital',
  Film = 'film',
  Snapshot = 'snapshot',
  Collection = 'collection',
}

export enum FilterCameraLevel {
  None = 'none',
  Zero = 'zero',
  NonProfessional = 'non-professional',
  Professional = 'professional',
}

export const DEFAULT_DOCUMENT_TITLE = 'Фотошоп';

export const PHONE_NUMBER_WITH_PLUS_LENGTH = 12;

export const PRODUCT_PATH = '/product/';

export const SCROLL_UP_COORD = 0;

export const REVIEWS_COUNT_DEFAULT = 3;

export const ESCAPE_KEY = 'Escape';


