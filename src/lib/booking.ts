import { z } from "zod";
import { ARTISTS } from "@/content/artists";

/**
 * Shared by the client form and the API route, so both sides validate
 * identically. Error messages are i18n keys under `booking.errors`,
 * resolved to text wherever the error is displayed.
 */

export const SIZES = ["small", "medium", "large", "xl"] as const;

const artistSlugs = ARTISTS.map((a) => a.slug);

export const bookingSchema = z.object({
  name: z
    .string({ error: "nameRequired" })
    .trim()
    .min(2, "nameRequired")
    .max(120, "nameRequired"),
  email: z.email({ error: "emailInvalid" }).max(254, "emailInvalid"),
  artist: z
    .literal("any")
    .or(z.enum(artistSlugs as [string, ...string[]]))
    .default("any"),
  placement: z
    .string({ error: "placementRequired" })
    .trim()
    .min(3, "placementRequired")
    .max(200, "placementRequired"),
  size: z.enum(SIZES, { error: "sizeRequired" }),
  idea: z
    .string({ error: "ideaMin" })
    .trim()
    .min(20, "ideaMin")
    .max(3000, "ideaMin"),
  consent: z.literal(true, { error: "consentRequired" }),
  /**
   * Honeypot — humans never see this field. Any value passes validation
   * so bots get a convincing 200, but the API drops the submission.
   */
  website: z.string().optional(),
});

export type BookingInput = z.input<typeof bookingSchema>;
export type BookingData = z.output<typeof bookingSchema>;

export type BookingFieldErrors = Partial<
  Record<keyof BookingInput, string>
>;

/** Flattens a zod error into { field: i18nErrorKey }. */
export function fieldErrors(error: z.ZodError): BookingFieldErrors {
  const out: BookingFieldErrors = {};
  for (const issue of error.issues) {
    const field = issue.path[0] as keyof BookingInput | undefined;
    if (field && !out[field]) out[field] = issue.message;
  }
  return out;
}
