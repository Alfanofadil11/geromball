import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Privacy policy and terms for the TikTok developer app (Geromball Clip Publisher): static pages in /public.
  rewrites() {
    return [
      { source: '/privacy', destination: '/privacy.html' },
      { source: '/terms', destination: '/terms.html' },
    ];
  },
  images: {
    // The only next/image is the 6 KB logo. Serving it as-is keeps this team's
    // shared free tier (5,000 image transformations a month) for nothing else.
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'img.youtube.com' },
      { protocol: 'https', hostname: 'i.ytimg.com' },
    ],
  },
};

export default nextConfig;
