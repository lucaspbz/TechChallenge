import { inject, injectable } from 'tsyringe';
import Product from '../models/Product';
import IProductsRepository from '../repositories/IProductsRepository';

@injectable()
export default class ListLowStockProductsService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute(): Promise<Product[]> {
    // Find products with less than 100 units
    return this.productsRepository.findLowStock(100);
  }
}
