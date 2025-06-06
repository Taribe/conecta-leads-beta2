
import { useState, useEffect } from "react";
import { ArrowLeft, Save, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate, useParams } from "react-router-dom";
import { useLeads } from "@/hooks/useLeads";
import { useCorretores } from "@/hooks/useCorretores";
import { useToast } from "@/hooks/use-toast";

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

  useEffect(() => {
    const loadLead = async () => {
      if (!id) {
        navigate("/meus-leads");
        return;
      }

      const result = await fetchLeadById(parseInt(id));
      
      if (result?.error) {
        toast({
          title: "Erro",
          description: "Lead não encontrado.",
          variant: "destructive",
        });
        navigate("/meus-leads");
        return;
      }

      const lead = result.data;
      if (lead) {
        setNome(lead.nome);
        setEmail(lead.email);
        setTelefone(lead.telefone);
        setCidade(lead.cidade || "");
        setTipoPlano(lead.tipo_plano || "");
        setResponsavelId(lead.responsavel_id?.toString() || "");
        setOrigem(lead.origem || "");
        setTemperatura(lead.temperatura || "");
        setStatus(lead.status || "novo");
        setObservacoes(lead.observacoes || "");
      }
      
      setLoading(false);
    };

    loadLead();
  }, [id, fetchLeadById, navigate, toast]);

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

    if (!id) return;

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

      <Card className="bg-white">
        <CardHeader>
          <CardTitle>Informações do Lead</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome *</Label>
                <Input
                  id="nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Nome completo"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@exemplo.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="telefone">Telefone *</Label>
                <Input
                  id="telefone"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                  placeholder="(11) 99999-9999"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cidade">Cidade</Label>
                <Input
                  id="cidade"
                  value={cidade}
                  onChange={(e) => setCidade(e.target.value)}
                  placeholder="São Paulo"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tipo-plano">Tipo de Plano</Label>
                <Select value={tipoPlano} onValueChange={setTipoPlano}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo de plano" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">Básico</SelectItem>
                    <SelectItem value="premium">Premium</SelectItem>
                    <SelectItem value="enterprise">Enterprise</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="responsavel">Responsável</Label>
                <Select value={responsavelId} onValueChange={setResponsavelId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o responsável" />
                  </SelectTrigger>
                  <SelectContent>
                    {corretores.map((corretor) => (
                      <SelectItem key={corretor.id} value={corretor.id.toString()}>
                        {corretor.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="origem">Origem</Label>
                <Select value={origem} onValueChange={setOrigem}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a origem" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="website">Website</SelectItem>
                    <SelectItem value="redes-sociais">Redes Sociais</SelectItem>
                    <SelectItem value="indicacao">Indicação</SelectItem>
                    <SelectItem value="evento">Evento</SelectItem>
                    <SelectItem value="importacao">Importação</SelectItem>
                    <SelectItem value="outro">Outro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="temperatura">Temperatura</Label>
                <Select value={temperatura} onValueChange={setTemperatura}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a temperatura" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="frio">Frio</SelectItem>
                    <SelectItem value="morno">Morno</SelectItem>
                    <SelectItem value="quente">Quente</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="status">Status *</Label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="novo">Novo</SelectItem>
                    <SelectItem value="contatado">Contatado</SelectItem>
                    <SelectItem value="interessado">Interessado</SelectItem>
                    <SelectItem value="proposta">Proposta Enviada</SelectItem>
                    <SelectItem value="negociacao">Em Negociação</SelectItem>
                    <SelectItem value="fechado">Fechado</SelectItem>
                    <SelectItem value="perdido">Perdido</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="observacoes">Observações</Label>
              <Textarea
                id="observacoes"
                value={observacoes}
                onChange={(e) => setObservacoes(e.target.value)}
                placeholder="Observações adicionais sobre o lead..."
                rows={4}
              />
            </div>
            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline" onClick={() => navigate("/meus-leads")}>
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
    </div>
  );
};

export default EditarLead;
