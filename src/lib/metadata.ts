import type { Metadata } from "next";

const siteConfig = {
  name: "Estaleiro Village",
  url: "https://estaleirovillage.com",
  description:
    "Pousada boutique na Praia do Estaleiro, Balneário Camboriú, SC. 30 anos de história, natureza e tranquilidade à beira-mar.",
  locale: "pt_BR",
  instagramHandle: "@pousadaestaleirovillageoficial",
};

export function createMetadata(
  overrides: Partial<Metadata> & { path?: string },
): Metadata {
  const { path = "/", ...rest } = overrides;

  return {
    metadataBase: new URL(siteConfig.url),
    openGraph: {
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: "website",
      url: path,
      images: [
        {
          url: "/assets/images/frente_20mar_202.jpg",
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
    },
    robots: { index: true, follow: true },
    ...rest,
  };
}

export { siteConfig };