const timelineItems = [
  {
    year: "1994",
    title: "Fundação",
    description:
      "A família Estaleiro abre as portas da pousada na Praia do Estaleiro, começando uma história de amor pelo mar e pela hospitalidade.",
  },
  {
    year: "2000",
    title: "Crescimento",
    description:
      "Novos chalés e acomodações são construídos para atender à crescente demanda de hóspedes que buscam refúgio e tranquilidade.",
  },
  {
    year: "2010",
    title: "Renovação",
    description:
      "A pousada passa por uma reforma completa, incorporando elementos sustentáveis e preservando o charme rústico que encanta os hóspedes.",
  },
  {
    year: "2018",
    title: "Reconhecimento",
    description:
      "Estaleiro Village recebe certificações de turismo sustentável e é eleita uma das melhores pousadas boutique do litoral catarinense.",
  },
  {
    year: "2024",
    title: "Presente",
    description:
      "Com 30 anos de história, continuamos a oferecer experiências únicas à beira-mar, mantendo vivo o espírito acolhedor que nos define.",
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
                  <div
                    className={[
                      "relative rounded-xl bg-[#F7F3EE] p-6 shadow-sm",
                      isLeft ? "lg:mr-10" : "lg:col-start-2 lg:ml-10",
                    ].join(" ")}
                  >
                    <span
                      aria-hidden="true"
                      className="absolute left-[-2.15rem] top-8 h-4 w-4 rounded-full border-2 border-white bg-ev-primary shadow lg:left-auto lg:top-10"
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
