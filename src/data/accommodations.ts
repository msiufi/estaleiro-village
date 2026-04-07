export interface RoomType {
  id: string
  name: string
  type: "suite" | "studio" | "flat" | "chale"
  description: string
  capacity: { adults: number; children: number }
  amenities: string[]
  mainImage: string
  gallery: string[]
  priceFrom: number
}

export const rooms: RoomType[] = [
  {
    id: "studio-superior",
    name: "Studio Superior",
    type: "studio",
    description:
      "Studio espaçoso com vista privilegiada, cama casal e toda a comodidade para sua estadia.",
    capacity: { adults: 2, children: 1 },
    amenities: ["Wi-Fi", "Ar-condicionado", "TV", "Frigobar", "Varanda"],
    mainImage: "/assets/images/Studio_20Sup_20cama.jpg",
    gallery: [
      "/assets/images/Studio_20Sup_20cama.jpg",
      "/assets/images/IMG_20251125_150745.jpg",
    ],
    priceFrom: 320,
  },
  {
    id: "flat-vista-mar",
    name: "Flat Vista Mar",
    type: "flat",
    description:
      "Flat amplo com vista para o mar, cozinha equipada e ambiente perfeito para famílias.",
    capacity: { adults: 3, children: 2 },
    amenities: [
      "Wi-Fi",
      "Ar-condicionado",
      "TV",
      "Cozinha equipada",
      "Vista mar",
    ],
    mainImage: "/assets/images/flat1.jpg",
    gallery: ["/assets/images/flat1.jpg", "/assets/images/frente_20mar_202.jpg"],
    priceFrom: 420,
  },
  {
    id: "sobrado-jardim",
    name: "Sobrado Jardim",
    type: "chale",
    description:
      "Chalé duplex cercado por natureza, com jardim privativo e espaço ideal para relaxar.",
    capacity: { adults: 4, children: 2 },
    amenities: [
      "Wi-Fi",
      "Ar-condicionado",
      "TV",
      "Jardim privativo",
      "Churrasqueira",
    ],
    mainImage: "/assets/images/sobrado_20ricardo.jpg",
    gallery: [
      "/assets/images/sobrado_20ricardo.jpg",
      "/assets/images/jardim_202.jpg",
    ],
    priceFrom: 580,
  },
  {
    id: "suite-frente-mar",
    name: "Suíte Frente Mar",
    type: "suite",
    description:
      "Nossa suíte mais exclusiva, com acesso direto à praia e vista panorâmica do oceano.",
    capacity: { adults: 2, children: 1 },
    amenities: [
      "Wi-Fi",
      "Ar-condicionado",
      "TV",
      "Banheira",
      "Varanda frente mar",
    ],
    mainImage: "/assets/images/frente_20mar_202.jpg",
    gallery: [
      "/assets/images/frente_20mar_202.jpg",
      "/assets/images/54661554235_216e580305.jpg",
    ],
    priceFrom: 680,
  },
]

export const roomTypeLabels: Record<RoomType["type"], string> = {
  suite: "Suítes",
  studio: "Studios",
  flat: "Flats",
  chale: "Chalés",
}
