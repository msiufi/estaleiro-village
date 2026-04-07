import Image from "next/image";
import Link from "next/link";

import { Section } from "@/components/ui/section";

export default function AboutTeaser() {
  return (
    <Section className="bg-white">
      <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <span className="inline-flex rounded-full bg-[#F7F3EE] px-4 py-2 text-sm font-medium text-ev-primary">
            Nossa História
          </span>
          <h2 className="mt-5 font-heading text-3xl text-ev-neutral-dark sm:text-4xl">
            Três décadas recebendo hóspedes com acolhimento e vista para o mar
          </h2>
          <div className="mt-6 space-y-4 text-base leading-7 text-muted-foreground">
            <p>
              A Estaleiro Village nasceu do sonho de uma família de criar um
              lugar especial na Praia do Estaleiro, onde natureza, hospitalidade
              e simplicidade elegante caminham juntas.
            </p>
            <p>
              Ao longo de 30 anos, a pousada se tornou cenário de descansos
              inesquecíveis, encontros em família e momentos de reconexão com o
              ritmo calmo do mar.
            </p>
            <p>
              Cada detalhe preserva esse espírito acolhedor: jardins bem
              cuidados, atendimento próximo e a sensação de estar em um refúgio
              sereno entre a mata e a praia.
            </p>
          </div>
          <Link
            href="/a-historia"
            className="mt-6 inline-flex font-medium text-ev-primary transition hover:opacity-80"
          >
            Conheça nossa história →
          </Link>
        </div>

        <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
          <Image
            src="/assets/images/47aad0_749ac6df1a064052b333b452692f9592_mv2_d_3968_2976_s_4_2.jpg"
            alt="Foto histórica da Pousada Estaleiro Village"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 40vw"
          />
        </div>
      </div>
    </Section>
  );
}
