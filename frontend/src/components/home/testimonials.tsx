"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { Quote, Star } from "lucide-react";
import { demoTestimonials } from "@/data/demo-content";

import "swiper/css";
import "swiper/css/pagination";

export function Testimonials() {
  return (
    <section className="bg-[#FAF7F2] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">
            Stimmen unserer Gäste
          </span>
          <h2 className="mt-3 font-heading text-3xl font-semibold sm:text-4xl">
            Was Reisende über uns sagen
          </h2>
        </div>

        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
          autoplay={{ delay: 6000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          className="mt-14 pb-12!"
        >
          {demoTestimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id} className="h-auto pb-2">
              <figure className="flex h-full flex-col rounded-2xl border border-border/60 bg-card p-8">
                <Quote className="size-8 text-primary/30" />
                <div className="mt-3 flex text-[#F2C66D]">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="size-3.5" fill="currentColor" strokeWidth={0} />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 text-balance text-sm leading-relaxed text-foreground/90">
                  „{testimonial.quote}“
                </blockquote>
                <figcaption className="mt-6 border-t border-border/60 pt-4">
                  <p className="font-heading font-semibold">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {testimonial.origin}
                    {testimonial.tourTitle ? ` · ${testimonial.tourTitle}` : ""}
                  </p>
                </figcaption>
              </figure>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
