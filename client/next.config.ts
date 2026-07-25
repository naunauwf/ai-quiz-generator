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
};

export default nextConfig;
