import { Controller, Get } from '@nestjs/common';
import { SearchOptionsService } from './options.service';

@Controller({})
export class OptionsController {
  constructor(private readonly searchOptionsService: SearchOptionsService) {}

  @Get('search/options')
  async getSearchOptions() {
    return await this.searchOptionsService.getSearchOptions();
  }
}
