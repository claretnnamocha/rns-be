import { Logger } from '@nestjs/common';
import { displayName } from '../../package.json';

export { BaseController } from './base.controller';
export { BaseService } from './base.service';
export * as config from './config';
export * as interfaces from './interfaces';
export { RequestProvider } from './request.provider.ts';
export const logger = new Logger(displayName);
