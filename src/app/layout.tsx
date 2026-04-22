import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import SchemaOrg from "@/components/schema-org";
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
        <SchemaOrg />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}