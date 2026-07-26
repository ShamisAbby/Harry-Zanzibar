import { Hero } from "@/components/home/hero";
import { FeaturedTours } from "@/components/home/featured-tours";
import { WhyHarry } from "@/components/home/why-harry";
import { Statistics } from "@/components/home/statistics";
import { Gallery } from "@/components/home/gallery";
import { Testimonials } from "@/components/home/testimonials";
import { LatestBlog } from "@/components/home/latest-blog";
import { InstagramFeed } from "@/components/home/instagram-feed";
import { Partners } from "@/components/home/partners";
import { Faq } from "@/components/home/faq";
import { Newsletter } from "@/components/home/newsletter";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedTours />
      <WhyHarry />
      <Statistics />
      <Gallery />
      <Testimonials />
      <LatestBlog />
      <InstagramFeed />
      <Partners />
      <Faq />
      <Newsletter />
    </>
  );
}
