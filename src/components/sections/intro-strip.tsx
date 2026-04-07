import { Star, TreePine, Waves } from "lucide-react";
import { introStripItems } from "@/data/homepage";

const icons = {
  waves: Waves,
  star: Star,
  treePine: TreePine,
};

export default function IntroStrip() {
  return (
    <section className="border-b bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 text-center md:grid-cols-3 md:gap-8">
          {introStripItems.map((item) => {
            const Icon = icons[item.icon];

            return (
              <div key={item.label} className="flex flex-col items-center">
                <div className="flex size-14 items-center justify-center rounded-full bg-[#F7F3EE] text-ev-primary">
                  <Icon className="size-6" aria-hidden="true" />
                </div>
                <h2 className="mt-4 text-lg font-semibold text-ev-neutral-dark">
                  {item.label}
                </h2>
                <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
