
import { Users, TrendingUp, DollarSign, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Relatorios = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Relatórios</h1>
        <p className="text-gray-600 mt-1">Visualize o desempenho dos seus leads e vendas</p>
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
            <p className="text-xs text-green-600 mt-1">+0% desde o mês passado</p>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Leads Convertidos</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">0</div>
            <p className="text-xs text-green-600 mt-1">+0% desde o mês passado</p>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Taxa de Conversão</CardTitle>
            <Target className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">0%</div>
            <p className="text-xs text-green-600 mt-1">+0% desde o mês passado</p>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Receita Estimada</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">R$ 0</div>
            <p className="text-xs text-green-600 mt-1">+0% desde o mês passado</p>
          </CardContent>
        </Card>
      </div>

      {/* Relatórios detalhados */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Leads por Status</CardTitle>
            <p className="text-sm text-gray-600">Distribuição dos seus leads por status atual</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Novos</span>
                <span className="text-sm text-gray-600">0</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Em andamento</span>
                <span className="text-sm text-gray-600">0</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Fechados</span>
                <span className="text-sm text-gray-600">0</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Perdidos</span>
                <span className="text-sm text-gray-600">0</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Leads por Cidade</CardTitle>
            <p className="text-sm text-gray-600">Origem geográfica dos seus leads</p>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-gray-500">
              <p>Nenhum dado disponível ainda</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Relatorios;
