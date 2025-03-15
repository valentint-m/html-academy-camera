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

const PRODUCT_PATH = '/product/';

const SCROLL_UP_COORD = 0;

const REVIEWS_COUNT_DEFAULT = 3;

const ESCAPE_KEY = 'Escape';

export { NameSpace, ApiRoute, Path, PRODUCT_PATH, REVIEWS_COUNT_DEFAULT, SCROLL_UP_COORD, ESCAPE_KEY };
