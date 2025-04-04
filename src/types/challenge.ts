export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

export interface Concept {
  title: string;
  description: string;
  example: string;
  explanation: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  concepts: Concept[];
  initialCode: string;
  solution: string;
  hints: string[];
} 