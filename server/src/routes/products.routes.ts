import { Router } from 'express';
import ProductsController from '../controllers/ProductsController';

const productRouter = Router();

const productsController = new ProductsController();

productRouter.post('/', productsController.create);

productRouter.put('/:barcode', productsController.update);

productRouter.delete('/:barcode', productsController.destroy);

productRouter.get('/', productsController.index);

export default productRouter;
