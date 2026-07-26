"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { isAxiosError } from "axios";
import { CheckCircle2, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { api } from "@/lib/api";
import { siteConfig } from "@/config/site";

const bookingSchema = z.object({
  customer_name: z.string().min(2, "Bitte geben Sie Ihren Namen ein."),
  customer_email: z.string().email("Bitte geben Sie eine gültige E-Mail-Adresse ein."),
  customer_phone: z.string().optional(),
  preferred_date: z.string().optional(),
  travelers_count: z
    .string()
    .optional()
    .refine((v) => !v || (/^\d+$/.test(v) && Number(v) >= 1 && Number(v) <= 50), {
      message: "Bitte geben Sie eine gültige Personenzahl ein.",
    }),
  message: z.string().max(2000).optional(),
});

type BookingValues = z.infer<typeof bookingSchema>;

export function BookingForm({ tourId, tourTitle }: { tourId: string; tourTitle: string }) {
  const [result, setResult] = useState<{ reference: string } | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<BookingValues>({ resolver: zodResolver(bookingSchema) });

  const onSubmit = async (values: BookingValues) => {
    try {
      const { data } = await api.post("/v1/bookings", {
        ...values,
        travelers_count: values.travelers_count ? Number(values.travelers_count) : undefined,
        tour_id: tourId,
      });
      setResult({ reference: data.reference });
    } catch (error) {
      const message = isAxiosError(error) ? error.response?.data?.message : undefined;
      setError("root", {
        message: message ?? "Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut oder schreiben Sie uns direkt per WhatsApp.",
      });
    }
  };

  if (result) {
    return (
      <div className="rounded-2xl border border-border/60 bg-card p-6 text-center">
        <CheckCircle2 className="mx-auto size-10 text-[#2F855A]" />
        <h3 className="mt-4 font-heading text-lg font-semibold">Anfrage gesendet!</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Ihre Referenz: <strong>{result.reference}</strong>. Harry meldet sich innerhalb von
          24 Stunden persönlich bei Ihnen.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border/60 bg-card p-6">
      <h3 className="font-heading text-lg font-semibold">Jetzt anfragen</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Unverbindliche Anfrage für &bdquo;{tourTitle}&ldquo; – Harry antwortet persönlich.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-5 space-y-4">
        <div>
          <Label htmlFor="customer_name">Name</Label>
          <Input id="customer_name" className="mt-1.5" {...register("customer_name")} />
          {errors.customer_name && (
            <p className="mt-1 text-xs text-destructive">{errors.customer_name.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="customer_email">E-Mail</Label>
          <Input id="customer_email" type="email" className="mt-1.5" {...register("customer_email")} />
          {errors.customer_email && (
            <p className="mt-1 text-xs text-destructive">{errors.customer_email.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="customer_phone">Telefon (optional)</Label>
          <Input id="customer_phone" type="tel" className="mt-1.5" {...register("customer_phone")} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="preferred_date">Wunschdatum</Label>
            <Input id="preferred_date" type="date" className="mt-1.5" {...register("preferred_date")} />
          </div>
          <div>
            <Label htmlFor="travelers_count">Personen</Label>
            <Input id="travelers_count" type="number" min={1} max={50} className="mt-1.5" {...register("travelers_count")} />
          </div>
        </div>
        <div>
          <Label htmlFor="message">Nachricht (optional)</Label>
          <Textarea id="message" rows={3} className="mt-1.5" {...register("message")} />
        </div>

        {errors.root && <p className="text-xs text-destructive">{errors.root.message}</p>}

        <Button type="submit" disabled={isSubmitting} className="w-full rounded-full">
          {isSubmitting ? "Wird gesendet …" : "Anfrage senden"}
        </Button>
      </form>

      <div className="mt-4 flex items-center gap-2 border-t border-border/60 pt-4 text-sm text-muted-foreground">
        <span>Lieber direkt schreiben?</span>
        <a
          href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(`Hallo Harry! Ich interessiere mich für "${tourTitle}".`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-semibold text-[#25D366]"
        >
          <MessageCircle className="size-4" /> WhatsApp
        </a>
      </div>
    </div>
  );
}
