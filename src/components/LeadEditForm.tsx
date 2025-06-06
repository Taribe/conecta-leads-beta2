
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import LeadFormFields from "./LeadFormFields";

interface Corretor {
  id: number;
  nome: string;
}

interface LeadEditFormProps {
  nome: string;
  setNome: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  telefone: string;
  setTelefone: (value: string) => void;
  cidade: string;
  setCidade: (value: string) => void;
  tipoPlano: string;
  setTipoPlano: (value: string) => void;
  responsavelId: string;
  setResponsavelId: (value: string) => void;
  origem: string;
  setOrigem: (value: string) => void;
  temperatura: string;
  setTemperatura: (value: string) => void;
  status: string;
  setStatus: (value: string) => void;
  observacoes: string;
  setObservacoes: (value: string) => void;
  corretores: Corretor[];
  onSubmit: (leadData: any) => Promise<void>;
  onCancel: () => void;
  leadId: string;
}

const LeadEditForm = ({
  nome,
  setNome,
  email,
  setEmail,
  telefone,
  setTelefone,
  cidade,
  setCidade,
  tipoPlano,
  setTipoPlano,
  responsavelId,
  setResponsavelId,
  origem,
  setOrigem,
  temperatura,
  setTemperatura,
  status,
  setStatus,
  observacoes,
  setObservacoes,
  corretores,
  onSubmit,
  onCancel,
  leadId
}: LeadEditFormProps) => {
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!nome || !email || !telefone) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    const leadData = {
      nome,
      email,
      telefone,
      cidade: cidade || null,
      tipo_plano: tipoPlano || null,
      responsavel_id: responsavelId ? parseInt(responsavelId) : null,
      origem: origem || null,
      temperatura: temperatura || null,
      status: status || "novo",
      observacoes: observacoes || null
    };

    await onSubmit(leadData);
  };

  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle>Informações do Lead</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <LeadFormFields
            nome={nome}
            setNome={setNome}
            email={email}
            setEmail={setEmail}
            telefone={telefone}
            setTelefone={setTelefone}
            cidade={cidade}
            setCidade={setCidade}
            tipoPlano={tipoPlano}
            setTipoPlano={setTipoPlano}
            responsavelId={responsavelId}
            setResponsavelId={setResponsavelId}
            origem={origem}
            setOrigem={setOrigem}
            temperatura={temperatura}
            setTemperatura={setTemperatura}
            status={status}
            setStatus={setStatus}
            observacoes={observacoes}
            setObservacoes={setObservacoes}
            corretores={corretores}
          />
          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              <Save className="w-4 h-4 mr-2" />
              Salvar Alterações
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default LeadEditForm;
