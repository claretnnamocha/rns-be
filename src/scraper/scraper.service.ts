import { HttpStatus, Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { load } from 'cheerio';
import puppeteer from 'puppeteer';
import { BaseService } from 'src/common';
import { ServiceResponse } from 'src/common/interfaces';
import { Record } from 'src/database/models';

@Injectable()
export class ScraperService extends BaseService {
  constructor() {
    super();
  }

  async getScrapeData(): Promise<ServiceResponse> {
    try {
      const data = await Record.findAll();

      return { statusCode: HttpStatus.OK, message: ['message retrived'], data };
    } catch (error) {
      return this.handleError(error);
    }
  }

  @Cron(CronExpression.EVERY_30_MINUTES)
  async scrapeWebsite(): Promise<ServiceResponse> {
    try {
      console.log('scraping');

      const browser = await puppeteer.launch();
      //create a new in headless chrome
      const page = await browser.newPage();

      //go to target website
      await page.goto('https://snowtrace.io', {
        //wait for content to load
        waitUntil: 'networkidle0',
      });

      //get full page html
      const html = await page.content();

      const $ = load(html);

      const price1 = $('.text-right > a > .text-link');
      const price2 = $('.text-right > .new-line-xxs > .small');

      // If the section exists, log its HTML
      if (price1.length > 0 && price2.length) {
        const nAVAXPrice = Number(price1.html().replace('nAVAX', '').trim());
        const usdPrice = Number(
          price2
            .html()
            .replace(/[\(\)\$]/g, '')
            .trim(),
        );

        // console.log({ nAVAXPrice, usdPrice });
        await Record.create({ nAVAXPrice, usdPrice });
      }

      //store html content in the reactstorefront file
      // writeFileSync('reactstorefront.html', html);

      //close headless chrome
      await browser.close();

      return { statusCode: HttpStatus.OK, message: [] };
    } catch (error) {
      return this.handleError(error);
    }
  }
}
