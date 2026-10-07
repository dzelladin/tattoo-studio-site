import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  // Emits .next/standalone — a self-contained server the Dockerfile ships
  // without node_modules. `npm run dev` / `npm start` are unaffected.
  output: "standalone",
};

export default withNextIntl(nextConfig);
