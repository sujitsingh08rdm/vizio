import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "d1wg926xps2d1q.cloudfront.net",
        pathname: "/thumbnails/**",
      },
    ],
  },
};

export default nextConfig;
