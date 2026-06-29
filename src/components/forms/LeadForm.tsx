"use client";

import { useMemo, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { departments, type FormKey } from "@/lib/content";

type Field = {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  options?: string[];
};

type LeadFormProps = {
  type: FormKey;
};

const inputClass =
  "min-h-12 rounded-2xl border border-[var(--limoune-brown)]/14 bg-white/75 px-4 text-base text-[var(--limoune-brown)] shadow-inner outline-none transition focus:border-[var(--limoune-orange)] focus:ring-4 focus:ring-[var(--limoune-orange)]/12";

const baseFields: Field[] = [
  { label: "Nom", name: "lastName", required: true },
  { label: "Prénom", name: "firstName" },
  { label: "Email", name: "email", type: "email", required: true },
  { label: "Téléphone", name: "phone", type: "tel", required: true },
];

const fieldsByType: Record<Exclude<FormKey, "contact">, Field[]> = {
  wedding: [
    ...baseFields,
    { label: "Date souhaitée", name: "preferredDate", type: "date", required: true },
    { label: "Date alternative", name: "alternateDate", type: "date" },
    { label: "Nombre d'invités", name: "guests", type: "number", required: true },
    { label: "Type de cérémonie", name: "ceremony", options: ["Cérémonie civile", "Cérémonie symbolique", "Dîner privé", "Week-end complet"] },
    { label: "Besoin hébergement", name: "needsAccommodation", options: ["Oui", "Non", "À définir"] },
    { label: "Besoin restauration", name: "needsFood", options: ["Oui", "Non", "À définir"] },
    { label: "Besoin spa", name: "needsSpa", options: ["Oui", "Non", "À définir"] },
    { label: "Budget indicatif", name: "budget" },
    { label: "Document d'inspiration", name: "brief", type: "file" },
  ],
  corporate: [
    { label: "Société", name: "company", required: true },
    ...baseFields.filter((field) => field.name !== "firstName"),
    { label: "Email professionnel", name: "workEmail", type: "email", required: true },
    { label: "Type d'événement", name: "eventType", options: ["Séminaire", "Activité d’équipe", "Réunion", "Déjeuner", "Dîner", "Privatisation"] },
    { label: "Date souhaitée", name: "preferredDate", type: "date", required: true },
    { label: "Nombre de participants", name: "attendees", type: "number", required: true },
    { label: "Format", name: "format", options: ["Théâtre", "Banquet", "Cocktail", "Réunion", "Plein air"] },
    { label: "Besoin réunion", name: "needsMeeting", options: ["Oui", "Non", "À définir"] },
    { label: "Besoin restauration", name: "needsFood", options: ["Oui", "Non", "À définir"] },
    { label: "Besoin hébergement", name: "needsAccommodation", options: ["Oui", "Non", "À définir"] },
    { label: "Activités souhaitées", name: "activities" },
    { label: "Budget indicatif", name: "budget" },
  ],
  spa: [
    ...baseFields,
    { label: "Catégorie de soin", name: "treatment", options: ["Massage", "Hammam", "Rituel signature", "Cabine duo", "Rituel mariage", "Manucure / pédicure"] },
    { label: "Date souhaitée", name: "preferredDate", type: "date", required: true },
    { label: "Créneau souhaité", name: "slot", options: ["Matin", "Après-midi", "Fin de journée"] },
    { label: "Nombre de personnes", name: "people", type: "number", required: true },
  ],
  restaurant: [
    ...baseFields,
    { label: "Restaurant", name: "restaurant", options: ["Massa Restaurant", "Aman sous les Orangers", "Monkey Beach", "Limoune Club"] },
    { label: "Date souhaitée", name: "preferredDate", type: "date", required: true },
    { label: "Heure souhaitée", name: "time", type: "time" },
    { label: "Nombre de personnes", name: "people", type: "number", required: true },
    { label: "Privatisation", name: "privateEvent", options: ["Non", "Oui", "À discuter"] },
  ],
};

function FieldControl({ field }: { field: Field }) {
  const id = `${field.name}-${field.label.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <div className="grid gap-2">
      <label className="text-sm font-bold tracking-[0.08em] text-[var(--limoune-brown)]" htmlFor={id}>
        {field.label}{field.required ? " *" : ""}
      </label>
      {field.options ? (
        <select id={id} name={field.name} required={field.required} className={inputClass} defaultValue="">
          <option value="" disabled>
            Sélectionner
          </option>
          {field.options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input id={id} name={field.name} type={field.type ?? "text"} required={field.required} className={inputClass} />
      )}
    </div>
  );
}

export function LeadForm({ type }: LeadFormProps) {
  const [sent, setSent] = useState(false);
  const [requestType, setRequestType] = useState("Séjour");

  const fields = useMemo(() => {
    if (type !== "contact") {
      return fieldsByType[type];
    }

    const dynamicFields: Field[] = [
      ...baseFields,
      {
        label: "Type de demande",
        name: "requestType",
        required: true,
        options: ["Séjour", "Restaurant", "Spa", "Mariage", "Événement d’entreprise", "Activités", "Parc animalier", "Presse", "Autre"],
      },
    ];

    if (requestType === "Mariage") {
      dynamicFields.push({ label: "Date souhaitée", name: "preferredDate", type: "date" }, { label: "Nombre d'invités", name: "guests", type: "number" });
    }

    if (requestType === "Événement d’entreprise") {
      dynamicFields.push({ label: "Société", name: "company" }, { label: "Nombre de participants", name: "attendees", type: "number" });
    }

    if (requestType === "Spa" || requestType === "Restaurant") {
      dynamicFields.push({ label: "Date souhaitée", name: "preferredDate", type: "date" }, { label: "Nombre de personnes", name: "people", type: "number" });
    }

    return dynamicFields;
  }, [requestType, type]);

  return (
    <section id="lead-form" className="rounded-[2rem] border border-[var(--limoune-brown)]/10 bg-white/70 p-5 shadow-[0_24px_70px_rgba(61,37,24,0.1)] backdrop-blur md:p-8">
      <div className="grid gap-3 md:grid-cols-[0.9fr_1.1fr] md:items-end">
        <div>
          <p className="text-sm font-bold tracking-[0.24em] text-[var(--limoune-orange)] uppercase">Conversion qualifiée</p>
          <h2 className="mt-3 font-serif text-4xl text-[var(--limoune-brown)] md:text-5xl">Formulaire dédié</h2>
        </div>
        <p className="text-base leading-7 text-[var(--limoune-muted)]">
          {"Les champs s'adaptent au service choisi afin de transmettre une demande claire à la bonne équipe."}
        </p>
      </div>

      {sent ? (
        <div className="mt-8 rounded-[1.5rem] border border-[var(--limoune-orange)]/20 bg-[var(--limoune-ivory)] p-5 text-[var(--limoune-brown)]" role="status" aria-live="polite">
          <CheckCircle2 aria-hidden="true" className="mb-3 size-7 text-[var(--limoune-orange)]" />
          <p className="font-semibold">Votre demande a bien été préparée.</p>
          <p className="mt-2 text-sm text-[var(--limoune-muted)]">L’équipe concernée reviendra vers vous avec les informations adaptées à votre demande.</p>
        </div>
      ) : null}

      <form
        className="mt-8 grid gap-5"
        onSubmit={(event) => {
          event.preventDefault();
          setSent(true);
        }}
      >
        {type === "contact" ? (
          <div className="rounded-[1.5rem] border border-[var(--limoune-brown)]/10 bg-[var(--limoune-sand)]/50 p-4">
            <label className="text-sm font-bold tracking-[0.08em] text-[var(--limoune-brown)]" htmlFor="service-router">
              Service concerné
            </label>
            <select
              id="service-router"
              value={requestType}
              onChange={(event) => setRequestType(event.target.value)}
              className={`${inputClass} mt-2 w-full`}
            >
              {departments.map((department) => (
                <option key={department} value={department === "Événements d’entreprise" ? "Événement d’entreprise" : department.replace("Réservations hébergement", "Séjour")}>
                  {department}
                </option>
              ))}
            </select>
          </div>
        ) : null}

        <div className="grid gap-5 md:grid-cols-2">
          {fields.map((field) => (
            <FieldControl key={`${field.name}-${field.label}`} field={field} />
          ))}
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-bold tracking-[0.08em] text-[var(--limoune-brown)]" htmlFor="message">
            Message
          </label>
          <textarea id="message" name="message" rows={5} className={`${inputClass} resize-y py-4`} />
        </div>
        <button
          type="submit"
          data-track={`submit_${type}`}
          className="min-h-12 cursor-pointer rounded-full bg-[var(--limoune-brown)] px-6 py-4 text-sm font-bold tracking-[0.18em] text-[var(--limoune-ivory)] uppercase transition hover:bg-[var(--limoune-orange)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--limoune-orange)] active:scale-[0.98] md:w-fit"
        >
          Envoyer la demande
        </button>
      </form>
    </section>
  );
}
