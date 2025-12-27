// 游戏类型定义

export type PartType = 'body' | 'nosecone' | 'fins' | 'booster';

export interface RocketPart {
  id: string;
  type: PartType;
  name: string;
  color: string;
  description: string;
}

export interface AssembledPart {
  partType: PartType;
  color: string;
}

export interface RocketConfig {
  body?: AssembledPart;
  nosecone?: AssembledPart;
  fins?: AssembledPart;
  booster?: AssembledPart;
}

export type GamePage = 'home' | 'workshop' | 'launch' | 'report';

export interface MissionStory {
  title: string;
  description: string;
  achievement: string;
}
