import { Controller, Post, Body } from '@nestjs/common';
import { SearchService } from './search.service';
import { Employee as EmployeeModel } from '@prisma/client';

@Controller({})
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Post('/search')
  async createSearch(@Body() search: any): Promise<EmployeeModel[]> {
    return await this.searchService.getEmployees(search);
  }
}
