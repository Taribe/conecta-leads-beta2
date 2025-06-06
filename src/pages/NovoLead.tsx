import { useState } from "react";
import { ArrowLeft, Upload, Download, FileText, AlertCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useLeads } from "@/hooks/useLeads";
import { useCorretores } from "@/hooks/useCorretores";
import { useToast } from "@/hooks/use-toast";
import { processCSVFile, ImportedLead } from "@/utils/csvProcessor";

const NovoLead = () => {
  const navigate = useNavigate();
  const { createLead, importLeads } = useLeads();
  const { corretores } = useCorretores();
  const { toast } = useToast();

  // state variables for individual lead
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cidade, setCidade] = useState("");
  const [tipoPlano, setTipoPlano] = useState("");
  const [responsavelId, setResponsavelId] = useState<string>("");
  const [origem, setOrigem] = useState("");
  const [temperatura, setTemperatura] = useState("");
  const [observacoes, setObservacoes] = useState("");
  const [activeTab, setActiveTab] = useState<"individual" | "lista">("individual");

  // import state variables
  const [importFile, setImportFile] = useState<File | null>(null);
  const [importing, setImporting] = useState(false);
  const [importResult, setImportResult] = useState<{
    success: boolean;
    message: string;
    count?: number;
  } | null>(null);

  // handleSubmit function
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
      observacoes: observacoes || null,
      status: "novo" as const
    };

    const result = await createLead(leadData);
    
    if (result?.error) {
      toast({
        title: "Erro",
        description: result.error,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Sucesso",
        description: "Lead criado com sucesso!",
      });
      navigate("/meus-leads");
    }
  };

  // import functions
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const allowedTypes = ['text/csv', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
      const maxSize = 10 * 1024 * 1024; // 10MB

      if (!allowedTypes.includes(file.type) && !file.name.toLowerCase().endsWith('.csv')) {
        toast({
          title: "Arquivo inválido",
          description: "Por favor, selecione um arquivo CSV, XLS ou XLSX.",
          variant: "destructive",
        });
        return;
      }

      if (file.size > maxSize) {
        toast({
          title: "Arquivo muito grande",
          description: "O arquivo deve ter no máximo 10MB.",
          variant: "destructive",
        });
        return;
      }

      setImportFile(file);
      setImportResult(null);
    }
  };

  const handleImport = async () => {
    if (!importFile) {
      toast({
        title: "Erro",
        description: "Por favor, selecione um arquivo para importar.",
        variant: "destructive",
      });
      return;
    }

    setImporting(true);
    setImportResult(null);

    try {
      let processedLeads: ImportedLead[];
      
      if (importFile.name.toLowerCase().endsWith('.csv')) {
        processedLeads = await processCSVFile(importFile);
      } else {
        throw new Error('Apenas arquivos CSV são suportados no momento.');
      }

      // Converter ImportedLead para o formato esperado pelo banco
      const leadsForDatabase = processedLeads.map(lead => ({
        nome: lead.nome,
        email: lead.email,
        telefone: lead.telefone,
        cidade: lead.cidade,
        tipo_plano: lead.tipo_plano,
        responsavel_id: responsavelId ? parseInt(responsavelId) : null,
        status: "novo" as const,
        origem: origem || "Importação",
        temperatura: temperatura || null,
        observacoes: observacoes || null
      }));

      const result = await importLeads(leadsForDatabase);
      
      if (result?.error) {
        setImportResult({
          success: false,
          message: result.error
        });
        toast({
          title: "Erro na importação",
          description: result.error,
          variant: "destructive",
        });
      } else {
        setImportResult({
          success: true,
          message: `${result?.count || 0} leads importados com sucesso!`,
          count: result?.count
        });
        toast({
          title: "Importação concluída",
          description: `${result?.count || 0} leads foram importados com sucesso!`,
        });
        setImportFile(null);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      setImportResult({
        success: false,
        message: errorMessage
      });
      toast({
        title: "Erro na importação",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setImporting(false);
    }
  };

  const downloadTemplate = () => {
    const csvContent = "nome,email,telefone,cidade,tipo_plano\nJoão Silva,joao@email.com,11999999999,São Paulo,Premium\nMaria Santos,maria@email.com,11888888888,Rio de Janeiro,Basic";
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
      {/* header */}
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          onClick={() => navigate("/meus-leads")}
          className="p-2"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Novo Lead</h1>
          <p className="text-gray-600 mt-1">Adicione um novo lead ao sistema.</p>
        </div>
      </div>

      {/* tabs and forms */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
        <button
          onClick={() => setActiveTab("individual")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === "individual"
              ? "bg-white text-blue-600 shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Lead Individual
        </button>
        <button
          onClick={() => setActiveTab("lista")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === "lista"
              ? "bg-white text-blue-600 shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Importar Lista
        </button>
      </div>

      {activeTab === "individual" && (
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
                  Criar Lead
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {activeTab === "lista" && (
        <div className="space-y-6">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Upload className="w-5 h-5" />
                <span>Importar Lista de Leads</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="responsavel-import">Responsável (todos os leads)</Label>
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
                  <Label htmlFor="origem-import">Origem (todos os leads)</Label>
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
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
                <div className="text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-4">
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <span className="mt-2 block text-sm font-medium text-gray-900">
                        Clique para selecionar um arquivo ou arraste e solte
                      </span>
                      <span className="mt-1 block text-sm text-gray-500">
                        CSV, XLS, XLSX até 10MB
                      </span>
                    </label>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      accept=".csv,.xls,.xlsx"
                      onChange={handleFileChange}
                    />
                  </div>
                </div>
              </div>

              {importFile && (
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-8 h-8 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{importFile.name}</p>
                      <p className="text-sm text-gray-500">
                        {(importFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={() => setImportFile(null)}
                    variant="ghost"
                    size="sm"
                  >
                    Remover
                  </Button>
                </div>
              )}

              {importResult && (
                <div className={`p-4 rounded-lg ${importResult.success ? 'bg-green-50' : 'bg-red-50'}`}>
                  <div className="flex items-center space-x-2">
                    {importResult.success ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-red-600" />
                    )}
                    <span className={`text-sm font-medium ${importResult.success ? 'text-green-800' : 'text-red-800'}`}>
                      {importResult.message}
                    </span>
                  </div>
                </div>
              )}

              <div className="flex justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={downloadTemplate}
                  className="flex items-center space-x-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Baixar Modelo CSV</span>
                </Button>
                <Button
                  onClick={handleImport}
                  disabled={!importFile || importing}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {importing ? "Importando..." : "Importar Leads"}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-blue-50">
            <CardContent className="p-6">
              <h3 className="font-medium text-blue-900 mb-2">Instruções para importação:</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• O arquivo deve conter as colunas: nome, email, telefone (obrigatórias)</li>
                <li>• Colunas opcionais: cidade, tipo_plano</li>
                <li>• Use o modelo CSV como referência</li>
                <li>• Máximo de 10MB por arquivo</li>
                <li>• Todos os leads importados terão o mesmo responsável e origem selecionados acima</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default NovoLead;
