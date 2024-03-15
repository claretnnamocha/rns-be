import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { BaseController } from 'src/common';
import { ScraperService } from './scraper.service';

@Controller('scraper')
export class ScraperController extends BaseController {
  constructor(private readonly scraperService: ScraperService) {
    super();
    scraperService.scrapeWebsite();
  }

  @Get('data')
  async getScrapeData(@Res() response: Response) {
    const data = await this.scraperService.getScrapeData();
    return this.response(response, data);
  }
}
