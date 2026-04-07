import { Star } from "lucide-react";

import { Section } from "@/components/ui/section";
import { testimonials } from "@/data/homepage";

export default function Testimonials() {
  return (
    <Section className="bg-[#F7F3EE]">
      <div className="space-y-10">
        <div className="text-center">
          <h2 className="font-heading text-3xl text-ev-neutral-dark sm:text-4xl">
            O que nossos hóspedes dizem
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.name}
              className="rounded-xl bg-white p-6 shadow-sm"
            >
              <div className="flex gap-1 text-[#D4A017]">
                {Array.from({ length: testimonial.rating }).map((_, index) => (
                  <Star
                    key={`${testimonial.name}-${index}`}
                    className="size-4 fill-current"
                    aria-hidden="true"
                  />
                ))}
              </div>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                &ldquo;{testimonial.text}&rdquo;
              </p>
              <div className="mt-6">
                <p className="font-semibold text-ev-neutral-dark">
                  {testimonial.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {testimonial.location}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}
