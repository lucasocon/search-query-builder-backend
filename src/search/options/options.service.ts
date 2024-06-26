import { Injectable } from '@nestjs/common';
import { SkillType, Seniority, Position } from '../../enums/search.enum';

@Injectable()
export class SearchOptionsService {
  async getSearchOptions(): Promise<any> {
    return {
      skills: Object.values(SkillType),
      experience: [1, 3, 5],
      seniorities: Object.values(Seniority),
      positions: Object.values(Position)
    }
  }
}
