"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { isAxiosError } from "axios";
import { Mail, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/lib/api";

const newsletterSchema = z.object({
  email: z.string().email("Bitte geben Sie eine gültige E-Mail-Adresse ein."),
});

type NewsletterValues = z.infer<typeof newsletterSchema>;

export function Newsletter() {
  const [isSuccess, setIsSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = useForm<NewsletterValues>({ resolver: zodResolver(newsletterSchema) });

  const onSubmit = async (values: NewsletterValues) => {
    try {
      await api.post("/v1/newsletter", values);
      setIsSuccess(true);
      reset();
    } catch (error) {
      const message = isAxiosError(error)
        ? error.response?.data?.message ?? error.response?.data?.errors?.email?.[0]
        : undefined;
      setError("email", {
        message: message ?? "Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.",
      });
    }
  };

  return (
    <section className="bg-primary py-20 text-primary-foreground">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <Mail className="mx-auto size-10 text-white/80" />
        <h2 className="mt-4 font-heading text-3xl font-semibold">
          Sansibar-Tipps direkt ins Postfach
        </h2>
        <p className="mt-3 text-white/85">
          Melden Sie sich für unseren Newsletter an und erhalten Sie exklusive Reisetipps,
          Sonderangebote und Neuigkeiten von der Gewürzinsel.
        </p>

        {isSuccess ? (
          <div className="mx-auto mt-8 flex max-w-md items-center justify-center gap-2 rounded-full bg-white/15 px-6 py-3 text-sm font-medium">
            <CheckCircle2 className="size-5" />
            Vielen Dank für Ihre Anmeldung!
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
          >
            <div className="flex-1 text-left">
              <Input
                type="email"
                placeholder="ihre.email@beispiel.de"
                aria-label="E-Mail-Adresse"
                className="h-12 border-white/30 bg-white/10 text-white placeholder:text-white/60 focus-visible:ring-white/50"
                {...register("email")}
              />
              {errors.email && (
                <p className="mt-1.5 text-xs text-[#F2C66D]">{errors.email.message}</p>
              )}
            </div>
            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className="h-12 rounded-lg bg-white px-6 text-primary hover:bg-white/90"
            >
              {isSubmitting ? "Wird gesendet …" : "Anmelden"}
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}
