import { inject, injectable } from 'tsyringe';

import Product from '../models/Product';
import IProductsRepository from '../repositories/IProductsRepository';

@injectable()
export default class ListProductsService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute(): Promise<Product[]> {
    return this.productsRepository.list();
  }
}
