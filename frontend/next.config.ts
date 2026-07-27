import type { NextConfig } from "next";

const SAFARI_REDIRECT_URL = "https://safarimitharry.com";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "http", hostname: "localhost", port: "8000" },
      { protocol: "http", hostname: "127.0.0.1", port: "8000" },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // Tanzania Safaris lives on a sister domain to avoid duplicate
      // content / keyword cannibalization between the two businesses.
      // Direct hits (crawlers, bookmarks, typed URLs) get a real 301;
      // the in-app nav link plays an animated transition first, see
      // src/components/layout/safari-redirect-link.tsx.
      {
        source: "/tansania-safaris",
        destination: SAFARI_REDIRECT_URL,
        permanent: true,
      },
      {
        source: "/tanzania-safaris",
        destination: SAFARI_REDIRECT_URL,
        permanent: true,
      },
      {
        source: "/safaris",
        destination: SAFARI_REDIRECT_URL,
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
