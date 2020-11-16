import { uuid } from 'uuidv4';
import ICreateProductDTO from '../../dtos/ICreateProductDTO';
import Product from '../../models/Product';
import IProductsRepository from '../IProductsRepository';

export default class FakeProductsRepository implements IProductsRepository {
  private products: Product[];

  constructor() {
    this.products = [];
  }

  public async findByName(name: string): Promise<Product | undefined> {
    return this.products.find(product => product.name === name);
  }

  public async findByBarcode(barcode: string): Promise<Product | undefined> {
    return this.products.find(product => product.barcode === barcode);
  }

  public async findLowStock(minValue: number): Promise<Product[]> {
    return this.products.filter(product => product.quantity < minValue);
  }

  public async create(data: ICreateProductDTO): Promise<Product> {
    const product = new Product();

    Object.assign(product, { barcode: uuid(), ...data });
    this.products.push(product);

    return product;
  }

  public async save(product: Product): Promise<Product> {
    const index = this.products.findIndex(
      findProduct => findProduct.barcode === product.barcode,
    );

    this.products[index] = product;
    return product;
  }

  public async delete(barcode: string): Promise<void> {
    this.products = this.products.filter(
      product => product.barcode !== barcode,
    );
  }

  public async list(): Promise<Product[]> {
    return this.products;
  }
}
