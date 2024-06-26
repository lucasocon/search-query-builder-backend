import { SearchType, Operator, SkillType, Seniority, NodeType, Condition } from '../enums/search.enum';

export interface RuleProperties {
  type: SearchType;
  operator: Operator; 
  name?: SkillType;
  experience?: number;
  seniority?: Seniority;
}

export interface SearchNode {
  type: NodeType;
  condition?: Condition;
  children?: { [key: string]: SearchNode };
  properties?: RuleProperties;
}

