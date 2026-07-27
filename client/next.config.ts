import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hiolnjzwfsnxkrocwgco.supabase.co",
        pathname: "/storage/v1/object/public/assets/*",
      },
    ],
  },
  // only mobile  (local network)
  allowedDevOrigins: [`${process.env.NEXT_PUBLIC_DEV_ORIGIN}`],
};

export default nextConfig;
