import type { Metadata } from "next";

const siteConfig = {
  name: "Estaleiro Village",
  siteName: "Pousada Estaleiro Village",
  url: "https://estaleirovillage.com",
  description:
    "Pousada boutique à beira-mar na Praia do Estaleiro, Balneário Camboriú. 40 anos de história, 11 acomodações, Mata Atlântica preservada e Bandeira Azul.",
  locale: "pt_BR",
  instagramHandle: "@pousadaestaleirovillageoficial",
  defaultOgImage: "/assets/images/frente_20mar_202.jpg",
};

type CreateMetadataOverrides = Partial<Metadata> & {
  path?: string;
  ogImage?: string;
};

function resolveTitle(title: Metadata["title"]): string {
  if (typeof title === "string") return title;
  if (title && typeof title === "object" && "default" in title) {
    const fallback = (title as { default: unknown }).default;
    if (typeof fallback === "string") return fallback;
  }
  return siteConfig.name;
}

export function createMetadata(overrides: CreateMetadataOverrides): Metadata {
  const { path = "/", ogImage, ...rest } = overrides;
  const resolvedTitle = resolveTitle(rest.title);
  const resolvedDescription =
    (typeof rest.description === "string" ? rest.description : undefined) ??
    siteConfig.description;
  const image = ogImage ?? siteConfig.defaultOgImage;

  return {
    metadataBase: new URL(siteConfig.url),
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url: path,
      siteName: siteConfig.siteName,
      title: resolvedTitle,
      description: resolvedDescription,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: resolvedTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description: resolvedDescription,
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
      },
    },
    ...rest,
  };
}

export { siteConfig };
