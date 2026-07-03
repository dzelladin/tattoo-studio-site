import { notFound } from "next/navigation";

// Funnels every unknown path under a valid locale into the localized 404.
export default function CatchAll() {
  notFound();
}
