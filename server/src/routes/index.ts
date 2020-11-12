import { Router } from 'express';

import productRouter from './products.routes';

const routes = Router();

routes.use('/products', productRouter);

export default routes;
