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
  Catalog = '/catalog',
  Basket = '/basket',
  Product = '/product:id',
}

export { NameSpace, ApiRoute, Path };
