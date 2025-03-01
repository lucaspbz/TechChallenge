import { inject, injectable } from 'tsyringe';

import ICreateProductDTO from '../dtos/ICreateProductDTO';
import AppError from '../errors/AppError';
import Product from '../models/Product';
import IProductsRepository from '../repositories/IProductsRepository';

@injectable()
export default class CreateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute(data: ICreateProductDTO): Promise<Product> {
    const productExists = await this.productsRepository.findByName(data.name);

    if (data.quantity < 0) {
      throw new AppError('Product quantity cannont be less than 0');
    }

    if (productExists) {
      throw new AppError('There is already a product with this name');
    }

    const product = await this.productsRepository.create(data);

    return product;
  }
}
