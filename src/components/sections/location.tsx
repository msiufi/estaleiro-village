import { Section } from "@/components/ui/section";

const instagramUrl =
  "https://www.instagram.com/pousadaestaleirovillageoficial/";

export default function Location() {
  return (
    <Section id="contato" className="bg-white">
      <div className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <h2 className="font-heading text-3xl text-ev-neutral-dark sm:text-4xl">
            Como Chegar
          </h2>
          <div className="mt-6 space-y-6 text-base leading-7 text-muted-foreground">
            <div>
              <h3 className="font-semibold text-ev-neutral-dark">Endereço</h3>
              <p>
                Av. L.A.P. Rodesindo Pavan, nº 3996
                <br />
                Praia do Estaleiro
                <br />
                Balneário Camboriú - SC, CEP 88334-000
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-ev-neutral-dark">Telefone</h3>
              <a
                href="tel:+554799112-5200"
                className="text-ev-primary transition hover:underline"
              >
                (47) 9 9112-5200
              </a>
            </div>
            <div>
              <h3 className="font-semibold text-ev-neutral-dark">WhatsApp</h3>
              <a
                href="https://wa.me/5547991125300"
                target="_blank"
                rel="noreferrer"
                className="text-ev-primary transition hover:underline"
              >
                (47) 9 9112-5300
              </a>
            </div>
            <div>
              <h3 className="font-semibold text-ev-neutral-dark">E-mail</h3>
              <a
                href="mailto:pousada@estaleirovillage.com"
                className="text-ev-primary transition hover:underline"
              >
                pousada@estaleirovillage.com
              </a>
            </div>
            <div>
              <h3 className="font-semibold text-ev-neutral-dark">Instagram</h3>
              <a
                href={instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="text-ev-primary transition hover:underline"
              >
                @pousadaestaleirovillageoficial
              </a>
            </div>
          </div>
        </div>

        <div className="aspect-video overflow-hidden rounded-xl shadow-sm">
          <iframe
            title="Mapa da Praia do Estaleiro"
            src="https://www.google.com/maps?q=Pousada+Estaleiro+Village+Balneario+Camboriu&z=15&output=embed"
            className="h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </Section>
  );
}
