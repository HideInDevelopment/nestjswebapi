import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('Main')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({
    summary: 'Entry endpoint',
    description: `Don't do anything`,
  })
  @ApiResponse({
    status: 200,
    description: 'Hello world',
  })
  getHello(): string {
    return this.appService.getHello();
  }
}
