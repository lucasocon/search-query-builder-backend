import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Employee } from '@prisma/client';


@Injectable()
export class SearchService {
  constructor(private readonly prisma: PrismaService) {}

  async getEmployees(search: any): Promise<Employee[]> {
    const whereClause = await this.buildWhereClause(search.children);

    return await this.prisma.employee.findMany({
      where: whereClause,
      include: {
        skills: true,
        positions: true,
      }
    });
  }

  private async buildWhereClause(children: any[]): Promise<any> {
    const conditions: any[] = [];
    
    for (const child of children) {
      if (child.type === 'RULE') {
        conditions.push(await this.buildRuleCondition(child.properties));
      } else if (child.type === 'GROUP' && child.condition === 'And') {
        conditions.push(await this.buildWhereClause(child.children));
      }
    }

    return { AND: conditions };
  }

  private async buildRuleCondition(properties: any): Promise<any> {
    const condition: any = {};

    if (properties.type === 'Skill') {
      condition.skills = { some: { stack: properties.stack, experience: properties.experience, seniority: properties.seniority } };
    } else if (properties.type === 'Position') {
      condition.positions = { some: { name: properties.positions } };
    }

    return condition;
  }
}

