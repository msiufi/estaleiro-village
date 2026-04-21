export type RoomCategory = "suite" | "studio" | "flat" | "chale" | "sobrado" | "loft" | "duplex"

export interface RoomType {
  id: string
  name: string
  type: RoomCategory
  shortDescription: string
  longDescription: string
  capacity: { adults: number; children: number }
  beds: string
  areaM2?: number
  view: "mar" | "jardim" | "mata" | "mista"
  hasKitchen: boolean
  amenities: string[]
  highlights: string[]
  mainImage: string
  gallery: string[]
  priceFrom: number
  petFriendly: boolean
}

export const roomTypeLabels: Record<RoomType["type"], string> = {
  suite: "Suítes",
  studio: "Studios",
  flat: "Flats",
  chale: "Chalés",
  sobrado: "Sobrados",
  loft: "Lofts",
  duplex: "Duplex",
}

export const rooms: RoomType[] = [
  {
    id: "suite-jardim",
    name: "Suíte Jardim",
    type: "suite",
    shortDescription:
      "Suíte aconchegante no térreo com sacada privativa e vista para o jardim da pousada.",
    longDescription:
      "Ideal para casais em busca de tranquilidade, a Suíte Jardim oferece uma cama de casal, decoração em tons naturais e acesso direto ao jardim exuberante da pousada. Pet friendly e climatizada, é o refúgio perfeito para desacelerar ao som do mar.",
    capacity: { adults: 2, children: 0 },
    beds: "1 cama de casal",
    view: "jardim",
    hasKitchen: false,
    amenities: ["Wi-Fi", "Ar-condicionado", "TV", "Frigobar", "Sacada privativa", "Roupas de cama e banho"],
    highlights: ["Ideal para casais", "Acesso ao jardim", "Pet friendly"],
    mainImage: "/assets/images/jardim_202.jpg",
    gallery: ["/assets/images/jardim_202.jpg", "/assets/images/47aad0_33762d8f54c04590aeb08d2109eceeb3_mv2.png"],
    priceFrom: 320,
    petFriendly: true,
  },
  {
    id: "studio",
    name: "Studio",
    type: "studio",
    shortDescription:
      "Studio aconchegante com mini cozinha equipada, ideal para estadias independentes.",
    longDescription:
      "Studio de térreo com vista ao jardim, cama queen, copa com mini geladeira, microondas e fogão. Espaço pensado para casais que querem autonomia durante a estadia. Pet friendly e com toda a comodidade do casal.",
    capacity: { adults: 2, children: 0 },
    beds: "1 cama queen",
    view: "jardim",
    hasKitchen: true,
    amenities: ["Wi-Fi", "Ar-condicionado", "TV", "Mini cozinha", "Microondas", "Fogão", "Frigobar"],
    highlights: ["Mini cozinha", "Pet friendly", "Vista ao jardim"],
    mainImage: "/assets/images/Studio_20Sup_20cama.jpg",
    gallery: ["/assets/images/Studio_20Sup_20cama.jpg", "/assets/images/IMG_20251125_150745.jpg"],
    priceFrom: 340,
    petFriendly: true,
  },
  {
    id: "studio-superior",
    name: "Studio Superior",
    type: "studio",
    shortDescription:
      "Studio no primeiro piso com copa equipada, sala integrada e mais espaço para casais.",
    longDescription:
      "Acomodação superior com copa completa (geladeira, microondas, fogão), sala integrada e cama queen. Ideal para casais que preferem estadias de mais dias com autonomia e privacidade, em andar elevado com melhor ventilação.",
    capacity: { adults: 2, children: 1 },
    beds: "1 cama queen",
    view: "jardim",
    hasKitchen: true,
    amenities: ["Wi-Fi", "Ar-condicionado", "TV", "Copa equipada", "Sala integrada", "Frigobar", "Sacada"],
    highlights: ["Sala integrada", "Copa completa", "Primeiro piso"],
    mainImage: "/assets/images/Studio_20Sup_20cama.jpg",
    gallery: ["/assets/images/Studio_20Sup_20cama.jpg", "/assets/images/IMG_20251125_150745.jpg"],
    priceFrom: 380,
    petFriendly: true,
  },
  {
    id: "flat",
    name: "Flat",
    type: "flat",
    shortDescription:
      "Flat amplo com mini cozinha, varanda com rede e espaço para até 4 pessoas.",
    longDescription:
      "Flat espaçoso com cama queen, mini cozinha equipada e varanda com rede — perfeito para quem quer relaxar entre mergulhos no mar. Permite cama extra para acomodar até 4 hóspedes.",
    capacity: { adults: 2, children: 2 },
    beds: "1 cama queen + opção de cama extra",
    view: "mista",
    hasKitchen: true,
    amenities: ["Wi-Fi", "Ar-condicionado", "TV", "Mini cozinha", "Varanda com rede", "Frigobar"],
    highlights: ["Varanda com rede", "Cama extra disponível", "Pet friendly"],
    mainImage: "/assets/images/flat1.jpg",
    gallery: ["/assets/images/flat1.jpg", "/assets/images/frente_20mar_202.jpg"],
    priceFrom: 420,
    petFriendly: true,
  },
  {
    id: "loft",
    name: "Loft",
    type: "loft",
    shortDescription:
      "Loft no primeiro piso com cozinha conjugada e sacada com rede para descansar ao ar livre.",
    longDescription:
      "Ambiente integrado com cozinha equipada, cama queen e sacada com rede. A vista para o jardim e a brisa do mar tornam o Loft um dos favoritos de casais que buscam aconchego em estadias curtas ou prolongadas.",
    capacity: { adults: 2, children: 0 },
    beds: "1 cama queen",
    view: "jardim",
    hasKitchen: true,
    amenities: ["Wi-Fi", "Ar-condicionado", "TV", "Cozinha conjugada", "Sacada com rede", "Frigobar"],
    highlights: ["Sacada com rede", "Cozinha integrada", "Primeiro piso"],
    mainImage: "/assets/images/flat1.jpg",
    gallery: ["/assets/images/flat1.jpg", "/assets/images/jardim_202.jpg"],
    priceFrom: 440,
    petFriendly: true,
  },
  {
    id: "suite-frente-mar",
    name: "Suíte Frente Mar",
    type: "suite",
    shortDescription:
      "Nossa suíte mais exclusiva, com vista panorâmica para o oceano e opção de hidromassagem.",
    longDescription:
      "Suíte premium com vista direta para o mar da Praia do Estaleiro. Disponível em duas configurações: uma cama king-size ou duas camas de solteiro. Algumas unidades contam com banheira de hidromassagem — consulte na reserva.",
    capacity: { adults: 2, children: 1 },
    beds: "1 cama king ou 2 camas de solteiro",
    view: "mar",
    hasKitchen: false,
    amenities: ["Wi-Fi", "Ar-condicionado", "TV", "Frigobar", "Vista mar", "Hidromassagem (consultar)"],
    highlights: ["Vista panorâmica ao mar", "Hidromassagem disponível", "Opção king ou solteiro"],
    mainImage: "/assets/images/frente_20mar_202.jpg",
    gallery: ["/assets/images/frente_20mar_202.jpg", "/assets/images/54661554235_216e580305.jpg"],
    priceFrom: 680,
    petFriendly: true,
  },
  {
    id: "torre-oceano",
    name: "Torre Oceano",
    type: "duplex",
    shortDescription:
      "Duplex de luxo com sala no térreo e suíte superior com vista 270° ao oceano.",
    longDescription:
      "Torre Oceano é um duplex exclusivo: sala integrada no primeiro piso e suíte no andar superior, com vista 270° ao oceano. Cama king, mini cozinha completa e a experiência mais cinematográfica da pousada — ideal para aniversários e lua de mel.",
    capacity: { adults: 2, children: 0 },
    beds: "1 cama king",
    view: "mar",
    hasKitchen: true,
    amenities: ["Wi-Fi", "Ar-condicionado", "TV", "Mini cozinha", "Vista 270° ao oceano", "Duplex"],
    highlights: ["Duplex com sala separada", "Vista 270° ao oceano", "Ideal lua de mel"],
    mainImage: "/assets/images/frente_20mar_202.jpg",
    gallery: ["/assets/images/frente_20mar_202.jpg", "/assets/images/54661554235_216e580305.jpg"],
    priceFrom: 780,
    petFriendly: true,
  },
  {
    id: "chale-b",
    name: "Chalé B",
    type: "chale",
    shortDescription:
      "Chalé familiar com 2 dormitórios, cozinha equipada e espaço para até 4 pessoas.",
    longDescription:
      "Perfeito para famílias: dois dormitórios com camas queen, sala, cozinha completa e área privativa cercada pela mata nativa. Pet friendly, com estacionamento próprio e churrasqueira opcional.",
    capacity: { adults: 4, children: 2 },
    beds: "2 camas queen",
    view: "mata",
    hasKitchen: true,
    amenities: ["Wi-Fi", "Ar-condicionado", "TV", "Cozinha equipada", "2 dormitórios", "Estacionamento"],
    highlights: ["2 dormitórios", "Família", "Pet friendly"],
    mainImage: "/assets/images/sobrado_20ricardo.jpg",
    gallery: ["/assets/images/sobrado_20ricardo.jpg", "/assets/images/jardim_202.jpg"],
    priceFrom: 520,
    petFriendly: true,
  },
  {
    id: "chale-c",
    name: "Chalé C",
    type: "chale",
    shortDescription:
      "Chalé amplo de 70 m² com 3 dormitórios, lavabo e ideal para grupos até 5 pessoas.",
    longDescription:
      "Chalé de 70 m² com três dormitórios (3 camas de solteiro ou 2 camas queen conforme configuração), lavabo extra, sala espaçosa e cozinha completa. Ideal para grupos de amigos ou famílias estendidas.",
    capacity: { adults: 5, children: 2 },
    areaM2: 70,
    beds: "3 camas de solteiro ou 2 camas queen",
    view: "mata",
    hasKitchen: true,
    amenities: ["Wi-Fi", "Ar-condicionado", "TV", "Cozinha equipada", "3 dormitórios", "Lavabo", "Estacionamento"],
    highlights: ["70 m²", "3 dormitórios", "Lavabo extra"],
    mainImage: "/assets/images/sobrado_20ricardo.jpg",
    gallery: ["/assets/images/sobrado_20ricardo.jpg", "/assets/images/jardim_202.jpg"],
    priceFrom: 620,
    petFriendly: true,
  },
  {
    id: "duplex-c",
    name: "Duplex C",
    type: "duplex",
    shortDescription:
      "Sobrado duplex de 70 m² com 1 suíte + 2 quartos, ideal para grupos até 6 pessoas.",
    longDescription:
      "Sobrado duplex com 70 m², distribuído em 1 suíte master + 2 quartos (6 camas de solteiro ou 3 de casal). Perfeito para viagens em grupo: cozinha completa, dois andares, privacidade entre quartos e espaço comum amplo.",
    capacity: { adults: 6, children: 2 },
    areaM2: 70,
    beds: "6 camas de solteiro ou 3 de casal",
    view: "mata",
    hasKitchen: true,
    amenities: ["Wi-Fi", "Ar-condicionado", "TV", "Cozinha equipada", "Duplex", "1 suíte + 2 quartos"],
    highlights: ["Sobrado duplex", "70 m²", "Grupos até 6"],
    mainImage: "/assets/images/sobrado_20ricardo.jpg",
    gallery: ["/assets/images/sobrado_20ricardo.jpg", "/assets/images/jardim_202.jpg"],
    priceFrom: 720,
    petFriendly: true,
  },
  {
    id: "sobrado-frente-mar",
    name: "Sobrado Frente Mar",
    type: "sobrado",
    shortDescription:
      "Nossa acomodação mais exclusiva: sobrado com vista mar, hidromassagem e churrasqueira privativa.",
    longDescription:
      "A jóia da pousada. Sobrado com vista frontal ao mar no andar superior, banheira de hidromassagem, churrasqueira privativa e cama queen + cama de solteiro opcional. Único no complexo com banheira e churrasqueira — a experiência mais completa para casais que buscam exclusividade.",
    capacity: { adults: 2, children: 1 },
    beds: "1 cama queen + 1 cama de solteiro (opcional)",
    view: "mar",
    hasKitchen: true,
    amenities: ["Wi-Fi", "Ar-condicionado", "TV", "Cozinha equipada", "Hidromassagem", "Churrasqueira privativa", "Vista mar"],
    highlights: ["Hidromassagem", "Churrasqueira privativa", "Vista mar superior"],
    mainImage: "/assets/images/frente_20mar_202.jpg",
    gallery: ["/assets/images/frente_20mar_202.jpg", "/assets/images/54661554235_216e580305.jpg", "/assets/images/sobrado_20ricardo.jpg"],
    priceFrom: 880,
    petFriendly: true,
  },
]
