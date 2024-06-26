import { Test, TestingModule } from '@nestjs/testing';
import { SearchService } from './search.service';
import { PrismaService } from '../prisma.service';
import { SearchNode, RuleProperties } from '../interfaces/search.interfaces';
import { SearchType, Operator, NodeType, Condition , Seniority, SkillType, Position} from '../enums/search.enum';

describe('SearchService', () => {
  let service: SearchService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SearchService,
        {
          provide: PrismaService,
          useValue: {
            employee: {
              findMany: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<SearchService>(SearchService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('buildWhereClause', () => {
    it('should build an AND clause correctly', async () => {
      const searchNode: SearchNode = {
        type: NodeType.GROUP,
        condition: Condition.AND,
        children: {
          rule1: {
            type: NodeType.RULE,
            properties: {
              type: SearchType.SKILL,
              operator: Operator.EQUAL,
              name: SkillType.NODEJS,
              experience: 2,
              seniority: Seniority.SENIOR,
            },
          },
        },
      };

      const result = await service['buildWhereClause'](searchNode);
      expect(result).toEqual({
        AND: [
          {
            skills: {
              some: {
                name: 'NodeJS',
                experience: 2,
                seniority: 'Senior',
              },
            },
          },
        ],
      });
    });

    it('should build an OR clause correctly', async () => {
      const searchNode: SearchNode = {
        type: NodeType.GROUP,
        condition: Condition.OR,
        children: {
          rule1: {
            type: NodeType.RULE,
            properties: {
              type: SearchType.SKILL,
              operator: Operator.EQUAL,
              name: SkillType.NODEJS,
              experience: 2,
              seniority: Seniority.SENIOR,
            },
          },
          rule2: {
            type: NodeType.RULE,
            properties: {
              type: SearchType.SKILL,
              operator: Operator.EQUAL,
              name: SkillType.RUBY,
              experience: 1,
              seniority: Seniority.JUNIOR,
            },
          },
        },
      };

      const result = await service['buildWhereClause'](searchNode);
      expect(result).toEqual({
        OR: [
          {
            skills: {
              some: {
                name: 'NodeJS',
                experience: 2,
                seniority: 'Senior',
              },
            },
          },
          {
            skills: {
              some: {
                name: 'Ruby',
                experience: 1,
                seniority: 'Junior',
              },
            },
          },
        ],
      });
    });
  });

  describe('buildRuleCondition', () => {
    it('should build a rule condition for skills correctly', () => {
      const properties: RuleProperties = {
        type: SearchType.SKILL,
        operator: Operator.EQUAL,
        name: SkillType.NODEJS,
        experience: 2,
        seniority: Seniority.SENIOR,
      };

      const result = service['buildRuleCondition'](properties);
      expect(result).toEqual({
        skills: {
          some: {
            name: 'NodeJS',
            experience: 2,
            seniority: Seniority.SENIOR,
          },
        },
      });
    });

    it('should build a rule condition for positions correctly', () => {
      const properties: RuleProperties = {
        type: SearchType.POSITION,
        operator: Operator.EQUAL,
        name: Position.BACKEND_DEVELOPER,
      };

      const result = service['buildRuleCondition'](properties);
      expect(result).toEqual({
        positions: {
          some: {
            name: Position.BACKEND_DEVELOPER,
          },
        },
      });
    });
  });

  describe('applyOperator', () => {
    it('should apply EQUAL operator correctly', () => {
      const value = 'NodeJS';
      const result = service['applyOperator'](Operator.EQUAL, value);
      expect(result).toEqual(value);
    });

    it('should apply NOT_EQUAL operator correctly', () => {
      const value = 'NodeJS';
      const result = service['applyOperator'](Operator.NOT_EQUAL, value);
      expect(result).toEqual({ not: value });
    });

    it('should throw an error for unsupported operator', () => {
      expect(() => service['applyOperator']('unsupported' as Operator, 'value')).toThrow(
        'Unsupported operator: unsupported'
      );
    });
  });
});
