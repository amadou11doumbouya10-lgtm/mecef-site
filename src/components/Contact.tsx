"use client";

import { useFormState, useFormStatus } from "react-dom";
import { MapPin, Phone, Mail } from "lucide-react";
import { sendContactMessage, initialContactFormState } from "@/app/contact/actions";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending} className="btn-primary w-full disabled:opacity-60 sm:w-auto">
      {pending ? "Envoi en cours..." : "Envoyer"}
    </button>
  );
}

const inputClasses =
  "w-full rounded-sm border border-charcoal-border bg-charcoal px-4 py-2.5 text-sm text-cream placeholder:text-warmgray-dark focus:border-laterite focus:outline-none focus:ring-1 focus:ring-laterite";

export default function Contact() {
  const [state, formAction] = useFormState(sendContactMessage, initialContactFormState);

  return (
    <section className="section">
      <div className="container-page grid gap-12 lg:grid-cols-3">
        <div>
          <p className="label">Contact</p>
          <h2 className="mt-3 font-serif text-2xl font-medium text-cream">MECEF ET FILS</h2>
          <ul className="mt-6 space-y-4 text-sm text-warmgray">
            <li className="flex items-start gap-3">
              <MapPin size={17} className="mt-0.5 shrink-0 text-laterite" />
              <span>Siguiri Koura I, Commune de Siguiri, République de Guinée</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={17} className="shrink-0 text-laterite" />
              <a href="tel:+224622067837" className="hover:text-laterite">
                622 06 78 37
              </a>
              {" / "}
              <a href="tel:+224664700544" className="hover:text-laterite">
                664 70 05 44
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={17} className="shrink-0 text-laterite" />
              <a href="mailto:2017fakolymamby@gmail.com" className="hover:text-laterite">
                2017fakolymamby@gmail.com
              </a>
            </li>
          </ul>
        </div>

        <form action={formAction} className="card space-y-5 lg:col-span-2">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="label mb-1.5 block">
                Nom *
              </label>
              <input id="name" type="text" name="name" required className={inputClasses} />
            </div>
            <div>
              <label htmlFor="organization" className="label mb-1.5 block">
                Structure / Institution
              </label>
              <input id="organization" type="text" name="organization" className={inputClasses} />
            </div>
            <div>
              <label htmlFor="email" className="label mb-1.5 block">
                Email *
              </label>
              <input id="email" type="email" name="email" required className={inputClasses} />
            </div>
            <div>
              <label htmlFor="phone" className="label mb-1.5 block">
                Téléphone
              </label>
              <input id="phone" type="tel" name="phone" className={inputClasses} />
            </div>
          </div>

          <div>
            <label htmlFor="subject" className="label mb-1.5 block">
              Objet de la demande *
            </label>
            <select id="subject" name="subject" required defaultValue="" className={inputClasses}>
              <option value="" disabled>
                Sélectionnez un objet
              </option>
              <option value="devis">Demande de devis</option>
              <option value="partenariat">Partenariat</option>
              <option value="question">Question générale</option>
            </select>
          </div>

          <div>
            <label htmlFor="message" className="label mb-1.5 block">
              Message *
            </label>
            <textarea id="message" name="message" rows={5} required className={inputClasses} />
          </div>

          {state.status !== "idle" && (
            <p
              role="status"
              className={`text-sm font-medium ${state.status === "success" ? "text-green-500" : "text-red-400"}`}
            >
              {state.message}
            </p>
          )}

          <SubmitButton />
        </form>
      </div>
    </section>
  );
}
