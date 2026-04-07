import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardImage,
  CardTitle,
} from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { accommodationsPreview } from "@/data/homepage";

export default function AccommodationsPreview() {
  return (
    <Section className="bg-[#F7F3EE]">
      <div className="space-y-10">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl text-ev-neutral-dark sm:text-4xl">
            Nossas Acomodações
          </h2>
          <p className="mt-4 text-muted-foreground">
            Opções pensadas para diferentes estilos de viagem, sempre com o
            cuidado e a tranquilidade da Estaleiro Village.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {accommodationsPreview.map((item) => (
            <Card key={item.id} className="group">
              <CardImage src={item.image} alt={item.name} aspectRatio="video" />
              <CardContent>
                <CardTitle>{item.name}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardContent>
              <CardFooter>
                <Link
                  href={item.href}
                  className="text-sm font-medium text-ev-primary hover:underline"
                >
                  Ver detalhes
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/acomodacoes"
            className="inline-flex rounded-md border border-[#1B6CA8] px-6 py-3 font-medium text-ev-primary transition hover:bg-[#1B6CA8] hover:text-white"
          >
            Ver todas as acomodações
          </Link>
        </div>
      </div>
    </Section>
  );
}
