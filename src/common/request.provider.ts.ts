import { Injectable, Scope, Inject } from '@nestjs/common';
import { Request } from 'express';

@Injectable({ scope: Scope.REQUEST })
export class RequestProvider {
  constructor(@Inject('REQUEST') private request: Request) {}

  getRequest(): Request {
    return this.request;
  }
}
