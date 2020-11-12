import { inject, injectable } from 'tsyringe';

import AppError from '../errors/AppError';
import Product from '../models/Product';
import IProductsRepository from '../repositories/IProductsRepository';

@injectable()
export default class DeleteProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute(barcode: string): Promise<Product> {
    const productExists = await this.productsRepository.findByBarcode(barcode);

    if (!productExists) {
      throw new AppError('There is no product with this barcode');
    }

    await this.productsRepository.delete(barcode);

    return productExists;
  }
}
