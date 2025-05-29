
import { Bell, CheckCircle, AlertCircle, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const Notificacoes = () => {
  const notifications = [
    {
      id: 1,
      title: "Sistema conectado com sucesso!",
      description: "Sua aplicação está funcionando corretamente e conectada ao banco de dados.",
      time: "Agora mesmo",
      icon: CheckCircle,
      iconColor: "text-blue-500",
    },
    {
      id: 2,
      title: "Pronto para receber leads",
      description: "O sistema está configurado para gerenciar seus leads de forma eficiente.",
      time: "Há 5 minutos",
      icon: CheckCircle,
      iconColor: "text-green-500",
    },
    {
      id: 3,
      title: "Adicione seus primeiros leads",
      description: "Comece criando novos leads ou importando uma lista existente.",
      time: "Há 10 minutos",
      icon: AlertCircle,
      iconColor: "text-yellow-500",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Notificações</h1>
        <p className="text-gray-600 mt-1">Acompanhe todas as atualizações e alertas importantes</p>
      </div>

      {/* Central de Notificações */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Bell className="w-5 h-5 text-blue-600" />
            <CardTitle className="text-lg font-semibold">Central de Notificações</CardTitle>
          </div>
          <p className="text-sm text-gray-600">Você será notificado sobre novos leads, interações e atualizações importantes</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notifications.map((notification, index) => (
              <div key={notification.id}>
                <div className="flex items-start space-x-3">
                  <div className={`mt-1 ${notification.iconColor}`}>
                    <notification.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                    <p className="text-sm text-gray-600 mt-1">{notification.description}</p>
                    <p className="text-xs text-gray-500 mt-2">{notification.time}</p>
                  </div>
                </div>
                {index < notifications.length - 1 && <Separator className="mt-4" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Configurações de Notificação */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Configurações de Notificação</CardTitle>
          <p className="text-sm text-gray-600">Configure como e quando você quer ser notificado</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base font-medium">Novos leads</Label>
                <p className="text-sm text-gray-600">Receber notificação quando um novo lead for adicionado</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base font-medium">Interações com leads</Label>
                <p className="text-sm text-gray-600">Notificações sobre mudanças de status e atividades</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base font-medium">Relatórios semanais</Label>
                <p className="text-sm text-gray-600">Resumo semanal do desempenho dos seus leads</p>
              </div>
              <Switch />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Notificacoes;
