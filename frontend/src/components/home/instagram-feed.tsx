import { Sailboat, Sun, Fish, Palmtree, Camera, Waves } from "lucide-react";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { InstagramIcon } from "@/components/icons/social-icons";
import { siteConfig } from "@/config/site";

const posts = [
  { label: "Sonnenaufgang in Nungwi", tone: "sunset", icon: Sun },
  { label: "Tagesausflug Safari Blue", tone: "ocean", icon: Sailboat },
  { label: "Schnorcheln bei Mnemba", tone: "palm", icon: Fish },
  { label: "Palmen bei Paje", tone: "palm", icon: Palmtree },
  { label: "Gäste-Momente", tone: "sand", icon: Camera },
  { label: "Indischer Ozean", tone: "ocean", icon: Waves },
] as const;

export function InstagramFeed() {
  return (
    <section className="bg-[#FAF7F2] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">
            @harry.sansibar
          </span>
          <h2 className="mt-3 font-heading text-3xl font-semibold sm:text-4xl">
            Folgen Sie uns auf Instagram
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {posts.map((post) => (
            <a
              key={post.label}
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden rounded-xl"
            >
              <PlaceholderImage
                label={post.label}
                tone={post.tone}
                icon={post.icon}
                className="size-full transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/30">
                <InstagramIcon className="size-6 text-white opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
