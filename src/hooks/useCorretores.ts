
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface Corretor {
  id: number;
  nome: string;
  email: string;
  telefone: string | null;
  cargo: string | null;
  ativo: boolean | null;
  avatar_url: string | null;
  created_at: string;
}

export const useCorretores = () => {
  const [corretores, setCorretores] = useState<Corretor[]>([]);
  const [currentCorretor, setCurrentCorretor] = useState<Corretor | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchCorretores = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('corretores')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Erro ao buscar corretores:', error);
      } else {
        setCorretores(data || []);
      }
    } catch (error) {
      console.error('Erro ao buscar corretores:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCurrentCorretor = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('corretores')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error) {
        console.error('Erro ao buscar corretor atual:', error);
      } else {
        setCurrentCorretor(data);
      }
    } catch (error) {
      console.error('Erro ao buscar corretor atual:', error);
    }
  };

  useEffect(() => {
    fetchCorretores();
    fetchCurrentCorretor();
  }, [user]);

  return {
    corretores,
    currentCorretor,
    loading,
    fetchCorretores,
    fetchCurrentCorretor
  };
};
