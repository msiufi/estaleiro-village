import Image from "next/image";

import { timelineItems } from "@/data/historia";

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
                      alt={`${item.title} — Estaleiro Village (${item.year})`}
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
