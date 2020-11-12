import { getRepository, Repository } from 'typeorm';
import ICreateProductDTO from '../../dtos/ICreateProductDTO';

import Product from '../../models/Product';
import IProductsRepository from '../IProductsRepository';

export default class ProductsRepository implements IProductsRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  public async findByBarcode(barcode: string): Promise<Product | undefined> {
    return this.ormRepository.findOne({ where: { barcode } });
  }

  public async create(data: ICreateProductDTO): Promise<Product> {
    const product = this.ormRepository.create(data);

    await this.ormRepository.save(product);

    return product;
  }

  public async save(product: Product): Promise<Product> {
    return this.ormRepository.save(product);
  }

  public async findByName(name: string): Promise<Product | undefined> {
    return this.ormRepository.findOne({ where: { name } });
  }
}
