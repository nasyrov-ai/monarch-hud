import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export interface ShadowSoldier {
  id: string;
  name: string;
  rank: string;
  status: 'active' | 'inactive';
  type: 'warrior' | 'mage' | 'assassin' | 'tank';
}

export function useShadowArmy() {
  const [soldiers, setSoldiers] = useState<ShadowSoldier[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShadows = async () => {
      const { data, error } = await supabase
        .from('shadow_army')
        .select('*')
        .order('rank', { ascending: false });

      if (error) {
        console.error('Error fetching shadows:', error);
      } else {
        setSoldiers(data || []);
      }
      setLoading(false);
    };

    fetchShadows();

    // Subscribe to changes
    const channel = supabase
      .channel('shadow_army_changes')
      .on('postgres_changes', { event: '*', table: 'shadow_army' }, (payload) => {
        fetchShadows();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { soldiers, loading };
}
