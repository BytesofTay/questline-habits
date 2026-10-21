import type { NextConfig } from "next";

const isNativeBuild = process.env.QUESTLINE_NATIVE_BUILD === "1";

const nextConfig: NextConfig = {
  ...(isNativeBuild ? {
    output: "export" as const,
    trailingSlash: true,
    images: { unoptimized: true },
  } : {}),
};

export default nextConfig;
