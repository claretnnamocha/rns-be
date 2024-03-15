import { Controller, Get, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AppService } from './app.service';
import { BaseController } from './common';

@ApiTags('Misc')
@Controller()
export class AppController extends BaseController {
  constructor(private readonly appService: AppService) {
    super();
  }

  @Get('faqs')
  async getAllFaqs(@Res() response: Response) {
    const data = await this.appService.getAllFaqs();
    return this.response(response, data);
  }
}
