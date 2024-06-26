import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchOptionsService } from './options/options.service';
import { SearchController } from './search.controller';
import { OptionsController } from './options/options.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [SearchController, OptionsController],
  providers: [SearchService, PrismaService, SearchOptionsService]
})
export class SearchModule {}
