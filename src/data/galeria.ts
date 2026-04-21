export interface GaleriaItem {
  src: string
  alt: string
  category: "acomodacoes" | "praia" | "pousada" | "eventos" | "gastronomia"
}

export const galeriaItems: GaleriaItem[] = [
  { src: "/assets/images/frente_20mar_202.jpg", alt: "Vista frontal da pousada e o mar", category: "pousada" },
  { src: "/assets/images/jardim_202.jpg", alt: "Jardim da pousada em meio à Mata Atlântica", category: "pousada" },
  { src: "/assets/images/47aad0_33762d8f54c04590aeb08d2109eceeb3_mv2.png", alt: "Área externa e piscina", category: "pousada" },
  { src: "/assets/images/Studio_20Sup_20cama.jpg", alt: "Studio Superior com cama queen", category: "acomodacoes" },
  { src: "/assets/images/flat1.jpg", alt: "Flat com vista para o mar", category: "acomodacoes" },
  { src: "/assets/images/sobrado_20ricardo.jpg", alt: "Sobrado cercado de natureza", category: "acomodacoes" },
  { src: "/assets/images/IMG_20251125_150745.jpg", alt: "Interior aconchegante de acomodação", category: "acomodacoes" },
  { src: "/assets/images/54661554235_216e580305.jpg", alt: "Suíte Frente Mar", category: "acomodacoes" },
  { src: "/assets/images/flickr/praia-04.jpg", alt: "Praia do Estaleiro — Bandeira Azul", category: "praia" },
  { src: "/assets/images/10309741543_e7d8ae74e6_c.jpg", alt: "Mar e natureza da Praia do Estaleiro", category: "praia" },
  { src: "/assets/images/10430020596_736e0f388b_c.jpg", alt: "Paisagem da região", category: "praia" },
  { src: "/assets/images/7236364408_92d3d48c97_c.jpg", alt: "Estrutura externa da pousada", category: "pousada" },
  { src: "/assets/images/36829524845_8e2b17b5b4_c.jpg", alt: "Área gastronômica", category: "gastronomia" },
  { src: "/assets/images/flickr/cafe-04.jpg", alt: "Café da manhã", category: "gastronomia" },
  { src: "/assets/images/flickr/pousada-08.jpg", alt: "Área de lazer da pousada", category: "pousada" },
  { src: "/assets/images/47aad0_749ac6df1a064052b333b452692f9592_mv2_d_3968_2976_s_4_2.jpg", alt: "Pousada em perspectiva histórica", category: "pousada" },
]
