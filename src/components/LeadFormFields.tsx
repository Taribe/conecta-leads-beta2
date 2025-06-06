
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface Corretor {
  id: number;
  nome: string;
}

interface LeadFormFieldsProps {
  nome: string;
  setNome: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  telefone: string;
  setTelefone: (value: string) => void;
  cidade: string;
  setCidade: (value: string) => void;
  tipoPlano: string;
  setTipoPlano: (value: string) => void;
  responsavelId: string;
  setResponsavelId: (value: string) => void;
  origem: string;
  setOrigem: (value: string) => void;
  temperatura: string;
  setTemperatura: (value: string) => void;
  status: string;
  setStatus: (value: string) => void;
  observacoes: string;
  setObservacoes: (value: string) => void;
  corretores: Corretor[];
}

const LeadFormFields = ({
  nome,
  setNome,
  email,
  setEmail,
  telefone,
  setTelefone,
  cidade,
  setCidade,
  tipoPlano,
  setTipoPlano,
  responsavelId,
  setResponsavelId,
  origem,
  setOrigem,
  temperatura,
  setTemperatura,
  status,
  setStatus,
  observacoes,
  setObservacoes,
  corretores
}: LeadFormFieldsProps) => {
  return (
    <>
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
            <SelectContent className="bg-white z-50">
              <SelectItem value="">Nenhum</SelectItem>
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
            <SelectContent className="bg-white z-50">
              <SelectItem value="">Nenhum</SelectItem>
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
            <SelectContent className="bg-white z-50">
              <SelectItem value="">Nenhuma</SelectItem>
              <SelectItem value="website">Website</SelectItem>
              <SelectItem value="redes-sociais">Redes Sociais</SelectItem>
              <SelectItem value="telefone">Telefone</SelectItem>
              <SelectItem value="indicacao">Indicação</SelectItem>
              <SelectItem value="evento">Evento</SelectItem>
              <SelectItem value="importacao">Importação</SelectItem>
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
            <SelectContent className="bg-white z-50">
              <SelectItem value="">Nenhuma</SelectItem>
              <SelectItem value="frio">Frio</SelectItem>
              <SelectItem value="morno">Morno</SelectItem>
              <SelectItem value="quente">Quente</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="status">Status *</Label>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione o status" />
            </SelectTrigger>
            <SelectContent className="bg-white z-50">
              <SelectItem value="novo">Novo</SelectItem>
              <SelectItem value="contatado">Contatado</SelectItem>
              <SelectItem value="interessado">Interessado</SelectItem>
              <SelectItem value="proposta">Proposta Enviada</SelectItem>
              <SelectItem value="negociacao">Em Negociação</SelectItem>
              <SelectItem value="fechado">Fechado</SelectItem>
              <SelectItem value="perdido">Perdido</SelectItem>
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
    </>
  );
};

export default LeadFormFields;
