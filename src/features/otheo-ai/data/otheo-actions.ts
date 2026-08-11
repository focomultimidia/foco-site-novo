import type { ComponentType } from "react";
import type React from "react";
import {
  DoorOpen,
  DoorClosed,
  CalendarRange,
  CalendarDays,
  LogIn,
  LogOut,
  Search,
  ReceiptText,
  CalendarPlus,
  CalendarMinus,
  Ban,
  MessageSquarePlus,
  Send,
  ClipboardCheck,
  Wallet,
  Percent,
  StickyNote,
  CreditCard,
  ClipboardList,
  Users,
  Star,
  BadgeCheck,
  Wrench,
  MapPinned,
  FileSpreadsheet,
  BarChart3,
} from "lucide-react";

export type AcaoStatus = "pronto" | "em-construcao" | "pendente";

type IconType = ComponentType<{ className?: string; style?: React.CSSProperties; strokeWidth?: number }>;

export interface OtheoAcao {
  id: string;
  label: string;
  /** Frase que preenche o Omnibox quando o card é clicado. */
  template: string;
  Icone: IconType;
  status: AcaoStatus;
}

export interface OtheoGrupo {
  id: string;
  titulo: string;
  descricao: string;
  Icone: IconType;
  acoes: OtheoAcao[];
}

// ── Grupo 1 — Controle de Venda e Inventário ───────────────────────────────────
const grupoVendaInventario: OtheoGrupo = {
  id: "venda-inventario",
  titulo: "Venda & Inventário",
  descricao: "Controle quando e como seu inventário fica disponível para venda.",
  Icone: ClipboardList,
  acoes: [
    { id: "abrir-venda", label: "Abertura de venda", template: "Abrir a venda de ", Icone: DoorOpen, status: "pronto" },
    { id: "fechar-venda", label: "Fechamento de venda", template: "Fechar a venda de ", Icone: DoorClosed, status: "pronto" },
    { id: "editar-min-dias", label: "Editar mínimo de dias", template: "Editar o mínimo de dias de ", Icone: CalendarRange, status: "pronto" },
    { id: "editar-max-dias", label: "Editar máximo de dias", template: "Editar o máximo de dias de ", Icone: CalendarDays, status: "pronto" },
    { id: "fechar-checkin", label: "Fechar o check-in", template: "Fechar o check-in de ", Icone: LogIn, status: "pronto" },
    { id: "fechar-checkout", label: "Fechar o check-out", template: "Fechar o check-out de ", Icone: LogOut, status: "pronto" },
    { id: "consultar-disponibilidade", label: "Consultar disponibilidade", template: "Consultar a disponibilidade de ", Icone: Search, status: "em-construcao" },
  ],
};

// ── Grupo 2 — Gestão de Reservas e Valores ─────────────────────────────────────
const grupoReservasValores: OtheoGrupo = {
  id: "reservas-valores",
  titulo: "Reservas & Valores",
  descricao: "Ajuste reservas existentes sem sair da conversa.",
  Icone: Wallet,
  acoes: [
    { id: "alterar-valores", label: "Alterar valores", template: "Alterar o valor da reserva ", Icone: Percent, status: "pronto" },
    { id: "adicionar-dias-reserva", label: "Adicionar dias à reserva", template: "Adicionar dias à reserva ", Icone: CalendarPlus, status: "pendente" },
    { id: "diminuir-dias-reserva", label: "Diminuir dias à reserva", template: "Diminuir dias da reserva ", Icone: CalendarMinus, status: "pendente" },
    { id: "cancelar-reserva", label: "Cancelar a reserva", template: "Cancelar a reserva ", Icone: Ban, status: "pronto" },
    { id: "adicionar-observacoes", label: "Adicionar observações", template: "Adicionar uma observação na reserva ", Icone: MessageSquarePlus, status: "pendente" },
    { id: "reenviar-voucher", label: "Reenviar voucher", template: "Reenviar o voucher da reserva ", Icone: Send, status: "pronto" },
    { id: "fazer-checkin", label: "Fazer check-in", template: "Fazer o check-in da reserva ", Icone: ClipboardCheck, status: "em-construcao" },
    { id: "fazer-checkout", label: "Fazer check-out", template: "Fazer o check-out da reserva ", Icone: ClipboardCheck, status: "em-construcao" },
  ],
};

// ── Grupo 3 — Consulta Profunda de Dados ───────────────────────────────────────
// Não são "ações" (nada é executado) — cada item aqui é um campo consultável.
// Renderizados como chips, não cards, num tratamento visual mais leve.
export interface OtheoConsulta {
  id: string;
  label: string;
  template: string;
}

