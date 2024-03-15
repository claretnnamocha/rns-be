import { Controller } from '@nestjs/common';
import { BaseService } from 'src/common';
import { ScraperService } from './scraper.service';

@Controller('Scraper')
export class ScraperController extends BaseService {
  constructor(private readonly scraperService: ScraperService) {
    super();
  }
}
