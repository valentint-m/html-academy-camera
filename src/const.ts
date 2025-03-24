enum NameSpace {
  Data = 'DATA',
  User = 'USER',
}

enum ApiRoute {
  Coupons = '/coupons',
  Orders = '/orders',
  Promo = '/promo',
  Cameras = '/cameras/',
  SimilarCameras = '/similar',
  Reviews = '/reviews',
}

enum Path {
  Main = '/',
  Catalog = '/catalog',
  Basket = '/basket',
  Product = '/product/:id',
}

enum PhoneNumberCode {
  PlusCode = '+7',
  NoPlusCode = '8',
}

enum DocumentTitle {
  Catalog = 'Каталог',
  Loading = 'Загрузка',
  ErrorServer = 'Ошибка загрузки',
  ErrorRoute = '404',
}

const DEFAULT_DOCUMENT_TITLE = 'Фотошоп';

const PHONE_NUMBER_WITH_PLUS_LENGTH = 12;

const PRODUCT_PATH = '/product/';

const SCROLL_UP_COORD = 0;

const REVIEWS_COUNT_DEFAULT = 3;

const ESCAPE_KEY = 'Escape';

export { NameSpace, ApiRoute, Path, PhoneNumberCode, DocumentTitle, PRODUCT_PATH, REVIEWS_COUNT_DEFAULT, SCROLL_UP_COORD, ESCAPE_KEY, PHONE_NUMBER_WITH_PLUS_LENGTH, DEFAULT_DOCUMENT_TITLE };
