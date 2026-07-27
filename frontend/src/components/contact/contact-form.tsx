"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { isAxiosError } from "axios";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { api } from "@/lib/api";
import { trackEvent } from "@/lib/track-event";

const contactSchema = z.object({
  name: z.string().min(2, "Bitte geben Sie Ihren Namen ein."),
  email: z.string().email("Bitte geben Sie eine gültige E-Mail-Adresse ein."),
  subject: z.string().optional(),
  message: z.string().min(10, "Ihre Nachricht sollte mindestens 10 Zeichen enthalten."),
});

type ContactValues = z.infer<typeof contactSchema>;

export function ContactForm() {
  const [isSuccess, setIsSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = useForm<ContactValues>({ resolver: zodResolver(contactSchema) });

  const onSubmit = async (values: ContactValues) => {
    try {
      await api.post("/v1/contact", values);
      trackEvent("contact_form_submit");
      setIsSuccess(true);
      reset();
    } catch (error) {
      const message = isAxiosError(error) ? error.response?.data?.message : undefined;
      setError("root", {
        message: message ?? "Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.",
      });
    }
  };

  if (isSuccess) {
    return (
      <div className="rounded-2xl border border-border/60 bg-card p-8 text-center">
        <CheckCircle2 className="mx-auto size-10 text-[#2F855A]" />
        <h3 className="mt-4 font-heading text-lg font-semibold">Nachricht gesendet!</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Vielen Dank für Ihre Nachricht. Wir melden uns so schnell wie möglich bei Ihnen.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" className="mt-1.5" {...register("name")} />
          {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name.message}</p>}
        </div>
        <div>
          <Label htmlFor="email">E-Mail</Label>
          <Input id="email" type="email" className="mt-1.5" {...register("email")} />
          {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>}
        </div>
      </div>
      <div>
        <Label htmlFor="subject">Betreff (optional)</Label>
        <Input id="subject" className="mt-1.5" {...register("subject")} />
      </div>
      <div>
        <Label htmlFor="message">Nachricht</Label>
        <Textarea id="message" rows={5} className="mt-1.5" {...register("message")} />
        {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message.message}</p>}
      </div>
      {errors.root && <p className="text-xs text-destructive">{errors.root.message}</p>}
      <Button type="submit" disabled={isSubmitting} size="lg" className="w-full rounded-full sm:w-auto">
        {isSubmitting ? "Wird gesendet …" : "Nachricht senden"}
      </Button>
    </form>
  );
}
