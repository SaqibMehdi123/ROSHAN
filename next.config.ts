import type { NextConfig } from "next";

/**
 * Static export (GitHub Pages / any static host) — the app is a fully
 * client-side offline PWA, so no server runtime is needed.
 * For project-pages deploys set NEXT_PUBLIC_BASE_PATH=/ROSHAN at build time.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH?.replace(/\/$/, "") || "";

const nextConfig: NextConfig = {
  output: "export",
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
  typescript: { ignoreBuildErrors: true },
  reactStrictMode: false,
  // Workspace root = this project dir (it is nested under ~/my-project, so
  // auto-detection would otherwise climb too far up and break CSS resolution).
  turbopack: { root: __dirname },
};

export default nextConfig;
