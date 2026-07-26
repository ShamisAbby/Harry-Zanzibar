import { cn } from "@/lib/utils";
import { Waves, type LucideIcon } from "lucide-react";

const TONES = {
  ocean: "from-[#0096D6] via-[#00C2C7] to-[#083B66]",
  sand: "from-[#F2C66D] via-[#e8b85a] to-[#0096D6]",
  palm: "from-[#2F855A] via-[#0096D6] to-[#083B66]",
  sunset: "from-[#F2C66D] via-[#e0895a] to-[#083B66]",
} as const;

interface PlaceholderImageProps {
  label: string;
  tone?: keyof typeof TONES;
  icon?: LucideIcon;
  className?: string;
}

export function PlaceholderImage({
  label,
  tone = "ocean",
  icon: Icon = Waves,
  className,
}: PlaceholderImageProps) {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden bg-gradient-to-br",
        TONES[tone],
        className
      )}
      role="img"
      aria-label={label}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.25),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_90%,rgba(0,0,0,0.2),transparent_55%)]" />
      <Icon className="relative size-10 text-white/40" strokeWidth={1.25} />
      <span className="absolute bottom-3 left-3 right-3 text-xs font-medium tracking-wide text-white/70">
        {label}
      </span>
    </div>
  );
}
