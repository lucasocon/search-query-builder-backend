import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Employee } from '@prisma/client';
import { SearchNode, RuleProperties } from 'src/interfaces/search.interfaces';

@Injectable()
export class SearchService {
  constructor(private readonly prisma: PrismaService) {}

  async getEmployees(search: SearchNode): Promise<Employee[]> {
    const whereClause = await this.buildWhereClause(search);

    return await this.prisma.employee.findMany({
      where: whereClause,
      include: {
        skills: true,
        positions: true,
      },
    });
  }

  private async buildWhereClause(node: SearchNode): Promise<any> {
    if (node.type === 'GROUP') {
      const conditions = await Promise.all(
        Object.values(node.children).map(child => this.buildWhereClause(child))
      );

      return node.condition === 'And' ? { AND: conditions } : { OR: conditions };
    } else if (node.type === 'RULE') {
      return this.buildRuleCondition(node.properties);
    }
  }

  private buildRuleCondition(properties: RuleProperties): any {
    const condition: any = {};

    if (properties.type === 'Skill') {
      condition.skills = {
        some: {
          name: this.applyOperator(properties.operator, properties.name),
          experience: this.applyOperator(properties.operator, properties.experience),
          seniority: this.applyOperator(properties.operator, properties.seniority),
        },
      };
    } else if (properties.type === 'Position') {
      condition.positions = {
        some: {
          name: this.applyOperator(properties.operator, properties.name),
        },
      };
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

