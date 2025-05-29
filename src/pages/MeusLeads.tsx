
import { useState } from "react";
import { Search, Filter, Plus, Frown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const MeusLeads = () => {
  const [searchTerm, setSearchTerm] = useState("");

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
              <SelectTrigger className="w-full md:w-[200px]">
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
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Cidade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todas</SelectItem>
                <SelectItem value="sao-paulo">São Paulo</SelectItem>
                <SelectItem value="rio-janeiro">Rio de Janeiro</SelectItem>
                <SelectItem value="belo-horizonte">Belo Horizonte</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Tipo de plano" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="individual">Individual</SelectItem>
                <SelectItem value="familiar">Familiar</SelectItem>
                <SelectItem value="empresarial">Empresarial</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Leads Vazia */}
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
    </div>
  );
};

export default MeusLeads;
