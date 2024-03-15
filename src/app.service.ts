import { Injectable } from '@nestjs/common';
import { BaseService } from './common';
import { ServiceResponse } from './common/interfaces';

@Injectable()
export class AppService extends BaseService {
  async getAllFaqs(): Promise<ServiceResponse> {
    try {
    } catch (error) {
      return this.handleError(error);
    }
  }
}
