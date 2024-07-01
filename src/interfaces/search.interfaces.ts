import { SearchType, Operator, SkillType, Seniority, NodeType, Condition, Position } from '../enums/search.enum';

export interface RuleProperties {
  type: SearchType;
  operator: Operator; 
  name?: SkillType | Position;
  experience?: string;
  seniority?: Seniority;
  lastWorkedAt?: string
}

export interface SearchNode {
  type: NodeType;
  condition?: Condition;
  childrens?: { [key: string]: SearchNode };
  properties?: RuleProperties;
}

