export const RouterPaths = {
  catalog: ():string => '/',
  basket: ():string => '/basket',
  product: (id: number | string):string => `/product/${id}`,
  productWithAnyId: ():string => '/product/:id',
  productWithoutId: ():string => '/product',
  notFound: ():string => '*',
};

export const RouterPathsNames = {
  [RouterPaths.catalog()]: 'Каталог',
  [RouterPaths.basket()]: 'Корзина'
};
