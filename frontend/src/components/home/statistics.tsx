import { AnimatedCounter } from "@/components/ui/animated-counter";
import { demoStats } from "@/data/demo-content";
import { WaveDivider } from "@/components/ui/wave-divider";

export function Statistics() {
  return (
    <section className="relative bg-[#083B66] py-24 text-white sm:py-28">
      <WaveDivider className="absolute -top-px left-0 text-[#083B66]" />
      <WaveDivider flip className="absolute -bottom-px left-0 text-[#FAF7F2]" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {demoStats.map((stat) => (
            <div key={stat.id} className="text-center">
              <div className="font-heading text-4xl font-semibold text-[#F2C66D] sm:text-5xl">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="mt-2 text-sm text-white/70 sm:text-base">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
