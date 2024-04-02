import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // a Get route which is a decorator as weell
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
