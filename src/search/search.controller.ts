import { Controller, Post, Body } from '@nestjs/common';
import { SearchService } from './search.service';
import { Employee } from '@prisma/client';
import { SearchNode } from 'src/interfaces/search.interfaces';

@Controller({})
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Post('/search')
  async createSearch(@Body() search: SearchNode): Promise<Employee[]> {
    return await this.searchService.getEmployees(search);
  }
}
