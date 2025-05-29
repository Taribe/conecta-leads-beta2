
import { Users, TrendingUp, CheckCircle, TrendingDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Visão geral do seu desempenho e leads ativos.</p>
        </div>
        <div className="flex items-center space-x-3">
          <Select defaultValue="este-mes">
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="este-mes">Este mês</SelectItem>
              <SelectItem value="mes-passado">Mês passado</SelectItem>
              <SelectItem value="ultimos-3-meses">Últimos 3 meses</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Métricas principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white border border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total de Leads</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">0</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <TrendingUp className="w-3 h-3 mr-1" />
              0% que mês passado
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Leads em Andamento</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">0</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <TrendingUp className="w-3 h-3 mr-1" />
              0% do total
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Vendas Fechadas</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">0</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <TrendingUp className="w-3 h-3 mr-1" />
              0% que mês passado
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Taxa de Conversão</CardTitle>
            <TrendingDown className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">0%</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <TrendingUp className="w-3 h-3 mr-1" />
              0% que mês passado
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Desempenho Mensal e Leads Recentes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">Desempenho Mensal</CardTitle>
              <Tabs defaultValue="leads" className="w-auto">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="leads">Leads</TabsTrigger>
                  <TabsTrigger value="conversoes">Conversões</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center text-gray-500 bg-gray-50 rounded-lg">
              Gráfico de desempenho mensal aqui
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold">Leads Recentes</CardTitle>
            <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
              Ver todos
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-center py-8">
                <Button variant="outline" className="text-blue-600 border-blue-200 hover:bg-blue-50">
                  + Adicionar Novo Lead
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
