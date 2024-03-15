import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { FacebookStrategy } from './common/passport-strategies/facebook.strategy';
// import { LinkedInStrategy } from './common/passport-strategies/linkedin.strategy';
// import { TwitterStrategy } from './common/passport-strategies/twitter.strategy';
import { ScheduleModule } from '@nestjs/schedule';
import { DatabaseModule } from './database/database.module';
import { ScraperModule } from './scraper/scraper.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    ScraperModule,
  ],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
