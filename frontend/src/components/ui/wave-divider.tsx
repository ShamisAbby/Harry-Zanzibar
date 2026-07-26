import { cn } from "@/lib/utils";

interface WaveDividerProps {
  className?: string;
  flip?: boolean;
  color?: string;
}

/** Ocean wave separator used between homepage sections. */
export function WaveDivider({ className, flip = false, color = "currentColor" }: WaveDividerProps) {
  return (
    <div
      className={cn("pointer-events-none w-full overflow-hidden leading-none", flip && "rotate-180", className)}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        className="h-16 w-full sm:h-20"
      >
        <path
          d="M0,40 C240,90 480,0 720,30 C960,60 1200,100 1440,50 L1440,100 L0,100 Z"
          fill={color}
        />
      </svg>
    </div>
  );
}
