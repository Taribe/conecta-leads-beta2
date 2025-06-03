
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useLeads } from "@/hooks/useLeads";
import { useCorretores } from "@/hooks/useCorretores";

const NovoLead = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { createLead } = useLeads();
  const { corretores, currentCorretor } = useCorretores();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    cidade: "",
    tipo_plano: "",
    responsavel_id: null as number | null,
    temperatura: "",
    origem: "",
    observacoes: "",
  });

  const handleInputChange = (field: string, value: string | number | null) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.nome || !formData.email || !formData.telefone) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha nome, email e telefone.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    const leadData = {
      ...formData,
      responsavel_id: formData.responsavel_id || currentCorretor?.id || null,
      status: 'novo' as const
    };

    const { error } = await createLead(leadData);

    if (error) {
      toast({
        title: "Erro ao adicionar lead",
        description: "Ocorreu um erro ao cadastrar o lead. Tente novamente.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Lead adicionado com sucesso!",
        description: "O novo lead foi cadastrado no sistema.",
      });
      navigate("/meus-leads");
    }
    
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="sm" asChild>
          <Link to="/meus-leads">
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Novo Lead</h1>
          <p className="text-gray-600 mt-1">Adicione um novo lead manualmente ou importe uma lista.</p>
        </div>
      </div>

      <Tabs defaultValue="manual" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="manual">Adicionar Manualmente</TabsTrigger>
          <TabsTrigger value="importar">Importar Lista</TabsTrigger>
        </TabsList>

        <TabsContent value="manual">
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome *</Label>
                  <Input
                    id="nome"
                    value={formData.nome}
                    onChange={(e) => handleInputChange("nome", e.target.value)}
                    placeholder="Nome completo"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="email@exemplo.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telefone">Telefone *</Label>
                  <Input
                    id="telefone"
                    value={formData.telefone}
                    onChange={(e) => handleInputChange("telefone", e.target.value)}
                    placeholder="(11) 99999-9999"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cidade">Cidade</Label>
                  <Input
                    id="cidade"
                    value={formData.cidade}
                    onChange={(e) => handleInputChange("cidade", e.target.value)}
                    placeholder="São Paulo"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tipo_plano">Tipo de Plano</Label>
                  <Select onValueChange={(value) => handleInputChange("tipo_plano", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo de plano" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="individual">Individual</SelectItem>
                      <SelectItem value="familiar">Familiar</SelectItem>
                      <SelectItem value="empresarial">Empresarial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="responsavel">Responsável</Label>
                  <Select onValueChange={(value) => handleInputChange("responsavel_id", parseInt(value))}>
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
                  <Label htmlFor="temperatura">Temperatura</Label>
                  <Select onValueChange={(value) => handleInputChange("temperatura", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a temperatura" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="quente">🔥 Quente</SelectItem>
                      <SelectItem value="morno">🟡 Morno</SelectItem>
                      <SelectItem value="frio">🧊 Frio</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="origem">Origem</Label>
                  <Select onValueChange={(value) => handleInputChange("origem", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a origem" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="site">Site</SelectItem>
                      <SelectItem value="facebook">Facebook</SelectItem>
                      <SelectItem value="google">Google Ads</SelectItem>
                      <SelectItem value="indicacao">Indicação</SelectItem>
                      <SelectItem value="outros">Outros</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="mt-6 space-y-2">
                <Label htmlFor="observacoes">Observações</Label>
                <Textarea
                  id="observacoes"
                  value={formData.observacoes}
                  onChange={(e) => handleInputChange("observacoes", e.target.value)}
                  placeholder="Informações adicionais sobre o lead..."
                  rows={4}
                />
              </div>

              <div className="flex justify-end space-x-4 mt-8">
                <Button variant="outline" asChild>
                  <Link to="/meus-leads">Cancelar</Link>
                </Button>
                <Button 
                  onClick={handleSubmit} 
                  className="bg-blue-600 hover:bg-blue-700"
                  disabled={loading}
                >
                  {loading ? "Adicionando..." : "Adicionar Lead"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="importar">
          <Card>
            <CardContent className="p-6">
              <div className="text-center py-12">
                <p className="text-gray-600 mb-4">Funcionalidade de importação será implementada em breve.</p>
                <Button variant="outline" disabled>
                  Selecionar arquivo CSV
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NovoLead;
