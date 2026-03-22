export interface PlayerStats {
  id: string;
  player_name: string;
  level: number;
  xp: number;
  str: number;
  int: number;
  agi: number;
  vit: number;
  stat_points: number;
  updated_at: string;
}

export interface ShadowSoldier {
  id: string;
  name: string;
  epic_name: string;
  rank: string;
  capabilities: string[];
  status: 'active' | 'idle' | 'offline';
  last_active: string;
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  rank: 'E' | 'D' | 'C' | 'B' | 'A' | 'S';
  reward_xp: number;
  reward_stat_points: number;
  is_completed: boolean;
  penalty: string;
  deadline: string;
}
