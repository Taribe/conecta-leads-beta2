
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface Lead {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  cidade: string | null;
  tipo_plano: string | null;
  status: string | null;
  responsavel_id: number | null;
  origem: string | null;
  temperatura: string | null;
  observacoes: string | null;
  created_at: string;
  responsavel?: {
    nome: string;
  };
}

export const useLeads = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchLeads = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('leads')
        .select(`
          *,
          corretores:responsavel_id (
            nome
          )
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Erro ao buscar leads:', error);
      } else {
        setLeads(data || []);
      }
    } catch (error) {
      console.error('Erro ao buscar leads:', error);
    } finally {
      setLoading(false);
    }
  };

  const createLead = async (leadData: Omit<Lead, 'id' | 'created_at' | 'responsavel'>) => {
    if (!user) return { error: 'Usuário não autenticado' };

    try {
      const { data, error } = await supabase
        .from('leads')
        .insert([leadData])
        .select()
        .single();

      if (error) {
        console.error('Erro ao criar lead:', error);
        return { error: error.message };
      }

      await fetchLeads(); // Refresh the list
      return { data, error: null };
    } catch (error) {
      console.error('Erro ao criar lead:', error);
      return { error: 'Erro interno do servidor' };
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [user]);

  return {
    leads,
    loading,
    fetchLeads,
    createLead
  };
};
