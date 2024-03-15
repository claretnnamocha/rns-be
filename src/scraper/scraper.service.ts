import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import puppeteer from 'puppeteer';
import { BaseService } from 'src/common';

@Injectable()
export class ScraperService extends BaseService {
  constructor() {
    super();
  }

  @Cron(CronExpression.EVERY_5_SECONDS) // Run every 6 hours from Thursday 6 am to Monday 12 am
  async scrapeWebsite() {
    try {
      console.log('scraping');

      // Launch a new browser instance
      const browser = await puppeteer.launch();
      const page = await browser.newPage();

      // Navigate to the website
      await page.goto('https://your-react-app.com');

      await page.waitForSelector('.data-container');

      // Extract the data
      const data = await page.evaluate(() => {
        const dataElements = Array.from(
          document.querySelectorAll('.text-right'),
        );
        return dataElements.map((el) => el.textContent);
      });

      console.log(data);

      return data;
    } catch (error) {
      return this.handleError(error);
    }
  }
}
