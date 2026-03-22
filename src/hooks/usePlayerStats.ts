import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export interface PlayerStats {
  str: number;
  int: number;
  agi: number;
  vit: number;
  level: number;
  xp: number;
  stat_points: number;
}

export function usePlayerStats() {
  const [stats, setStats] = useState<PlayerStats | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      const { data, error } = await supabase
        .from('player_stats')
        .select('*')
        .single();
      
      if (data) setStats(data);
    };

    fetchStats();

    const channel = supabase
      .channel('player_stats_changes')
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'player_stats' }, (payload) => {
        setStats(payload.new as PlayerStats);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return stats;
}
