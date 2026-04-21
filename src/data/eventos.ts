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
    title: "Casamentos & Comemorações",
    description:
      "Realize seu sonho a beira-mar com cerimônias intimas e inesquecíveis em um cenário natural único.",
  },
  {
    id: "corporativo",
    icon: "Briefcase",
    title: "Confraternizações Corporativas",
    description:
      "Ambiente exclusivo e infraestrutura completa para reunir sua equipe em um retiro diferenciado.",
  },
  {
    id: "retiros",
    icon: "TreePine",
    title: "Retiros e Grupos",
    description:
      "Espaço ideal para grupos que buscam reconexão com a natureza, paz e bem-estar coletivo.",
  },
  {
    id: "reunioes",
    icon: "Users",
    title: "Reuniões e Workshops",
    description:
      "Ambiente inspirador para reuniões produtivas, workshops e treinamentos fora do escritorio.",
  },
]

export const statsItems = [
  { value: "Até 100", label: "pessoas" },
  { value: "À beira-mar", label: "espaço exclusivo" },
  { value: "Infraestrutura", label: "completa" },
]
