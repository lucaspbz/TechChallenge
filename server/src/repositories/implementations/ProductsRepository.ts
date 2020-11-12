import { getRepository, Repository, LessThan } from 'typeorm';
import ICreateProductDTO from '../../dtos/ICreateProductDTO';

import Product from '../../models/Product';
import IProductsRepository from '../IProductsRepository';

export default class ProductsRepository implements IProductsRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  public async findLowStock(minValue: number): Promise<Product[]> {
    return this.ormRepository.find({
      where: { quantity: LessThan(minValue) },
    });
  }

  public async findByBarcode(barcode: string): Promise<Product | undefined> {
    return this.ormRepository.findOne({ where: { barcode } });
  }

  public async findByName(name: string): Promise<Product | undefined> {
    return this.ormRepository.findOne({ where: { name } });
  }

  public async create(data: ICreateProductDTO): Promise<Product> {
    const product = this.ormRepository.create(data);

    await this.ormRepository.save(product);

    return product;
  }

  public async save(product: Product): Promise<Product> {
    return this.ormRepository.save(product);
  }

  public async delete(barcode: string): Promise<void> {
    await this.ormRepository.delete({ barcode });
  }

  public async list(): Promise<Product[]> {
    return this.ormRepository.find();
  }
}
