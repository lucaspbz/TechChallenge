import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListLowStockProductsService from '../services/ListLowStockProductsService';

export default class LowStockController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listLowStock = container.resolve(ListLowStockProductsService);

    const lowStock = await listLowStock.execute();

    return response.json(lowStock);
  }
}
