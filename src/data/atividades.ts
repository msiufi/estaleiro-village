export interface Atividade {
  id: string
  title: string
  description: string
  category: "aventura" | "familia" | "natureza" | "cultura"
  distanceKm?: number
}

export const atividadesProximas: Atividade[] = [
  {
    id: "beto-carrero",
    title: "Beto Carrero World",
    description: "O maior parque temático da América Latina, com atrações radicais, shows e mundo Hollywood.",
    category: "familia",
    distanceKm: 40,
  },
  {
    id: "parque-unipraias",
    title: "Parque Unipraias",
    description: "Bondinho panorâmico ligando as praias de Balneário Camboriú com vista 360° do litoral.",
    category: "aventura",
    distanceKm: 12,
  },
  {
    id: "oceanic-aquarium",
    title: "Oceanic Aquarium",
    description: "Aquário temático em Penha com exposições interativas e mais de 250 espécies marinhas.",
    category: "familia",
    distanceKm: 35,
  },
  {
    id: "roda-gigante",
    title: "Roda Gigante FG Big Wheel",
    description: "Uma das maiores rodas-gigantes da América Latina, com vista panorâmica de BC e do oceano.",
    category: "familia",
    distanceKm: 10,
  },
  {
    id: "escola-caes-guia",
    title: "Escola de Cães-Guia",
    description: "Visitação educativa à escola que treina cães-guia para pessoas com deficiência visual.",
    category: "cultura",
    distanceKm: 15,
  },
  {
    id: "parque-raimundo-malta",
    title: "Parque Ecológico Raimundo Malta",
    description: "Área de preservação com trilhas, mirantes e contato direto com a Mata Atlântica.",
    category: "natureza",
    distanceKm: 8,
  },
  {
    id: "centro-balneario",
    title: "Centro de Balneário Camboriú",
    description: "Avenida Atlântica, Praia Central, restaurantes, shoppings e vida noturna a 15 min da pousada.",
    category: "cultura",
    distanceKm: 15,
  },
]

export const atividadesDoLocal = [
  { id: "trilhas", title: "Trilhas na Mata Atlântica", description: "Explore 9.000 m² de reserva privada." },
  { id: "mergulho", title: "Mergulho", description: "Águas cristalinas da Praia do Estaleiro, ideais para snorkeling." },
  { id: "caiaque", title: "Caiaque e stand-up paddle", description: "Aluguel no local para atividades aquáticas." },
  { id: "escunas", title: "Passeios de escuna", description: "Saídas diárias pela costa de BC com parada em ilhas." },
  { id: "natacao", title: "Natação", description: "Praia Bandeira Azul, entre as mais limpas do litoral sul." },
  { id: "ciclismo", title: "Ciclismo", description: "Rotas cênicas pela Avenida Interpraias." },
]
