import { Request, Response, Router } from 'express';
import { container } from 'tsyringe';
import CreateProductService from '../services/CreateProductService';

const productRouter = Router();

productRouter.post('/', async (request: Request, response: Response) => {
  const { name, quantity, price } = request.body;

  const createProduct = container.resolve(CreateProductService);

  const product = await createProduct.execute({ name, quantity, price });

  response.json(product);
});

export default productRouter;