const consultasReserva: OtheoConsulta[] = [
  { id: "detalhes", label: "Detalhes da reserva", template: "Consultar os detalhes da reserva " },
  { id: "saldo", label: "Saldo", template: "Consultar o saldo da reserva " },
  { id: "valor-total", label: "Valor total", template: "Consultar o valor total da reserva " },
  { id: "valor-sem-consumo", label: "Valor sem consumo", template: "Consultar o valor sem consumo da reserva " },
  { id: "valor-com-consumo", label: "Valor com consumo", template: "Consultar o valor com consumo da reserva " },
  { id: "observacoes", label: "Observações", template: "Consultar as observações da reserva " },
  { id: "status-pagamento", label: "Status do pagamento", template: "Consultar o status do pagamento da reserva " },
  { id: "status-reserva", label: "Status da reserva", template: "Consultar o status da reserva " },
  { id: "hospedes", label: "Hóspedes", template: "Consultar os hóspedes da reserva " },
  { id: "avaliacoes", label: "Avaliações", template: "Consultar as avaliações da reserva " },
];

const grupoConsultaDados: OtheoGrupo & { consultas: OtheoConsulta[] } = {
  id: "consulta-dados",
  titulo: "Consulta Profunda de Dados",
  descricao: "Pergunte qualquer coisa sobre uma reserva — o Theo busca na hora.",
  Icone: Search,
  acoes: [],
  consultas: consultasReserva,
};

// ── Grupo 4 — Gestão Espacial e Operacional ────────────────────────────────────
const grupoGestaoEspacial: OtheoGrupo = {
  id: "gestao-espacial",
  titulo: "Bloqueios & Manutenções",
  descricao: "Gerencie o mapa operacional do seu hotel, com ou sem clicar num quarto.",
  Icone: Wrench,
  acoes: [
    { id: "fazer-bloqueio", label: "Fazer bloqueio", template: "Fazer um bloqueio em ", Icone: Ban, status: "pronto" },
    { id: "editar-bloqueio", label: "Editar bloqueio", template: "Editar o bloqueio em ", Icone: Wrench, status: "pronto" },
    { id: "dias-bloqueio", label: "Adicionar/diminuir dias de bloqueio", template: "Alterar os dias do bloqueio em ", Icone: CalendarRange, status: "pronto" },
    { id: "remover-bloqueio", label: "Remover bloqueio", template: "Remover o bloqueio em ", Icone: Ban, status: "pronto" },
    { id: "fazer-manutencao", label: "Fazer manutenção", template: "Fazer uma manutenção em ", Icone: Wrench, status: "pronto" },
    { id: "editar-manutencao", label: "Editar manutenção", template: "Editar a manutenção em ", Icone: Wrench, status: "pronto" },
    { id: "dias-manutencao", label: "Adicionar/diminuir dias de manutenção", template: "Alterar os dias da manutenção em ", Icone: CalendarRange, status: "pronto" },
    { id: "remover-manutencao", label: "Remover manutenção", template: "Remover a manutenção em ", Icone: Wrench, status: "pronto" },
    { id: "mapa-operacional", label: "Ver mapa operacional", template: "__ABRIR_MAPA__", Icone: MapPinned, status: "pronto" },
  ],
};

// ── Grupo 5 — Inteligência e Exportação ────────────────────────────────────────
const grupoInteligenciaExportacao: OtheoGrupo = {
  id: "inteligencia-exportacao",
  titulo: "Inteligência & Exportação",
  descricao: "Tire os números da tela e leve para onde precisar.",
  Icone: BarChart3,
  acoes: [
    { id: "excel-reservas", label: "Gerar Excel de reservas", template: "Gerar um Excel das reservas de ", Icone: FileSpreadsheet, status: "pronto" },
    { id: "insights-relatorios", label: "Insights em relatórios", template: "Gerar insights sobre ", Icone: BarChart3, status: "em-construcao" },
  ],
};

export const OTHEO_GRUPOS: OtheoGrupo[] = [
  grupoVendaInventario,
  grupoReservasValores,
  grupoGestaoEspacial,
  grupoInteligenciaExportacao,
];

export const OTHEO_CONSULTAS = grupoConsultaDados;

// ── Placeholders de sugestão para o Omnibox (rotativos) ────────────────────────
export const OMNIBOX_PLACEHOLDERS = [
  "Consultar saldo da reserva 123",
  "Fechar o check-in de amanhã",
  "Cancelar a reserva 456",
  "Gerar um Excel das reservas de outubro",
  "Fazer um bloqueio no quarto 12",
];

// ── Ícones de status compartilhados ─────────────────────────────────────────────
export { StickyNote, CreditCard, Users, Star, BadgeCheck, ReceiptText };
