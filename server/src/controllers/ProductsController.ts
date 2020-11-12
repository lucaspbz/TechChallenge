import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateProductService from '../services/CreateProductService';
import DeleteProductService from '../services/DeleteProductService';
import ListProductsService from '../services/ListProductsService';
import UpdateProductService from '../services/UpdateProductService';

export default class ProductsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, quantity, price } = request.body;

    const createProduct = container.resolve(CreateProductService);

    const product = await createProduct.execute({ name, quantity, price });

    return response.json(product);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { barcode } = request.params;
    const { name, quantity, price } = request.body;

    const updateProduct = container.resolve(UpdateProductService);

    const product = await updateProduct.execute({
      barcode,
      name,
      quantity,
      price,
    });

    return response.json(product);
  }

  public async destroy(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { barcode } = request.params;

    const deleteProduct = container.resolve(DeleteProductService);

    await deleteProduct.execute(barcode);

    return response.json();
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listProducts = container.resolve(ListProductsService);

    const products = await listProducts.execute();

    return response.json(products);
  }
}
