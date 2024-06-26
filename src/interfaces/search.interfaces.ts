export interface SearchNode {
  type: string;
  condition?: string;
  children?: { [key: string]: SearchNode };
  properties?: RuleProperties;
}

export interface RuleProperties {
  type: string;
  operator: string;
  name?: string;
  experience?: number;
  seniority?: string;
}