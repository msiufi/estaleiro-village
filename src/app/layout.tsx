import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import WhatsAppFloat from "@/components/ui/whatsapp-float";
import { createMetadata } from "@/lib/metadata";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = createMetadata({
  title: {
    default: "Estaleiro Village | Pousada à Beira-Mar em Balneário Camboriú",
    template: "%s | Estaleiro Village",
  },
  description:
    "Pousada boutique na Praia do Estaleiro, Balneário Camboriú, SC. 30 anos de história, natureza e tranquilidade à beira-mar. Reserve agora.",
  keywords: [
    "pousada",
    "Balneário Camboriú",
    "Praia do Estaleiro",
    "hospedagem",
    "SC",
    "praia",
    "pousada boutique",
    "estaleiro village",
  ],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${playfairDisplay.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-body bg-background text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LodgingBusiness",
              name: "Estaleiro Village",
              description:
                "Pousada boutique na Praia do Estaleiro, Balneário Camboriú, SC.",
              url: "https://estaleirovillage.com",
              telephone: "+55 47 99999-9999",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Praia do Estaleiro",
                addressLocality: "Balneário Camboriú",
                addressRegion: "SC",
                addressCountry: "BR",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: -26.9784,
                longitude: -48.6127,
              },
              sameAs: [
                "https://www.instagram.com/pousadaestaleirovillageoficial",
              ],
              openingHours: "Mo-Su 00:00-24:00",
            }),
          }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}