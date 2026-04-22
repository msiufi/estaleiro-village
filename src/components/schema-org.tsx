import { siteConfig } from "@/lib/metadata";

export default function SchemaOrg() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: siteConfig.siteName,
    description:
      "Pousada boutique à beira-mar na Praia do Estaleiro, Balneário Camboriú. 40 anos de hospitalidade, 11 acomodações, Mata Atlântica preservada e Bandeira Azul.",
    url: siteConfig.url,
    telephone: "+55-47-99112-5200",
    image: `${siteConfig.url}${siteConfig.defaultOgImage}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Av. L.A.P. Rodesindo Pavan, nº 3996",
      addressLocality: "Balneário Camboriú",
      addressRegion: "SC",
      postalCode: "88334-000",
      addressCountry: "BR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -26.9784,
      longitude: -48.6127,
    },
    priceRange: "$$",
    petsAllowed: true,
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Wi-Fi", value: true },
      { "@type": "LocationFeatureSpecification", name: "Ar-condicionado", value: true },
      { "@type": "LocationFeatureSpecification", name: "Pet Friendly", value: true },
      { "@type": "LocationFeatureSpecification", name: "Estacionamento", value: true },
      { "@type": "LocationFeatureSpecification", name: "Piscina", value: true },
      { "@type": "LocationFeatureSpecification", name: "Praia privativa", value: true },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "9.1",
      bestRating: "10",
      ratingCount: "405",
    },
    sameAs: ["https://www.instagram.com/pousadaestaleirovillageoficial/"],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
