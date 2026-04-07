export interface EventType {
  id: string
  icon: string
  title: string
  description: string
}

export const eventTypes: EventType[] = [
  {
    id: "casamentos",
    icon: "Heart",
    title: "Casamentos & Comemoracoes",
    description:
      "Realize seu sonho a beira-mar com cerimonias intimas e inesqueciveis em um cenario natural unico.",
  },
  {
    id: "corporativo",
    icon: "Briefcase",
    title: "Confraternizacoes Corporativas",
    description:
      "Ambiente exclusivo e infraestrutura completa para reunir sua equipe em um retiro diferenciado.",
  },
  {
    id: "retiros",
    icon: "TreePine",
    title: "Retiros e Grupos",
    description:
      "Espaco ideal para grupos que buscam reconexao com a natureza, paz e bem-estar coletivo.",
  },
  {
    id: "reunioes",
    icon: "Users",
    title: "Reunioes e Workshops",
    description:
      "Ambiente inspirador para reunioes produtivas, workshops e treinamentos fora do escritorio.",
  },
]

export const statsItems = [
  { value: "Ate 100", label: "pessoas" },
  { value: "A beira-mar", label: "espaco exclusivo" },
  { value: "Infraestrutura", label: "completa" },
]
