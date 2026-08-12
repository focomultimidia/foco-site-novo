// Metadados do sumário — mesma numeração e ordem do documento original,
// usados tanto pela navegação lateral (desktop) quanto pelo sumário
// recolhível (mobile). O `id` bate exatamente com o `id` de cada
// <section> em components/policy-content.tsx (âncora de scroll).

export interface TocSection {
  id: string;
  numero: string;
  titulo: string;
}

export const tocSections: TocSection[] = [
  { id: "objetivo",              numero: "01", titulo: "Objetivo" },
  { id: "dados-coletados",       numero: "02", titulo: "Quais dados são coletados?" },
  { id: "dados-faciais",         numero: "03", titulo: "Políticas de dados faciais" },
  { id: "criancas-adolescentes", numero: "04", titulo: "Crianças e adolescentes" },
  { id: "finalidades",           numero: "05", titulo: "Finalidades do tratamento" },
  { id: "compartilhamento",      numero: "06", titulo: "Compartilhamento de dados" },
  { id: "conservacao",           numero: "07", titulo: "Conservação de dados" },
  { id: "alteracao-exclusao",    numero: "08", titulo: "Alteração e exclusão de dados" },
  { id: "seguranca",             numero: "09", titulo: "Segurança dos dados" },
  { id: "alteracoes-politica",   numero: "10", titulo: "Alterações a esta política" },
  { id: "lei-aplicavel",         numero: "11", titulo: "Lei aplicável" },
  { id: "periodicidade",         numero: "12", titulo: "Periodicidade de revisão" },
  { id: "fale-conosco",          numero: "13", titulo: "Fale conosco" },
  { id: "referencias",           numero: "14", titulo: "Referências" },
];
