import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Acomodações",
  description:
    "Conheça as acomodações da Pousada Estaleiro Village na Praia do Estaleiro, Balneário Camboriú. Suítes, studios, flats e chalés com conforto à beira-mar.",
  path: "/acomodacoes",
});

export default function AcomodacoesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}