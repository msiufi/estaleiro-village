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
    title: "Casamentos",
    description:
      "Realize seu sonho à beira-mar com cerimônias íntimas e inesquecíveis em um cenário natural único.",
  },
  {
    id: "aniversarios-infantis",
    icon: "PartyPopper",
    title: "Aniversários Infantis",
    description:
      "Festas ao ar livre com muita natureza, segurança e alegria para crianças e famílias.",
  },
  {
    id: "pet-friendly",
    icon: "PawPrint",
    title: "Eventos Pet Friendly",
    description:
      "Celebre com quem você ama, incluindo seu pet. Espaço adaptado para receber todos os tipos de família.",
  },
  {
    id: "eventos-holisticos",
    icon: "Flower2",
    title: "Eventos Holísticos",
    description:
      "Retiros de yoga, meditação, workshops de bem-estar — nossa conexão com a Mata Atlântica potencializa cada prática.",
  },
  {
    id: "producoes-fotograficas",
    icon: "Camera",
    title: "Produções Fotográficas",
    description:
      "Cenários de mar, mata e arquitetura charmosa. Ideal para ensaios, campanhas e produções de moda.",
  },
  {
    id: "corporativos",
    icon: "Briefcase",
    title: "Eventos Corporativos & Workshops",
    description:
      "Sala com infraestrutura completa para reuniões, treinamentos e confraternizações com sua equipe.",
  },
  {
    id: "eventos-culturais",
    icon: "Music",
    title: "Eventos Culturais",
    description:
      "Shows, saraus, apresentações — um palco natural à beira-mar para experiências culturais memoráveis.",
  },
  {
    id: "festas-fim-de-ano",
    icon: "Sparkles",
    title: "Festas de Fim de Ano",
    description:
      "Confraternizações natalinas e réveillons para empresas e famílias, com vista privilegiada ao mar.",
  },
  {
    id: "exposicoes",
    icon: "Images",
    title: "Exposições",
    description:
      "Espaços para exposições de arte, artesanato e projetos culturais em ambiente integrado à natureza.",
  },
  {
    id: "audiovisuais",
    icon: "Video",
    title: "Produções Audiovisuais",
    description:
      "Locação para filmes, séries, videoclipes e conteúdo digital. Cenários exclusivos à beira-mar.",
  },
]

export const statsItems = [
  { value: "Até 100", label: "pessoas" },
  { value: "À beira-mar", label: "espaço exclusivo" },
  { value: "Infraestrutura", label: "completa" },
]
