import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
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

export const metadata: Metadata = {
  title: "Estaleiro Village | Pousada à Beira-Mar em Balneário Camboriú",
  description:
    "Pousada boutique na Praia do Estaleiro, Balneário Camboriú, SC. 30 anos de história, natureza e tranquilidade à beira-mar. Reserve agora.",
};

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
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
