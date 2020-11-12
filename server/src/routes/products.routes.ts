import { Router } from 'express';

import LowStockController from '../controllers/LowStockController';
import ProductsController from '../controllers/ProductsController';

const productRouter = Router();

const productsController = new ProductsController();
const lowStockController = new LowStockController();

productRouter.post('/', productsController.create);

productRouter.put('/:barcode', productsController.update);

productRouter.delete('/:barcode', productsController.destroy);

productRouter.get('/', productsController.index);

productRouter.get('/low-stock', lowStockController.index);

export default productRouter;
