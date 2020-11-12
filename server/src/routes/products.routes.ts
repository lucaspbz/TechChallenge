import { Request, Response, Router } from 'express';
import { container } from 'tsyringe';
import CreateProductService from '../services/CreateProductService';
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

export default productRouter;
