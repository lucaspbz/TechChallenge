import ICreateProductDTO from '../dtos/ICreateProductDTO';
import Product from '../models/Product';

export default interface IProductsRepository {
  findByName(name: string): Promise<Product | undefined>;

  create(data: ICreateProductDTO): Promise<Product>;
}
