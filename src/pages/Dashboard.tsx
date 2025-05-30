
import { Users, TrendingUp, CheckCircle, DollarSign, UserCheck, Phone, Calendar, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const Dashboard = () => {
  const pipelineStages = [
    { name: "Novos Leads", count: 12, value: "R$ 480.000", color: "bg-blue-500", textColor: "text-blue-700" },
    { name: "Tentando Contato", count: 8, value: "R$ 320.000", color: "bg-yellow-500", textColor: "text-yellow-700" },
    { name: "Em Cotação", count: 5, value: "R$ 200.000", color: "bg-orange-500", textColor: "text-orange-700" },
    { name: "Em Negociação", count: 3, value: "R$ 150.000", color: "bg-purple-500", textColor: "text-purple-700" },
    { name: "Contrato Gerado", count: 2, value: "R$ 80.000", color: "bg-green-500", textColor: "text-green-700" },
  ];

  const topCorretores = [
    { name: "Ana Silva", leads: 15, conversoes: 8, meta: 20, avatar: "AS" },
    { name: "Carlos Santos", leads: 12, conversoes: 6, meta: 15, avatar: "CS" },
    { name: "Maria Oliveira", leads: 10, conversoes: 5, meta: 12, avatar: "MO" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Visão geral do desempenho da sua equipe e pipeline de vendas.</p>
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
            <div className="text-2xl font-bold text-gray-900">30</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <TrendingUp className="w-3 h-3 mr-1" />
              +15% que mês passado
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Pipeline Total</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">R$ 1.230.000</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <TrendingUp className="w-3 h-3 mr-1" />
              +8% que mês passado
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Vendas Fechadas</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">19</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <TrendingUp className="w-3 h-3 mr-1" />
              +23% que mês passado
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Taxa de Conversão</CardTitle>
            <Target className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">63%</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <TrendingUp className="w-3 h-3 mr-1" />
              +5% que mês passado
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Pipeline de Vendas */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Pipeline de Vendas</CardTitle>
          <p className="text-gray-600">Acompanhe o progresso dos seus leads através do funil de vendas</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {pipelineStages.map((stage, index) => (
              <div key={stage.name} className="relative">
                <Card className="border-2 border-gray-100 hover:border-gray-200 transition-colors">
                  <CardContent className="p-4">
                    <div className={`w-3 h-3 rounded-full ${stage.color} mb-3`}></div>
                    <h3 className="font-medium text-gray-900 mb-2">{stage.name}</h3>
                    <div className="space-y-1">
                      <div className="text-2xl font-bold text-gray-900">{stage.count}</div>
                      <div className={`text-sm font-medium ${stage.textColor}`}>{stage.value}</div>
                    </div>
                  </CardContent>
                </Card>
                {index < pipelineStages.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-2 transform -translate-y-1/2 text-gray-400">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance da Equipe e Leads Recentes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">Desempenho da Equipe</CardTitle>
              <Tabs defaultValue="leads" className="w-auto">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="leads">Leads</TabsTrigger>
                  <TabsTrigger value="conversoes">Conversões</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topCorretores.map((corretor) => (
                <div key={corretor.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-medium">
                      {corretor.avatar}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{corretor.name}</div>
                      <div className="text-sm text-gray-600">{corretor.leads} leads • {corretor.conversoes} conversões</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">Meta: {corretor.meta}</div>
                    <Progress value={(corretor.leads / corretor.meta) * 100} className="w-20 h-2 mt-1" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold">Atividades Recentes</CardTitle>
            <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
              Ver todas
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium">Lead convertido</div>
                  <div className="text-xs text-gray-600">João Silva • Há 2 horas</div>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Phone className="w-4 h-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium">Contato realizado</div>
                  <div className="text-xs text-gray-600">Maria Oliveira • Há 4 horas</div>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-yellow-600" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium">Reunião agendada</div>
                  <div className="text-xs text-gray-600">Carlos Santos • Há 6 horas</div>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <UserCheck className="w-4 h-4 text-purple-600" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium">Novo lead atribuído</div>
                  <div className="text-xs text-gray-600">Ana Silva • Há 8 horas</div>
                </div>
              </div>

              <div className="pt-4">
                <Button variant="outline" className="w-full text-blue-600 border-blue-200 hover:bg-blue-50">
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
