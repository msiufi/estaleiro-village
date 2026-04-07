import { cn } from "@/lib/utils";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  as?: "section" | "div" | "article";
}

export function Section({ children, className, id, as: Tag = "section" }: SectionProps) {
  return (
    <Tag id={id} className={cn("w-full", className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {children}
      </div>
    </Tag>
  );
}
