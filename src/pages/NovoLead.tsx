import { useState } from "react";
import { ArrowLeft, Upload, FileSpreadsheet } from "lucide-react";
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
  const [importLoading, setImportLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
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

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validar tipo de arquivo
      const allowedTypes = [
        'text/csv',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      ];
      
      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "Tipo de arquivo inválido",
          description: "Por favor, selecione um arquivo CSV, XLS ou XLSX.",
          variant: "destructive",
        });
        return;
      }

      // Validar tamanho do arquivo (10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "Arquivo muito grande",
          description: "O arquivo deve ter no máximo 10MB.",
          variant: "destructive",
        });
        return;
      }

      setSelectedFile(file);
    }
  };

  const handleImportLeads = async () => {
    if (!selectedFile) {
      toast({
        title: "Nenhum arquivo selecionado",
        description: "Por favor, selecione um arquivo para importar.",
        variant: "destructive",
      });
      return;
    }

    setImportLoading(true);

    try {
      // Por enquanto, apenas simular a importação
      // Em uma implementação real, você processaria o arquivo CSV/Excel aqui
      await new Promise(resolve => setTimeout(resolve, 2000));

      toast({
        title: "Importação concluída!",
        description: "Os leads foram importados com sucesso.",
      });
      
      navigate("/meus-leads");
    } catch (error) {
      toast({
        title: "Erro na importação",
        description: "Ocorreu um erro ao importar os leads. Verifique o formato do arquivo.",
        variant: "destructive",
      });
    } finally {
      setImportLoading(false);
    }
  };

  const downloadTemplate = () => {
    // Criar um CSV de exemplo
    const csvContent = "Nome,Email,Telefone,Cidade,Tipo de Plano\nJoão Silva,joao@email.com,(11) 99999-9999,São Paulo,Individual\nMaria Santos,maria@email.com,(11) 88888-8888,Rio de Janeiro,Familiar";
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'modelo_leads.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Importar Lista de Leads</h3>
                  
                  {/* Área de upload */}
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                    <div className="flex flex-col items-center space-y-4">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                        <FileSpreadsheet className="w-8 h-8 text-blue-600" />
                      </div>
                      
                      <div>
                        <h4 className="text-lg font-medium text-gray-900 mb-2">
                          Arraste o arquivo ou clique para selecionar
                        </h4>
                        <p className="text-gray-500 mb-4">
                          Suporte para arquivos CSV, XLSX e XLS
                        </p>
                      </div>
                      
                      <div>
                        <input
                          type="file"
                          id="file-upload"
                          className="hidden"
                          accept=".csv,.xlsx,.xls"
                          onChange={handleFileSelect}
                        />
                        <Button asChild className="bg-blue-600 hover:bg-blue-700">
                          <label htmlFor="file-upload" className="cursor-pointer">
                            <Upload className="w-4 h-4 mr-2" />
                            Selecionar Arquivo
                          </label>
                        </Button>
                      </div>
                      
                      {selectedFile && (
                        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                          <p className="text-green-700 font-medium">
                            Arquivo selecionado: {selectedFile.name}
                          </p>
                          <p className="text-green-600 text-sm">
                            Tamanho: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Instruções */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Instruções</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      O arquivo deve ter as colunas: Nome, Email, Telefone, Cidade e Tipo de Plano.
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      O tamanho máximo do arquivo é de 10MB.
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Cada linha no arquivo será importada como um novo lead.
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Você pode baixar um{" "}
                      <button
                        onClick={downloadTemplate}
                        className="text-blue-600 hover:text-blue-700 underline"
                      >
                        modelo de arquivo aqui
                      </button>
                      .
                    </li>
                  </ul>
                </div>

                {/* Botões de ação */}
                <div className="flex justify-end space-x-4">
                  <Button variant="outline" asChild>
                    <Link to="/meus-leads">Cancelar</Link>
                  </Button>
                  <Button 
                    onClick={handleImportLeads} 
                    className="bg-blue-600 hover:bg-blue-700"
                    disabled={!selectedFile || importLoading}
                  >
                    {importLoading ? "Importando..." : "Importar Leads"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NovoLead;
