import AppError from '../errors/AppError';
import FakeProductsRepository from '../repositories/fakes/FakeProductsRepository';
import CreateProductService from './CreateProductService';
import UpdateProductService from './UpdateProductService';

let fakeProductsRepository: FakeProductsRepository;
let createProduct: CreateProductService;
let updateProduct: UpdateProductService;

describe('Update Product', () => {
  beforeEach(() => {
    fakeProductsRepository = new FakeProductsRepository();
    createProduct = new CreateProductService(fakeProductsRepository);
    updateProduct = new UpdateProductService(fakeProductsRepository);
  });

  it('should be able to update a product', async () => {
    const product = await createProduct.execute({
      name: 'product 1',
      price: 20.1,
      quantity: 15,
    });

    const updatedProduct = await updateProduct.execute({
      barcode: product.barcode,
      name: 'product 2',
      price: 10,
      quantity: 5,
    });
    expect(updatedProduct.barcode).toEqual(product.barcode);
    expect(updatedProduct.name).toEqual('product 2');
    expect(updatedProduct.price).toEqual(10);
    expect(updatedProduct.quantity).toEqual(5);
  });

  it('should not be able to update a product to a name of a already existing product', async () => {
    await createProduct.execute({
      name: 'product 1',
      price: 20.1,
      quantity: 15,
    });

    const product = await createProduct.execute({
      name: 'product 2',
      price: 20.1,
      quantity: 15,
    });

    await expect(
      updateProduct.execute({
        barcode: product.barcode,
        name: 'product 1',
        price: 10,
        quantity: 5,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update a product to negative quantity', async () => {
    const product = await createProduct.execute({
      name: 'product 1',
      price: 20.1,
      quantity: 15,
    });

    await expect(
      updateProduct.execute({
        barcode: product.barcode,
        name: 'product 1',
        price: 10,
        quantity: -5,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update a product with non-existing barcode', async () => {
    await expect(
      updateProduct.execute({
        barcode: 'non-existing barcode',
        name: 'product 1',
        price: 10,
        quantity: 5,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
