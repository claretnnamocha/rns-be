import { HttpStatus, Injectable } from '@nestjs/common';
import { logger } from '.';
import { ServiceResponse } from './interfaces';
@Injectable()
export class BaseService {
  async handleError(error: Error): Promise<ServiceResponse> {
    logger.error(error);

    return {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: [process.env.DEBUG ? error.message : 'Internal server error'],
    };
  }
}
