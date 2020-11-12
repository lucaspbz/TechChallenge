import { Request, Response, Router } from 'express';
import { container } from 'tsyringe';

import CreateProductService from '../services/CreateProductService';
import DeleteProductService from '../services/DeleteProductService';
import ListProductsService from '../services/ListProductsService';
import UpdateProductService from '../services/UpdateProductService';

const productRouter = Router();

productRouter.post('/', async (request: Request, response: Response) => {
  const { name, quantity, price } = request.body;

  const createProduct = container.resolve(CreateProductService);

  const product = await createProduct.execute({ name, quantity, price });

  response.json(product);
});

productRouter.put('/:barcode', async (request: Request, response: Response) => {
  const { barcode } = request.params;
  const { name, quantity, price } = request.body;

  const updateProduct = container.resolve(UpdateProductService);

  const product = await updateProduct.execute({
    barcode,
    name,
    quantity,
    price,
  });

  response.json(product);
});

productRouter.delete(
  '/:barcode',
  async (request: Request, response: Response) => {
    const { barcode } = request.params;

    const deleteProduct = container.resolve(DeleteProductService);

    await deleteProduct.execute(barcode);

    response.json();
  },
);

productRouter.get('/', async (request: Request, response: Response) => {
  const listProducts = container.resolve(ListProductsService);

  const products = await listProducts.execute();

  response.json(products);
});

export default productRouter;
