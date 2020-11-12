import { container } from 'tsyringe';

import ProductsRepository from '../repositories/implementations/ProductsRepository';
import IProductsRepository from '../repositories/IProductsRepository';

container.registerSingleton<IProductsRepository>(
  'ProductsRepository',
  ProductsRepository,
);
