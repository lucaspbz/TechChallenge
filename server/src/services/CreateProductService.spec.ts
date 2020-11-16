import AppError from '../errors/AppError';
import FakeProductsRepository from '../repositories/fakes/FakeProductsRepository';
import CreateProductService from './CreateProductService';

let fakeProductsRepository: FakeProductsRepository;
let createProduct: CreateProductService;

describe('Create Product', () => {
  beforeEach(() => {
    fakeProductsRepository = new FakeProductsRepository();
    createProduct = new CreateProductService(fakeProductsRepository);
  });

  it('should be able to create a product', async () => {
    const product = await createProduct.execute({
      name: 'product 1',
      price: 20.1,
      quantity: 15,
    });
    expect(product).toHaveProperty('barcode');
  });

  it('should not be able to create a product with negative quantity', async () => {
    await expect(
      createProduct.execute({
        name: 'product 1',
        price: 20.1,
        quantity: -1,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a product with same name as other product', async () => {
    await createProduct.execute({
      name: 'product 1',
      price: 20.1,
      quantity: 1,
    });

    await expect(
      createProduct.execute({
        name: 'product 1',
        price: 20.1,
        quantity: 1,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
