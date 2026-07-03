import fs from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getArtist } from "@/content/artists";
import { bookingSchema, fieldErrors, type BookingData } from "@/lib/booking";

export const runtime = "nodejs";

const STUDIO_INBOX = process.env.BOOKING_INBOX ?? "studio@obsidianink.mk";

function renderEmail(data: BookingData): string {
  const artist =
    data.artist === "any"
      ? "No preference"
      : (getArtist(data.artist)?.name ?? data.artist);
  return [
    `New booking inquiry`,
    ``,
    `Name:      ${data.name}`,
    `Email:     ${data.email}`,
    `Artist:    ${artist}`,
    `Placement: ${data.placement}`,
    `Size:      ${data.size}`,
    ``,
    `Idea:`,
    data.idea,
  ].join("\n");
}

async function deliver(data: BookingData): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;

  if (apiKey) {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: process.env.BOOKING_FROM ?? "bookings@obsidianink.mk",
      to: STUDIO_INBOX,
      replyTo: data.email,
      subject: `Booking inquiry — ${data.name}`,
      text: renderEmail(data),
    });
    if (error) throw new Error(`Resend failed: ${error.message}`);
    return;
  }

  // Local/dev fallback: append to an ndjson inbox so submissions are
  // never lost while the email service isn't configured.
  const dir = path.join(process.cwd(), ".bookings");
  await fs.mkdir(dir, { recursive: true });
  await fs.appendFile(
    path.join(dir, "inbox.ndjson"),
    JSON.stringify({ receivedAt: new Date().toISOString(), ...data }) + "\n",
    "utf8",
  );
}

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  const parsed = bookingSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, errors: fieldErrors(parsed.error) },
      { status: 400 },
    );
  }

  // Honeypot tripped: pretend success, deliver nothing.
  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  try {
    await deliver(parsed.data);
  } catch (err) {
    console.error("Booking delivery failed:", err);
    return NextResponse.json(
      { ok: false, error: "delivery" },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
