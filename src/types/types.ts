export interface Player {
  id: string;
  name: string;
  level: number;
  xp: number;
  xpNeeded: number;
  totalXP: number;
}

export interface Quest {
  id: string;
  name: string;
  xpReward: number;
}
