import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Employee } from '@prisma/client';

@Injectable()
export class SearchService {
  constructor(private readonly prisma: PrismaService) {}

  async getEmployees(search: any): Promise<Employee[]> {
    const whereClause = await this.buildWhereClause(search);
    
    return await this.prisma.employee.findMany({
      where: whereClause,
      include: {
        skills: true,
        positions: true,
      }
    });
  }

  private async buildWhereClause(node: any): Promise<any> {
    if (node.type === 'GROUP') {
      const conditions = await Promise.all(
        Object.values(node.children).map(child => this.buildWhereClause(child))
      );

      if (node.condition === 'And') {
        return { AND: conditions };
      } else if (node.condition === 'Or') {
        return { OR: conditions };
      }
    } else if (node.type === 'RULE') {
      return this.buildRuleCondition(node.properties);
    }
  }

  private buildRuleCondition(properties: any): any {
    const condition: any = {};

    if (properties.type === 'Skill') {
      const skillCondition: any = {
        name: this.applyOperator(properties.operator, properties.name),
        experience: this.applyOperator(properties.operator, properties.experience),
        seniority: this.applyOperator(properties.operator, properties.seniority)
      };
      condition.skills = { some: skillCondition };
    } else if (properties.type === 'Position') {
      const positionCondition: any = {
        name: this.applyOperator(properties.operator, properties.name)
      };
      condition.positions = { some: positionCondition };
    }

    return condition;
  }

  private applyOperator(operator: string, value: any): any {
    switch (operator) {
      case 'equal':
        return value;
      case 'not_equal':
        return { not: value };
      default:
        throw new Error(`Unsupported operator: ${operator}`);
    }
  }
}
