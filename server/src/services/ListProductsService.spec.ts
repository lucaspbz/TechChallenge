import AppError from '../errors/AppError';
import FakeProductsRepository from '../repositories/fakes/FakeProductsRepository';
import CreateProductService from './CreateProductService';
import ListProductsService from './ListProductsService';

let fakeProductsRepository: FakeProductsRepository;
let createProduct: CreateProductService;
let listProducts: ListProductsService;

describe('List products', () => {
  beforeEach(() => {
    fakeProductsRepository = new FakeProductsRepository();
    createProduct = new CreateProductService(fakeProductsRepository);
    listProducts = new ListProductsService(fakeProductsRepository);
  });

  it('should be able to list products', async () => {
    await createProduct.execute({
      name: 'product 1',
      price: 20.1,
      quantity: 15,
    });

    await createProduct.execute({
      name: 'product 2',
      price: 20.1,
      quantity: 15,
    });

    await createProduct.execute({
      name: 'product 3',
      price: 20.1,
      quantity: 15,
    });

    const products = await listProducts.execute();
    expect(products).toHaveLength(3);
  });
});
