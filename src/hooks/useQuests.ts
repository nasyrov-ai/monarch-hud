import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export interface Quest {
  id: string;
  title: string;
  description: string;
  status: 'active' | 'completed' | 'failed';
  rank: 'E' | 'D' | 'C' | 'B' | 'A' | 'S';
  reward_xp: number;
}

export function useQuests() {
  const [quests, setQuests] = useState<Quest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuests = async () => {
      const { data, error } = await supabase
        .from('quests')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching quests:', error);
      } else {
        setQuests(data || []);
      }
      setLoading(false);
    };

    fetchQuests();

    const channel = supabase
      .channel('quests_changes')
      .on('postgres_changes', { event: '*', table: 'quests' }, (payload) => {
        fetchQuests();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { quests, loading };
}
