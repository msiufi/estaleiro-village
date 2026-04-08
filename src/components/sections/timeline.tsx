import Image from "next/image";

const timelineItems = [
  {
    year: "1994",
    title: "Fundação",
    description:
      "A família Estaleiro abre as portas da pousada na Praia do Estaleiro, começando uma história de amor pelo mar e pela hospitalidade.",
    image:
      "/assets/images/47aad0_749ac6df1a064052b333b452692f9592_mv2_d_3968_2976_s_4_2.jpg",
    imageAlt: "Foto histórica da Pousada Estaleiro Village, fundação em 1994",
  },
  {
    year: "2000",
    title: "Crescimento",
    description:
      "Novos chalés e acomodações são construídos para atender à crescente demanda de hóspedes que buscam refúgio e tranquilidade.",
    image: "/assets/images/jardim_202.jpg",
    imageAlt: "Jardins da Pousada Estaleiro Village",
  },
  {
    year: "2010",
    title: "Renovação",
    description:
      "A pousada passa por uma reforma completa, incorporando elementos sustentáveis e preservando o charme rústico que encanta os hóspedes.",
    image: "/assets/images/47aad0_33762d8f54c04590aeb08d2109eceeb3_mv2.png",
    imageAlt: "Área externa renovada da Pousada Estaleiro Village",
  },
  {
    year: "2018",
    title: "Reconhecimento",
    description:
      "Estaleiro Village recebe certificações de turismo sustentável e é eleita uma das melhores pousadas boutique do litoral catarinense.",
    image: "/assets/images/frente_20mar_202.jpg",
    imageAlt: "Vista da frente da Pousada Estaleiro Village voltada para o mar",
  },
  {
    year: "2026",
    title: "Presente",
    description:
      "Com mais de 30 anos de história, continuamos a escrever nossa história à beira-mar, renovando espaços e mantendo vivo o espírito acolhedor que nos define desde 1994.",
    image: "/assets/images/IMG_20251125_150745.jpg",
    imageAlt: "Pousada Estaleiro Village hoje",
  },
] as const;

export default function Timeline() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mb-12 text-center">
          <h2 className="font-heading text-3xl text-ev-neutral-dark sm:text-4xl">
            Linha do Tempo
          </h2>
        </div>

        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-2 top-0 hidden border-l-2 border-ev-primary lg:left-1/2 lg:block"
          />

          <div className="space-y-10 lg:space-y-0">
            {timelineItems.map((item, index) => {
              const isLeft = index % 2 === 0;

              return (
                <div
                  key={`${item.year}-${item.title}`}
                  className="relative lg:grid lg:grid-cols-2 lg:gap-16"
                >
                  {/* Desktop-only dot — centered on the vertical line */}
                  <span
                    aria-hidden="true"
                    className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-4 w-4 rounded-full border-2 border-white bg-ev-primary shadow z-10"
                  />

                  {/* Image — always first in DOM (appears above text on mobile) */}
                  <div
                    className={[
                      "mb-4 lg:mb-0 relative aspect-[4/3] overflow-hidden rounded-xl",
                      isLeft
                        ? "lg:col-start-2 lg:row-start-1"
                        : "lg:col-start-1 lg:row-start-1",
                    ].join(" ")}
                  >
                    <Image
                      src={item.image}
                      alt={item.imageAlt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>

                  {/* Text card */}
                  <div
                    className={[
                      "relative rounded-xl bg-[#F7F3EE] p-6 shadow-sm self-center",
                      isLeft
                        ? "lg:col-start-1 lg:row-start-1 lg:mr-10"
                        : "lg:col-start-2 lg:row-start-1 lg:ml-10",
                    ].join(" ")}
                  >
                    {/* Mobile-only dot — relative to text card, on left vertical line */}
                    <span
                      aria-hidden="true"
                      className="lg:hidden absolute left-[-2.15rem] top-8 h-4 w-4 rounded-full border-2 border-white bg-ev-primary shadow"
                    />
                    <p className="font-heading text-2xl font-bold text-ev-primary">
                      {item.year}
                    </p>
                    <h3 className="mt-2 font-heading text-xl text-ev-neutral-dark">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
