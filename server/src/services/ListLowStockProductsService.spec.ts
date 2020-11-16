import AppError from '../errors/AppError';
import FakeProductsRepository from '../repositories/fakes/FakeProductsRepository';
import CreateProductService from './CreateProductService';
import ListLowStockProductsService from './ListLowStockProductsService';

let fakeProductsRepository: FakeProductsRepository;
let createProduct: CreateProductService;
let listLowStock: ListLowStockProductsService;

describe('List low stock', () => {
  beforeEach(() => {
    fakeProductsRepository = new FakeProductsRepository();
    createProduct = new CreateProductService(fakeProductsRepository);
    listLowStock = new ListLowStockProductsService(fakeProductsRepository);
  });

  it('should be able to list products with low stock', async () => {
    await createProduct.execute({
      name: 'product 1',
      price: 20.1,
      quantity: 15,
    });
    await createProduct.execute({
      name: 'product 2',
      price: 20.1,
      quantity: 100,
    });

    const lowStock = await listLowStock.execute();
    expect(lowStock).toHaveLength(1);
  });
});
