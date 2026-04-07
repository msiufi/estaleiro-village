import Image from "next/image";
import { cn } from "@/lib/utils";

interface CardProps {
  children?: React.ReactNode;
  className?: string;
}

interface CardImageProps {
  src: string;
  alt: string;
  aspectRatio?: "square" | "video" | "portrait";
}

interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
}

interface CardDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

const aspectRatioClasses = {
  square: "aspect-square",
  video: "aspect-video",
  portrait: "aspect-[3/4]",
};

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-lg shadow-sm overflow-hidden flex flex-col",
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardImage({ src, alt, aspectRatio = "video" }: CardImageProps) {
  return (
    <div className={cn("relative w-full overflow-hidden", aspectRatioClasses[aspectRatio])}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  );
}

export function CardContent({ children, className }: CardProps) {
  return (
    <div className={cn("p-5 flex-1 flex flex-col", className)}>{children}</div>
  );
}

export function CardTitle({ children, className }: CardTitleProps) {
  return (
    <h3 className={cn("font-heading text-xl font-semibold text-ev-neutral-dark mb-2", className)}>
      {children}
    </h3>
  );
}

export function CardDescription({ children, className }: CardDescriptionProps) {
  return (
    <p className={cn("text-muted-foreground text-sm leading-relaxed flex-1", className)}>
      {children}
    </p>
  );
}

export function CardFooter({ children, className }: CardFooterProps) {
  return (
    <div className={cn("p-5 pt-0 mt-auto", className)}>{children}</div>
  );
}
