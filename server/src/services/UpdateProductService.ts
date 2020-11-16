import { inject, injectable } from 'tsyringe';

import ICreateProductDTO from '../dtos/ICreateProductDTO';
import AppError from '../errors/AppError';
import Product from '../models/Product';
import IProductsRepository from '../repositories/IProductsRepository';

interface IRequest extends ICreateProductDTO {
  barcode: string;
}

@injectable()
export default class UpdateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute(data: IRequest): Promise<Product> {
    const productExists = await this.productsRepository.findByBarcode(
      data.barcode,
    );

    if (data.quantity < 0) {
      throw new AppError('Product quantity cannont be less than 0');
    }

    if (!productExists) {
      throw new AppError('There is no product with this barcode');
    }

    const repeatedName = await this.productsRepository.findByName(data.name);

    if (repeatedName) {
      throw new AppError('There is already a product with this name');
    }

    Object.assign(productExists, { ...data });

    await this.productsRepository.save(productExists);

    return productExists;
  }
}
