
import { useState } from "react";
import { Search, Filter, Plus, Frown, User, MapPin, Phone, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Link } from "react-router-dom";

interface Lead {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  cidade: string;
  tipoPlano: string;
  status: "novo" | "contatado" | "interessado" | "fechado";
  responsavel: string;
  origem: string;
  dataCadastro: string;
  temperatura: "quente" | "morno" | "frio";
}

const mockLeads: Lead[] = [
  {
    id: "1",
    nome: "Ana Silva",
    email: "ana.silva@email.com",
    telefone: "(11) 99999-1111",
    cidade: "São Paulo",
    tipoPlano: "Familiar",
    status: "novo",
    responsavel: "João Silva",
    origem: "Site",
    dataCadastro: "2024-01-15",
    temperatura: "quente"
  },
  {
    id: "2",
    nome: "Carlos Santos",
    email: "carlos.santos@email.com",
    telefone: "(21) 99999-2222",
    cidade: "Rio de Janeiro",
    tipoPlano: "Empresarial",
    status: "contatado",
    responsavel: "Maria Santos",
    origem: "Google Ads",
    dataCadastro: "2024-01-14",
    temperatura: "morno"
  },
  {
    id: "3",
    nome: "Fernanda Costa",
    email: "fernanda.costa@email.com",
    telefone: "(31) 99999-3333",
    cidade: "Belo Horizonte",
    tipoPlano: "Individual",
    status: "interessado",
    responsavel: "Pedro Costa",
    origem: "Facebook",
    dataCadastro: "2024-01-13",
    temperatura: "quente"
  }
];

const MeusLeads = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [leads] = useState<Lead[]>(mockLeads);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "novo": return "bg-blue-100 text-blue-700";
      case "contatado": return "bg-yellow-100 text-yellow-700";
      case "interessado": return "bg-green-100 text-green-700";
      case "fechado": return "bg-purple-100 text-purple-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getTemperaturaColor = (temperatura: string) => {
    switch (temperatura) {
      case "quente": return "bg-red-100 text-red-700";
      case "morno": return "bg-orange-100 text-orange-700";
      case "frio": return "bg-blue-100 text-blue-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const filteredLeads = leads.filter(lead =>
    lead.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.responsavel.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Meus Leads</h1>
          <p className="text-gray-600 mt-1">Gerencie todos os seus leads em um só lugar.</p>
        </div>
        <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
          <Link to="/novo-lead">
            <Plus className="w-4 h-4 mr-2" />
            Novo Lead
          </Link>
        </Button>
      </div>

      {/* Filtros */}
      <Card className="bg-white">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Buscar lead..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="novo">Novo</SelectItem>
                <SelectItem value="contatado">Contatado</SelectItem>
                <SelectItem value="interessado">Interessado</SelectItem>
                <SelectItem value="fechado">Fechado</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Responsável" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="joao">João Silva</SelectItem>
                <SelectItem value="maria">Maria Santos</SelectItem>
                <SelectItem value="pedro">Pedro Costa</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Temperatura" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="quente">Quente</SelectItem>
                <SelectItem value="morno">Morno</SelectItem>
                <SelectItem value="frio">Frio</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tabela de Leads */}
      {filteredLeads.length > 0 ? (
        <Card className="bg-white">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Lead</TableHead>
                  <TableHead>Contato</TableHead>
                  <TableHead>Responsável</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Temperatura</TableHead>
                  <TableHead>Tipo de Plano</TableHead>
                  <TableHead>Data Cadastro</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLeads.map((lead) => (
                  <TableRow key={lead.id} className="hover:bg-gray-50">
                    <TableCell>
                      <div>
                        <p className="font-medium text-gray-900">{lead.nome}</p>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <MapPin className="w-3 h-3 mr-1" />
                          {lead.cidade}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <p className="text-sm text-gray-900">{lead.email}</p>
                        <div className="flex items-center text-sm text-gray-500">
                          <Phone className="w-3 h-3 mr-1" />
                          {lead.telefone}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="bg-blue-100 text-blue-600 text-xs">
                            {lead.responsavel.split(' ').map(n => n[0]).join('').toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium">{lead.responsavel}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(lead.status)}>
                        {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getTemperaturaColor(lead.temperatura)}>
                        {lead.temperatura.charAt(0).toUpperCase() + lead.temperatura.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{lead.tipoPlano}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="w-3 h-3 mr-1" />
                        {new Date(lead.dataCadastro).toLocaleDateString('pt-BR')}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : (
        <Card className="bg-white">
          <CardContent className="py-16">
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Frown className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Nenhum lead encontrado</h3>
              <p className="text-gray-600 mb-6">Não encontramos leads que correspondam aos filtros selecionados.</p>
              <Button variant="outline" className="text-blue-600 border-blue-200 hover:bg-blue-50">
                Limpar filtros
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MeusLeads;
