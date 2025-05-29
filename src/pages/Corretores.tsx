
import { useState } from "react";
import { Search, Plus, Mail, Phone, MapPin, Edit, Trash2, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface Corretor {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  cidade: string;
  especialidade: string;
  status: "ativo" | "inativo";
  leadsAtivos: number;
  meta: number;
}

const mockCorretores: Corretor[] = [
  {
    id: "1",
    nome: "João Silva",
    email: "joao.silva@conectaleads.com",
    telefone: "(11) 99999-1111",
    cidade: "São Paulo",
    especialidade: "Planos Familiares",
    status: "ativo",
    leadsAtivos: 12,
    meta: 20
  },
  {
    id: "2",
    nome: "Maria Santos",
    email: "maria.santos@conectaleads.com",
    telefone: "(11) 99999-2222",
    cidade: "Rio de Janeiro",
    especialidade: "Planos Empresariais",
    status: "ativo",
    leadsAtivos: 8,
    meta: 15
  },
  {
    id: "3",
    nome: "Pedro Costa",
    email: "pedro.costa@conectaleads.com",
    telefone: "(11) 99999-3333",
    cidade: "Belo Horizonte",
    especialidade: "Planos Individuais",
    status: "inativo",
    leadsAtivos: 0,
    meta: 10
  }
];

const Corretores = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [corretores, setCorretores] = useState<Corretor[]>(mockCorretores);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    cidade: "",
    especialidade: "",
    meta: ""
  });

  const filteredCorretores = corretores.filter(corretor =>
    corretor.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    corretor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    corretor.cidade.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!formData.nome || !formData.email || !formData.telefone) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha nome, email e telefone.",
        variant: "destructive",
      });
      return;
    }

    const novoCorretor: Corretor = {
      id: Date.now().toString(),
      nome: formData.nome,
      email: formData.email,
      telefone: formData.telefone,
      cidade: formData.cidade,
      especialidade: formData.especialidade,
      status: "ativo",
      leadsAtivos: 0,
      meta: parseInt(formData.meta) || 10
    };

    setCorretores(prev => [...prev, novoCorretor]);
    setIsDialogOpen(false);
    setFormData({
      nome: "",
      email: "",
      telefone: "",
      cidade: "",
      especialidade: "",
      meta: ""
    });

    toast({
      title: "Corretor adicionado com sucesso!",
      description: "O novo corretor foi cadastrado no sistema.",
    });
  };

  const toggleStatus = (id: string) => {
    setCorretores(prev => prev.map(corretor => 
      corretor.id === id 
        ? { ...corretor, status: corretor.status === "ativo" ? "inativo" : "ativo" }
        : corretor
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Corretores</h1>
          <p className="text-gray-600 mt-1">Gerencie sua equipe de corretores e suas especialidades.</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Novo Corretor
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Adicionar Novo Corretor</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome</Label>
                  <Input
                    id="nome"
                    value={formData.nome}
                    onChange={(e) => handleInputChange("nome", e.target.value)}
                    placeholder="Nome completo"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="email@exemplo.com"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="telefone">Telefone</Label>
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
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="especialidade">Especialidade</Label>
                  <Select onValueChange={(value) => handleInputChange("especialidade", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a especialidade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Planos Individuais">Planos Individuais</SelectItem>
                      <SelectItem value="Planos Familiares">Planos Familiares</SelectItem>
                      <SelectItem value="Planos Empresariais">Planos Empresariais</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="meta">Meta Mensal</Label>
                  <Input
                    id="meta"
                    type="number"
                    value={formData.meta}
                    onChange={(e) => handleInputChange("meta", e.target.value)}
                    placeholder="10"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700">
                Adicionar Corretor
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filtros */}
      <Card className="bg-white">
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Buscar corretor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Lista de Corretores */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCorretores.map((corretor) => (
          <Card key={corretor.id} className="bg-white">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-blue-100 text-blue-600">
                      {corretor.nome.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-gray-900">{corretor.nome}</h3>
                    <Badge 
                      variant={corretor.status === "ativo" ? "default" : "secondary"}
                      className={corretor.status === "ativo" ? "bg-green-100 text-green-700" : ""}
                    >
                      {corretor.status === "ativo" ? "Ativo" : "Inativo"}
                    </Badge>
                  </div>
                </div>
                <div className="flex space-x-1">
                  <Button variant="ghost" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => toggleStatus(corretor.id)}>
                    <UserCheck className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="w-4 h-4 mr-2" />
                  {corretor.email}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="w-4 h-4 mr-2" />
                  {corretor.telefone}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  {corretor.cidade}
                </div>
                <div className="pt-2">
                  <p className="text-sm font-medium text-gray-900">Especialidade:</p>
                  <p className="text-sm text-gray-600">{corretor.especialidade}</p>
                </div>
                <div className="pt-2 border-t">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Leads Ativos</p>
                      <p className="text-lg font-bold text-blue-600">{corretor.leadsAtivos}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Meta</p>
                      <p className="text-lg font-bold text-gray-600">{corretor.meta}</p>
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${Math.min((corretor.leadsAtivos / corretor.meta) * 100, 100)}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {Math.round((corretor.leadsAtivos / corretor.meta) * 100)}% da meta
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Corretores;
