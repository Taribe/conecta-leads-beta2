
import { useState, useEffect, useCallback } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { useLeads } from "@/hooks/useLeads";
import { useCorretores } from "@/hooks/useCorretores";
import { useToast } from "@/hooks/use-toast";
import LeadEditForm from "@/components/LeadEditForm";

const EditarLead = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { fetchLeadById, updateLead } = useLeads();
  const { corretores } = useCorretores();
  const { toast } = useToast();

  const [loading, setLoading] = useState(true);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cidade, setCidade] = useState("");
  const [tipoPlano, setTipoPlano] = useState("");
  const [responsavelId, setResponsavelId] = useState<string>("");
  const [origem, setOrigem] = useState("");
  const [temperatura, setTemperatura] = useState("");
  const [status, setStatus] = useState("");
  const [observacoes, setObservacoes] = useState("");

  const loadLead = useCallback(async () => {
    if (!id) {
      console.log('ID não encontrado, redirecionando para meus-leads');
      navigate("/meus-leads");
      return;
    }

    console.log('Carregando lead com ID:', id);
    setLoading(true);

    try {
      const leadId = parseInt(id);
      if (isNaN(leadId)) {
        console.error('ID inválido:', id);
        toast({
          title: "Erro",
          description: "ID do lead inválido.",
          variant: "destructive",
        });
        navigate("/meus-leads");
        return;
      }

      const result = await fetchLeadById(leadId);
      
      if (result?.error) {
        console.error('Erro ao carregar lead:', result.error);
        toast({
          title: "Erro",
          description: result.error,
          variant: "destructive",
        });
        navigate("/meus-leads");
        return;
      }

      const lead = result.data;
      if (lead) {
        console.log('Lead carregado com sucesso:', lead);
        setNome(lead.nome || "");
        setEmail(lead.email || "");
        setTelefone(lead.telefone || "");
        setCidade(lead.cidade || "");
        setTipoPlano(lead.tipo_plano || "");
        setResponsavelId(lead.responsavel_id?.toString() || "");
        setOrigem(lead.origem || "");
        setTemperatura(lead.temperatura || "");
        setStatus(lead.status || "novo");
        setObservacoes(lead.observacoes || "");
      } else {
        console.error('Lead não encontrado');
        toast({
          title: "Erro",
          description: "Lead não encontrado.",
          variant: "destructive",
        });
        navigate("/meus-leads");
      }
    } catch (error) {
      console.error('Erro inesperado ao carregar lead:', error);
      toast({
        title: "Erro",
        description: "Erro inesperado ao carregar o lead.",
        variant: "destructive",
      });
      navigate("/meus-leads");
    } finally {
      setLoading(false);
    }
  }, [id, fetchLeadById, navigate, toast]);

  useEffect(() => {
    loadLead();
  }, [loadLead]);

  const handleFormSubmit = async (leadData: any) => {
    if (!id) return;

    console.log('Atualizando lead:', leadData);

    try {
      const result = await updateLead(parseInt(id), leadData);
      
      if (result?.error) {
        toast({
          title: "Erro",
          description: result.error,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Sucesso",
          description: "Lead atualizado com sucesso!",
        });
        navigate("/meus-leads");
      }
    } catch (error) {
      console.error('Erro ao atualizar lead:', error);
      toast({
        title: "Erro",
        description: "Erro inesperado ao atualizar o lead.",
        variant: "destructive",
      });
    }
  };

  const handleCancel = () => {
    navigate("/meus-leads");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          onClick={() => navigate("/meus-leads")}
          className="p-2"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Editar Lead</h1>
          <p className="text-gray-600 mt-1">Atualize as informações do lead.</p>
        </div>
      </div>

      <LeadEditForm
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
        onSubmit={handleFormSubmit}
        onCancel={handleCancel}
        leadId={id || ""}
      />
    </div>
  );
};

export default EditarLead;
