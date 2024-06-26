import { Controller, Post, Body } from '@nestjs/common';
import { SearchService } from './search.service';
import { PrismaService } from 'src/prisma.service';
import { Employee as EmployeeModel } from '@prisma/client';

@Controller({})
export class SearchController {
  constructor(private prisma: PrismaService, private readonly searchService: SearchService) {}

  @Post('/search')
  async createSearch(@Body() search: any): Promise<EmployeeModel[]> {
    return await this.searchService.getEmployees(search);
  }
}
