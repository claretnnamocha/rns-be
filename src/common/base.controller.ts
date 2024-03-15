import { Controller } from '@nestjs/common';
import { Response } from 'express';
import { ServiceResponse } from './interfaces';

@Controller()
export class BaseController {
  async response(response: Response, data: ServiceResponse) {
    return response
      .status(data.statusCode)
      .json({ ...data, timestamp: new Date().toISOString() });
  }
}
