export interface GaleriaItem {
  src: string
  alt: string
  category: "acomodacoes" | "praia" | "pousada" | "eventos" | "gastronomia"
}

export const galeriaItems: GaleriaItem[] = [
  // Pousada / exterior
  { src: "/assets/images/exterior-jardim/exterior-jardim-01.jpg", alt: "Jardins exuberantes da Pousada Estaleiro Village", category: "pousada" },
  { src: "/assets/images/exterior-jardim/exterior-jardim-02.jpg", alt: "Área externa da pousada em meio à Mata Atlântica", category: "pousada" },
  { src: "/assets/images/exterior-jardim/exterior-jardim-03.jpg", alt: "Natureza preservada ao redor da pousada", category: "pousada" },
  { src: "/assets/images/exterior-jardim/exterior-jardim-04.jpg", alt: "Vista panorâmica do complexo Estaleiro Village", category: "pousada" },
  { src: "/assets/images/piscina-lazer/piscina-lazer-01.jpg", alt: "Piscina externa com vista para o mar", category: "pousada" },
  { src: "/assets/images/piscina-lazer/piscina-lazer-02.jpg", alt: "Área de lazer da Pousada Estaleiro Village", category: "pousada" },

  // Acomodações — uma amostra por tipo
  { src: "/assets/images/acomodacoes/suite-frente-mar/suite-frente-mar-01.jpg", alt: "Suíte Frente Mar com vista panorâmica ao oceano", category: "acomodacoes" },
  { src: "/assets/images/acomodacoes/suite-frente-mar/suite-frente-mar-03.jpg", alt: "Interior da Suíte Frente Mar", category: "acomodacoes" },
  { src: "/assets/images/acomodacoes/torre-oceano/torre-oceano-01.jpg", alt: "Torre Oceano — duplex com vista 270° ao mar", category: "acomodacoes" },
  { src: "/assets/images/acomodacoes/torre-oceano/torre-oceano-03.jpg", alt: "Torre Oceano — sala integrada e vista deslumbrante", category: "acomodacoes" },
  { src: "/assets/images/acomodacoes/sobrado-frente-mar/sobrado-frente-mar-01.jpg", alt: "Sobrado Frente Mar — a jóia da pousada", category: "acomodacoes" },
  { src: "/assets/images/acomodacoes/loft/loft-01.jpg", alt: "Loft com sacada e vista ao jardim", category: "acomodacoes" },
  { src: "/assets/images/acomodacoes/flat/flat-01.jpg", alt: "Flat com varanda e espaço para família", category: "acomodacoes" },
  { src: "/assets/images/acomodacoes/suite-jardim/suite-jardim-01.jpg", alt: "Suíte Jardim — aconchego em meio à natureza", category: "acomodacoes" },
  { src: "/assets/images/acomodacoes/studio-superior/studio-superior-01.jpg", alt: "Studio Superior com sala integrada", category: "acomodacoes" },
  { src: "/assets/images/acomodacoes/chale-b/chale-b-01.jpg", alt: "Chalé B — espaço familiar com 2 dormitórios", category: "acomodacoes" },
  { src: "/assets/images/acomodacoes/chale-c/chale-c-01.jpg", alt: "Chalé C — 70 m² para grupos e famílias", category: "acomodacoes" },

  // Praia
  { src: "/assets/images/praia/praia-01.jpg", alt: "Praia do Estaleiro — uma das praias mais preservadas de SC", category: "praia" },
  { src: "/assets/images/praia/praia-02.jpg", alt: "Mar cristalino da Praia do Estaleiro", category: "praia" },
  { src: "/assets/images/praia/praia-03.jpg", alt: "Pôr do sol na Praia do Estaleiro", category: "praia" },
  { src: "/assets/images/praia/praia-04.jpg", alt: "Praia tranquila ao amanhecer", category: "praia" },

  // Gastronomia
  { src: "/assets/images/gastronomia/gastronomia-01.jpg", alt: "Café da manhã farto na Estaleiro Village", category: "gastronomia" },
  { src: "/assets/images/gastronomia/gastronomia-02.jpg", alt: "Mesa do café da manhã com produtos frescos", category: "gastronomia" },
  { src: "/assets/images/gastronomia/gastronomia-03.jpg", alt: "Variedade de frutas e pães no café da manhã", category: "gastronomia" },
  { src: "/assets/images/gastronomia/gastronomia-04.jpg", alt: "Experiência gastronômica à beira-mar", category: "gastronomia" },

  // Eventos
  { src: "/assets/images/eventos/eventos-01.jpg", alt: "Casamento na Pousada Estaleiro Village", category: "eventos" },
  { src: "/assets/images/eventos/eventos-02.jpg", alt: "Celebração especial com vista para o mar", category: "eventos" },
  { src: "/assets/images/eventos/eventos-03.jpg", alt: "Evento ao ar livre na pousada", category: "eventos" },
  { src: "/assets/images/eventos/eventos-04.jpg", alt: "Decoração de evento na Estaleiro Village", category: "eventos" },
]
