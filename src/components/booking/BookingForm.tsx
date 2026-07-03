"use client";

import { useRef, useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import {
  bookingSchema,
  fieldErrors,
  SIZES,
  type BookingFieldErrors,
} from "@/lib/booking";
import { cn } from "@/lib/cn";

type Status = "idle" | "submitting" | "success" | "error";

/** Pre-localized artist options, provided by the server page. */
export interface ArtistOption {
  slug: string;
  name: string;
}

const inputClass = (invalid: boolean) =>
  cn(
    "w-full border bg-ink-900 px-4 py-3 text-sm text-bone-100 placeholder:text-bone-500/60",
    invalid ? "border-blood-500" : "border-ink-700 focus:border-bone-500",
  );

export function BookingForm({ artists }: { artists: ArtistOption[] }) {
  const t = useTranslations("booking");
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<BookingFieldErrors>({});
  const formRef = useRef<HTMLFormElement>(null);
  const summaryRef = useRef<HTMLParagraphElement>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const raw = Object.fromEntries(new FormData(form).entries());
    const candidate = { ...raw, consent: raw.consent === "on" };

    const parsed = bookingSchema.safeParse(candidate);
    if (!parsed.success) {
      setErrors(fieldErrors(parsed.error));
      // Move focus to the summary so keyboard/AT users hear what failed.
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }

    setErrors({});
    setStatus("submitting");
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (res.status === 400) {
        const body = await res.json();
        setErrors(body.errors ?? {});
        setStatus("idle");
        requestAnimationFrame(() => summaryRef.current?.focus());
        return;
      }
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="border border-ink-700 bg-ink-900 p-8">
        <h2 className="font-display text-2xl font-semibold text-bone-100">
          {t("success.title")}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-bone-300">
          {t("success.body")}
        </p>
        <Button
          variant="outline"
          className="mt-6"
          onClick={() => {
            formRef.current?.reset();
            setStatus("idle");
          }}
        >
          {t("success.again")}
        </Button>
      </div>
    );
  }

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate>
      {hasErrors ? (
        <p
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          className="mb-6 border border-blood-500 bg-blood-700/20 px-4 py-3 text-sm text-blood-300"
        >
          {t("errors.formInvalid")}
        </p>
      ) : null}

      {status === "error" ? (
        <div
          role="alert"
          className="mb-6 border border-blood-500 bg-blood-700/20 p-4"
        >
          <p className="font-semibold text-blood-300">{t("error.title")}</p>
          <p className="mt-1 text-sm text-bone-300">{t("error.body")}</p>
        </div>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label={t("form.name")}
          name="name"
          error={errors.name && t(`errors.${errors.name}`)}
        >
          {(props) => (
            <input
              {...props}
              type="text"
              autoComplete="name"
              className={inputClass(!!errors.name)}
            />
          )}
        </Field>

        <Field
          label={t("form.email")}
          name="email"
          error={errors.email && t(`errors.${errors.email}`)}
        >
          {(props) => (
            <input
              {...props}
              type="email"
              autoComplete="email"
              className={inputClass(!!errors.email)}
            />
          )}
        </Field>

        <Field label={t("form.artist")} name="artist">
          {(props) => (
            <select {...props} defaultValue="any" className={inputClass(false)}>
              <option value="any">{t("form.artistAny")}</option>
              {artists.map((a) => (
                <option key={a.slug} value={a.slug}>
                  {a.name}
                </option>
              ))}
            </select>
          )}
        </Field>

        <Field
          label={t("form.size")}
          name="size"
          error={errors.size && t(`errors.${errors.size}`)}
        >
          {(props) => (
            <select
              {...props}
              defaultValue=""
              className={inputClass(!!errors.size)}
            >
              <option value="" disabled />
              {SIZES.map((size) => (
                <option key={size} value={size}>
                  {t(
                    `form.size${(size[0].toUpperCase() + size.slice(1)) as
                      | "Small"
                      | "Medium"
                      | "Large"
                      | "Xl"}`,
                  )}
                </option>
              ))}
            </select>
          )}
        </Field>

        <Field
          label={t("form.placement")}
          name="placement"
          hint={t("form.placementHint")}
          className="sm:col-span-2"
          error={errors.placement && t(`errors.${errors.placement}`)}
        >
          {(props) => (
            <input
              {...props}
              type="text"
              className={inputClass(!!errors.placement)}
            />
          )}
        </Field>

        <Field
          label={t("form.idea")}
          name="idea"
          hint={t("form.ideaHint")}
          className="sm:col-span-2"
          error={errors.idea && t(`errors.${errors.idea}`)}
        >
          {(props) => (
            <textarea {...props} rows={6} className={inputClass(!!errors.idea)} />
          )}
        </Field>
      </div>

      {/* Honeypot — visually and semantically removed for humans. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="mt-6">
        <label className="flex items-start gap-3 text-sm text-bone-300">
          <input
            type="checkbox"
            name="consent"
            aria-invalid={!!errors.consent}
            aria-describedby={errors.consent ? "consent-error" : undefined}
            className="mt-0.5 h-4 w-4 accent-blood-500"
          />
          <span>{t("form.consent")}</span>
        </label>
        {errors.consent ? (
          <p id="consent-error" className="mt-2 text-xs text-blood-300">
            {t(`errors.${errors.consent}`)}
          </p>
        ) : null}
      </div>

      <Button
        type="submit"
        disabled={status === "submitting"}
        className="mt-8 w-full disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {status === "submitting" ? t("form.submitting") : t("form.submit")}
      </Button>
    </form>
  );
}

function Field({
  label,
  name,
  hint,
  error,
  className,
  children,
}: {
  label: string;
  name: string;
  hint?: string;
  error?: string | false;
  className?: string;
  children: (props: {
    id: string;
    name: string;
    "aria-invalid": boolean;
    "aria-describedby": string | undefined;
  }) => React.ReactNode;
}) {
  const hintId = hint ? `${name}-hint` : undefined;
  const errorId = error ? `${name}-error` : undefined;
  const describedBy =
    [errorId, hintId].filter(Boolean).join(" ") || undefined;

  return (
    <div className={className}>
      <label
        htmlFor={name}
        className="mb-2 block font-mono text-xs tracking-widest text-bone-300 uppercase"
      >
        {label}
      </label>
      {children({
        id: name,
        name,
        "aria-invalid": !!error,
        "aria-describedby": describedBy,
      })}
      {hint ? (
        <p id={hintId} className="mt-2 text-xs text-bone-500">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} className="mt-2 text-xs text-blood-300">
          {error}
        </p>
      ) : null}
    </div>
  );
}
