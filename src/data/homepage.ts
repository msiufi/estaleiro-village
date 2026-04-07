export interface HeroData {
  headline: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
}

export interface IntroStripItem {
  icon: "waves" | "star" | "treePine";
  label: string;
  description: string;
}

export interface AccommodationPreviewItem {
  id: string;
  name: string;
  description: string;
  image: string;
  href: string;
}

export interface TestimonialItem {
  name: string;
  location: string;
  rating: number;
  text: string;
}

export const heroData: HeroData = {
  headline: "Seu refúgio à beira-mar na Praia do Estaleiro",
  subtitle:
    "Hospede-se entre o verde da mata e o azul do oceano em uma pousada familiar com charme, conforto e 30 anos de história.",
  ctaPrimary: "Conheça as acomodações",
  ctaSecondary: "Fale conosco",
};

export const introStripItems: IntroStripItem[] = [
  {
    icon: "star",
    label: "30 Anos de História",
    description:
      "Uma pousada familiar construída com cuidado, acolhimento e memórias à beira-mar.",
  },
  {
    icon: "waves",
    label: "À Beira-Mar",
    description:
      "A poucos passos da areia, com vista para o oceano e a atmosfera única da Praia do Estaleiro.",
  },
  {
    icon: "treePine",
    label: "Natureza e Tranquilidade",
    description:
      "Jardins, brisa do mar e silêncio para descansar com calma em meio à natureza.",
  },
];

export const accommodationsPreview: AccommodationPreviewItem[] = [
  {
    id: "studio-superior",
    name: "Studio Superior",
    description:
      "Ambiente aconchegante e funcional para casais que buscam conforto com clima intimista.",
    image: "/assets/images/Studio_20Sup_20cama.jpg",
    href: "/acomodacoes",
  },
  {
    id: "flat",
    name: "Flat",
    description:
      "Espaço versátil para estadias mais longas, combinando praticidade e descanso junto ao mar.",
    image: "/assets/images/flat1.jpg",
    href: "/acomodacoes",
  },
  {
    id: "jardim",
    name: "Suíte Jardim",
    description:
      "Uma hospedagem cercada pelo verde, ideal para quem valoriza sossego e contato com a natureza.",
    image: "/assets/images/jardim_202.jpg",
    href: "/acomodacoes",
  },
  {
    id: "chale-sobrado",
    name: "Chalé Sobrado",
    description:
      "Opção charmosa para famílias ou pequenos grupos, com atmosfera acolhedora e privativa.",
    image: "/assets/images/sobrado_20ricardo.jpg",
    href: "/acomodacoes",
  },
];

export const testimonials: TestimonialItem[] = [
  {
    name: "Mariana e Felipe",
    location: "Curitiba, PR",
    rating: 5,
    text:
      "A vista é linda, o atendimento foi extremamente atencioso e a pousada transmite uma paz rara. Foi exatamente o descanso que procurávamos.",
  },
  {
    name: "Renata Souza",
    location: "Porto Alegre, RS",
    rating: 5,
    text:
      "Gostei muito do clima acolhedor e da proximidade com a praia. Café da manhã saboroso, jardim impecável e quartos muito confortáveis.",
  },
  {
    name: "Carlos Menezes",
    location: "São Paulo, SP",
    rating: 5,
    text:
      "Lugar especial para desacelerar. A equipe foi gentil em todos os momentos e o cenário entre mar e natureza faz toda a diferença.",
  },
];
