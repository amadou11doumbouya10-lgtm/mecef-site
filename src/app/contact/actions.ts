"use server";

import { z } from "zod";
import { Resend } from "resend";

// Validation côté serveur : évite que des soumissions vides ou malformées n'atteignent Resend.
const contactSchema = z.object({
  name: z.string().trim().min(2, "Le nom doit contenir au moins 2 caractères."),
  organization: z.string().trim().optional(),
  email: z.string().trim().email("Adresse email invalide."),
  phone: z.string().trim().optional(),
  subject: z.enum(["devis", "partenariat", "question"], {
    error: "Veuillez sélectionner un objet de la demande.",
  }),
  message: z.string().trim().min(10, "Le message doit contenir au moins 10 caractères."),
});

const subjectLabels: Record<string, string> = {
  devis: "Demande de devis",
  partenariat: "Partenariat",
  question: "Question générale",
};

export interface ContactFormState {
  status: "idle" | "success" | "error";
  message: string;
}

export const initialContactFormState: ContactFormState = { status: "idle", message: "" };

export async function sendContactMessage(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    organization: formData.get("organization"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    subject: formData.get("subject"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0]?.message ?? "Formulaire invalide." };
  }

  const { name, organization, email, phone, subject, message } = parsed.data;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // RESEND_API_KEY n'est pas encore renseignée dans .env.local : on échoue proprement
    // plutôt que de laisser Resend lever une erreur d'authentification opaque.
    console.error("RESEND_API_KEY manquante : impossible d'envoyer le message de contact.");
    return {
      status: "error",
      message:
        "Le service d'envoi n'est pas encore configuré. Merci de nous contacter par téléphone en attendant.",
    };
  }

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      // Nécessite un domaine d'envoi vérifié dans Resend avant mise en production.
      from: "Site MECEF ET FILS <site@mecefetfils.com>",
      to: "2017fakolymamby@gmail.com",
      reply_to: email,
      subject: `[${subjectLabels[subject]}] Nouveau message de ${name}`,
      text: [
        `Nom : ${name}`,
        organization ? `Structure / Institution : ${organization}` : null,
        `Email : ${email}`,
        phone ? `Téléphone : ${phone}` : null,
        `Objet : ${subjectLabels[subject]}`,
        "",
        message,
      ]
        .filter(Boolean)
        .join("\n"),
    });

    return {
      status: "success",
      message: "Votre message a bien été envoyé. Nous vous répondrons rapidement.",
    };
  } catch (error) {
    console.error("Erreur lors de l'envoi du message de contact :", error);
    return { status: "error", message: "Une erreur est survenue lors de l'envoi. Merci de réessayer." };
  }
}
