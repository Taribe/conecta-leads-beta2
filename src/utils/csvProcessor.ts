
import { Lead } from '@/hooks/useLeads';

export interface ImportedLead {
  nome: string;
  email: string;
  telefone: string;
  cidade: string | null;
  tipo_plano: string | null;
}

export const processCSVFile = (file: File): Promise<ImportedLead[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const lines = text.split('\n').filter(line => line.trim() !== '');
        
        if (lines.length < 2) {
          reject(new Error('O arquivo deve conter pelo menos um cabeçalho e uma linha de dados'));
          return;
        }

        const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
        const leads: ImportedLead[] = [];

        // Mapear cabeçalhos para campos esperados
        const headerMap: { [key: string]: string } = {
          'nome': 'nome',
          'name': 'nome',
          'email': 'email',
          'e-mail': 'email',
          'telefone': 'telefone',
          'phone': 'telefone',
          'cidade': 'cidade',
          'city': 'cidade',
          'tipo de plano': 'tipo_plano',
          'plano': 'tipo_plano',
          'plan': 'tipo_plano'
        };

        for (let i = 1; i < lines.length; i++) {
          const values = lines[i].split(',').map(v => v.trim().replace(/"/g, ''));
          const lead: any = {};

          headers.forEach((header, index) => {
            const mappedField = headerMap[header];
            if (mappedField && values[index]) {
              lead[mappedField] = values[index];
            }
          });

          // Validar campos obrigatórios e garantir que todos os campos estão presentes
          if (lead.nome && lead.email && lead.telefone) {
            leads.push({
              nome: lead.nome,
              email: lead.email,
              telefone: lead.telefone,
              cidade: lead.cidade || null,
              tipo_plano: lead.tipo_plano || null
            });
          }
        }

        if (leads.length === 0) {
          reject(new Error('Nenhum lead válido encontrado no arquivo. Verifique se os campos Nome, Email e Telefone estão presentes.'));
          return;
        }

        resolve(leads);
      } catch (error) {
        reject(new Error('Erro ao processar o arquivo CSV: ' + (error as Error).message));
      }
    };

    reader.onerror = () => reject(new Error('Erro ao ler o arquivo'));
    reader.readAsText(file, 'utf-8');
  });
};

export const processExcelFile = async (file: File): Promise<ImportedLead[]> => {
  // Para Excel, vamos usar uma implementação simplificada
  // Em um projeto real, você usaria uma biblioteca como xlsx
  throw new Error('Importação de Excel não implementada ainda. Use arquivos CSV.');
};
