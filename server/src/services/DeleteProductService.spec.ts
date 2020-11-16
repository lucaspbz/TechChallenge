import AppError from '../errors/AppError';
import FakeProductsRepository from '../repositories/fakes/FakeProductsRepository';
import CreateProductService from './CreateProductService';
import DeleteProductService from './DeleteProductService';

let fakeProductsRepository: FakeProductsRepository;
let createProduct: CreateProductService;
let deleteProduct: DeleteProductService;

describe('Delete Product', () => {
  beforeEach(() => {
    fakeProductsRepository = new FakeProductsRepository();
    createProduct = new CreateProductService(fakeProductsRepository);
    deleteProduct = new DeleteProductService(fakeProductsRepository);
  });

  it('should be able to delete a product', async () => {
    const product = await createProduct.execute({
      name: 'product 1',
      price: 20.1,
      quantity: 15,
    });

    const deleteProductFunction = jest.spyOn(fakeProductsRepository, 'delete');

    await deleteProduct.execute(product.barcode);

    expect(deleteProductFunction).toBeCalledWith(product.barcode);
  });

  it('should not be able to delete a product that doest not exists', async () => {
    await expect(
      deleteProduct.execute('non-existing product barcode'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
